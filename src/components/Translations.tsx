import { Accordion, Button, ButtonGroup, Flex, Stack } from "@chakra-ui/react";
import TranslateItem from "./TranslateItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useOriginalLang } from "../hooks/useOriginalLang";
import { useAvailableLangs } from "../hooks/useAvailableLangs";
import { useTranslateItem } from "../hooks/useTranslateItem";

function Translations() {
  const { originalLang, onChangeOriginalLang } = useOriginalLang();
  const { availableLangs } = useAvailableLangs();
  const { translateItem, onClickPlus, onClickMinus, onChangeTranslateLang } =
    useTranslateItem();

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
