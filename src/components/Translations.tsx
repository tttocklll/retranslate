import {
  Accordion,
  Button,
  ButtonGroup,
  Stack,
  Container,
} from "@chakra-ui/react";
import TranslateItem from "./TranslateItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAvailableLangs } from "../hooks/useAvailableLangs";
import { useTranslations } from "../hooks/useTranslations";
import { dedent } from "ts-dedent";

function Translations() {
  const { availableLangs } = useAvailableLangs();
  const {
    translateItem,
    onClickPlus,
    onClickMinus,
    onChangeOriginalLang,
    onChangeTranslateLang,
    onChangeOriginalText,
    onClickTranslate,
  } = useTranslations();

  const createTwitterText = () => {
    const originalText =
      translateItem.original.text.length <= 50
        ? translateItem.original.text
        : translateItem.original.text.slice(0, 50) + "...";
    const resultText =
      translateItem.result.text.length <= 50
        ? translateItem.result.text
        : translateItem.result.text.slice(0, 50) + "...";
    const text = dedent`「${originalText}」
    を再翻訳すると
    「${resultText}」
    #さいほんやくくん
    https://retranslate.tttocklll.dev/`;
    return encodeURIComponent(text);
  };

  return (
    <Container maxWidth="md" py="5" flexGrow={1}>
      <Stack spacing={5}>
        {/* オリジナルの文章 */}
        <Accordion allowToggle defaultIndex={[0]}>
          <TranslateItem
            key="original"
            mode="original"
            availableLangs={availableLangs}
            item={translateItem.original}
            onChangeLang={onChangeOriginalLang}
            onChangeOriginalText={onChangeOriginalText}
          />
        </Accordion>
        {/* 再翻訳 */}
        <Accordion allowMultiple>
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
        <Button
          colorScheme="orange"
          size="lg"
          onClick={onClickTranslate}
          disabled={!translateItem.original.text}
        >
          翻訳
        </Button>
        {/* 最終結果 */}
        <Accordion allowToggle defaultIndex={[0]}>
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
          href={`https://twitter.com/intent/tweet?text=${createTwitterText()}`}
        >
          Twitter でシェア
        </Button>
      </Stack>
    </Container>
  );
}

export default Translations;
