import styled from "styled-components";
import Intro from "./components/Intro";
import Filter from "./components/Filter";
import Score from "./components/Score";
import Apitest from "./components/Apitest";
import Test from "./components/Test"

const Container = styled.div`
  background: url("./img/bg.jpeg");
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: black;
  &::-webkit-scrollbar{
    display: none;
  }
`;

function App() {
  return (
    <Container>
      <Intro/>
      <Test/>
      <Filter/>
      <Score/>
      <Apitest/>
    </Container>
  );
}

export default App
