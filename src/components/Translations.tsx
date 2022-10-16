import { Accordion, Button, ButtonGroup, Flex, Stack } from "@chakra-ui/react";
import TranslateItem from "./TranslateItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAvailableLangs } from "../hooks/useAvailableLangs";
import { useTranslations } from "../hooks/useTranslations";

function Translations() {
  const { availableLangs } = useAvailableLangs();
  const {
    translateItem,
    onClickPlus,
    onClickMinus,
    onChangeOriginalLang,
    onChangeTranslateLang,
  } = useTranslations();

  return (
    <Flex mx="10" direction="column">
      <Stack spacing={5}>
        {/* オリジナルの文章 */}
        <Accordion allowToggle>
          <TranslateItem
            key="original"
            mode="original"
            availableLangs={availableLangs}
            item={translateItem.original}
            onChangeLang={onChangeOriginalLang}
          />
        </Accordion>
        \dashboard\17
        {/* 再翻訳 */}
        <Accordion allowToggle>
          {translateItem.retranslate.map((item) => (
            <TranslateItem
              key={item.id}
              mode="retranslate"
              availableLangs={availableLangs}
              item={item}
              onChangeLang={onChangeTranslateLang}
            />
          ))}
        </Accordion>
        <ButtonGroup size="md" justifyContent="space-around">
          <Button
            onClick={onClickPlus}
            disabled={translateItem.retranslate.length === 10}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            追加
          </Button>
          <Button
            onClick={onClickMinus}
            disabled={translateItem.retranslate.length === 1}
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
            item={translateItem.result}
          />
        </Accordion>
        <Button
          colorScheme="twitter"
          leftIcon={<FontAwesomeIcon icon={faTwitter} />}
          as="a"
          href="https://twitter.com/intent/tweet?text=Hello%20world"
        >
          Twitter でシェア
        </Button>
      </Stack>
    </Flex>
  );
}

export default Translations;
