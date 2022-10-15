import { Accordion, Button, ButtonGroup, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TranslateItem from "./TranslateItem";
import { language, translateItem } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function Translations() {
  const [availableLangs, setAvailableLangs] = useState<language[]>([]);
  const [originalLang, setOriginalLang] = useState("ja");
  const [translateItem, setTranslateItem] = useState<translateItem[]>([
    {
      id: 1,
      target: "en",
    },
  ]);

  useEffect(() => {
    fetch(
      `https://translation.googleapis.com/language/translate/v2/languages?key=${process.env.REACT_APP_GOOGLE_API_KEY}&target=ja`
    )
      .then((res) => res.json())
      .then((data) => setAvailableLangs(data.data.languages))
      .catch((err) => console.log(err));
  }, []);

  const onClickPlus = () => {
    setTranslateItem([
      ...translateItem,
      {
        id: translateItem.at(-1)!.id + 1,
        target: "en",
      },
    ]);
  };

  const onClickMinus = () => {
    if (translateItem.length > 1) {
      setTranslateItem(translateItem.slice(0, -1));
    }
  };

  const onChangeOriginalLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOriginalLang(e.target.value);
  };

  const onChangeTranslateLang = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id?: number
  ) => {
    const target = e.target.value;
    setTranslateItem(
      translateItem.map((item) => {
        if (item.id === id) {
          return { ...item, target };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Flex mx="10" direction="column">
      <Stack spacing={5}>
        {/* オリジナルの文章 */}
        <Accordion allowToggle>
          <TranslateItem
            key="original"
            mode="original"
            availableLangs={availableLangs}
            item={{
              id: 0,
              target: originalLang,
            }}
            onChange={onChangeOriginalLang}
          />
        </Accordion>

        {/* 再翻訳 */}
        <Accordion allowToggle>
          {translateItem.map((item) => (
            <TranslateItem
              key={item.id}
              mode="retranslate"
              availableLangs={availableLangs}
              item={item}
              onChange={onChangeTranslateLang}
            />
          ))}
        </Accordion>

        <ButtonGroup size="md" justifyContent="space-around">
          <Button
            onClick={onClickPlus}
            disabled={translateItem.length === 10}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            追加
          </Button>
          <Button
            onClick={onClickMinus}
            disabled={translateItem.length === 1}
            leftIcon={<FontAwesomeIcon icon={faMinus} />}
          >
            削除
          </Button>
        </ButtonGroup>
        <Button colorScheme="orange" size="lg">
          翻訳
        </Button>

        {/* 最終結果 */}
        <Accordion allowToggle>
          <TranslateItem
            key="result"
            mode="result"
            availableLangs={availableLangs}
            item={{
              id: 100,
              target: originalLang,
            }}
          />
        </Accordion>

        <Button
          colorScheme="twitter"
          leftIcon={<FontAwesomeIcon icon={faTwitter} />}
        >
          Twitter でシェア
        </Button>
      </Stack>
    </Flex>
  );
}

export default Translations;
