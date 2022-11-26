import { Box, Text, Link } from "@chakra-ui/react";

function footer() {
  return (
    <Box as="footer" py="4" textAlign="center">
      <Text>
        Made with{" "}
        <Box as="span" role="img" aria-label="love">
          ❤️
        </Box>{" "}
        by{" "}
        <Link href="https://twitter.com/tttockllll" isExternal>
          @tttockllll
        </Link>
      </Text>
    </Box>
  );
}

export default footer;
