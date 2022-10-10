import React from "react";
import "./App.css";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { theme } from "./Theme";
import Header from "./components/Header";
import Translations from "./components/Translations";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Translations />
        {/* TODO: contents */}
        {/* TODO: footer */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
