import React from "react";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { theme } from "./Theme";
import Header from "./components/Header";
import Translations from "./components/Translations";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh">
        <Header />
        <Translations />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
