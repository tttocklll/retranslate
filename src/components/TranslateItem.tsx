import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Textarea,
  Select,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <AccordionButton bg="white" color="orange.500" fontWeight="bold">
          {props.item.isLoading && <Spinner mr={5} />}
          {(props.item.isSuccessful === undefined && undefined) ||
            (props.item.isSuccessful === true && (
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />
            )) ||
            (props.item.isSuccessful === false && (
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: 5 }} />
            ))}
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
          {props.item.errorMessage && (
            <Alert status="error" mb={4}>
              <AlertIcon /> {props.item.errorMessage}
            </Alert>
          )}
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
              onChange={
                props.mode === "original"
                  ? (e) => props.onChangeOriginalText!(e)
                  : undefined
              }
              readOnly={props.mode !== "original"}
              value={props.item.text}
            />
          </Box>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TranslateItem;
