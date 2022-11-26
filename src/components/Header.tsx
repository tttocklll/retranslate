import { Text, Box, Container } from "@chakra-ui/react";

function Header() {
  return (
    <Box as="header" bgColor="orange.500" w="full">
      <Container maxW="md">
        <Text color="white" fontSize="4xl" fontFamily="Nico Moji">
          さいほんやくくん
        </Text>
      </Container>
    </Box>
  );
}

export default Header;
