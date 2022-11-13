import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { googleTranslateLangs, translateItem } from "../types";

interface Props {
  mode: "original" | "retranslate" | "result";
  availableLangs: googleTranslateLangs[];
  item: translateItem;
  onChangeLang?: (e: React.ChangeEvent<HTMLSelectElement>, id?: number) => void;
  onChangeOriginalText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TranslateItem(props: Props) {
  return (
    <AccordionItem key={props.item.id}>
      <h2>
        <AccordionButton
          bg="white"
          color="orange.500"
          fontWeight="bold"
          border="thin solid"
          borderRadius={5}
          _expanded={{ bg: "orange.500", color: "white" }}
        >
          <Box flex="1" textAlign="left">
            {(props.mode === "original" && "オリジナル文章") ||
              (props.mode === "retranslate" && `再翻訳 ${props.item.id}`) ||
              (props.mode === "result" && "結果")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel p={4}>
        <Flex direction="column">
          <Box pb={4}>
            <Select
              value={props.item.language}
              onChange={
                props.mode === "original"
                  ? props.onChangeLang
                  : (e) => props.onChangeLang!(e, props.item.id)
              }
              disabled={props.mode === "result"}
            >
              {props.availableLangs.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Textarea
              placeholder={
                props.mode === "original"
                  ? "オリジナルの文章を入力してください"
                  : "翻訳結果が表示されます"
              }
              disabled={props.mode !== "original"}
              onChange={(e) => props.onChangeOriginalText!(e)}
              value={props.item.text}
            />
          </Box>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TranslateItem;
