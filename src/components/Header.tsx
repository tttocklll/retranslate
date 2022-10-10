import { Flex, Center, Text } from "@chakra-ui/react";

function Header() {
  return (
    <Flex as="header" w="full" py="4" px="10">
      <Center w="full">
        <Text>再翻訳アプリ</Text>
      </Center>
    </Flex>
  );
}

export default Header;
