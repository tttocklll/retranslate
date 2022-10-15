import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import TranslateItem from "./TranslateItem";

function Translations() {
  const [NumOfItems, setNumOfItems] = useState(1);

  const onClickPlus = () => {
    setNumOfItems(NumOfItems + 1);
  };

  const onClickMinus = () => {
    if (NumOfItems > 1) {
      setNumOfItems(NumOfItems - 1);
    }
  };

  return (
    <Flex mx="10" direction="column">
      {/* オリジナルの文章 */}
      <TranslateItem NumOfItems={1} mode="original" />
      <Box m={5} />

      {/* 再翻訳 */}
      <TranslateItem NumOfItems={NumOfItems} mode="retranslate" />
      <Flex>
        <Button onClick={onClickPlus} disabled={NumOfItems === 10}>
          +
        </Button>
        <Button onClick={onClickMinus} disabled={NumOfItems === 1}>
          -
        </Button>
      </Flex>
      <Box m={5} />

      {/* 最終結果 */}
      <TranslateItem NumOfItems={1} mode="result" />
    </Flex>
  );
}

export default Translations;
