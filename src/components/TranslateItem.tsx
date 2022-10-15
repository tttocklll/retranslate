import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  Textarea,
  Text,
  Select,
  Spacer,
} from "@chakra-ui/react";

interface Props {
  NumOfItems: number;
  mode: "original" | "retranslate" | "result";
}

function TranslateItem(props: Props) {
  return (
    <Accordion allowToggle w="full">
      {[...Array(props.NumOfItems)].map((_, i) => (
        <AccordionItem key={i}>
          <h2>
            <AccordionButton
              bg="white"
              color="#e75304"
              fontWeight="bold"
              border="thin solid #e75304"
              borderRadius={5}
              _expanded={{ bg: "#e75304", color: "white" }}
            >
              <Box flex="1" textAlign="left">
                {(props.mode === "original" && "オリジナル文章") ||
                  (props.mode === "retranslate" && `再翻訳 ${i + 1}`) ||
                  (props.mode === "result" && "結果")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>
            <Flex direction="column">
              <Box pb={4}>
                <Select>
                  <option value="jp">日本語</option>
                </Select>
              </Box>
              <Box>
                <Textarea
                  placeholder={
                    props.mode === "original"
                      ? "オリジナルの文章を入力してください"
                      : ""
                  }
                  disabled={props.mode !== "original"}
                />
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default TranslateItem;
