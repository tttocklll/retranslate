import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";
import TranslateItem from "./TranslateItem";

function Translations() {
  return (
    <Flex mx="10" direction="column">
      <TranslateItem />
    </Flex>
  );
}

export default Translations;
