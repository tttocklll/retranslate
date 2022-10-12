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

function TranslateItem() {
  return (
    <Accordion allowToggle w="full">
      <AccordionItem>
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
              オリジナル文
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
              <Textarea placeholder="オリジナルの文章を入力してください" />
            </Box>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default TranslateItem;
