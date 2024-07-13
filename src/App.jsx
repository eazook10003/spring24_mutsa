// App.jsx
import React from 'react';
import styled from "styled-components";
import { AppProvider } from './AppContext.jsx';
import Intro from "./components/Intro";
import Filter from "./components/Filter";
import Test from "./components/Test";
import Navbar from "./components/Navbar";

const Container = styled.div`
  background: url("./img/bg.jpeg");
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: black;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: start;
`;

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Container>
        <Section id="home">
          <Intro />
        </Section>
        <Section id="search">
          <Test />
        </Section>
        <Section id="stock">
          <Filter />
        </Section>
      </Container>
    </AppProvider>
  );
}

export default App;
