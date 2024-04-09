import styled from "styled-components";
import Intro from "./components/Intro";
import Filter from "./components/Filter";
import Score from "./components/Score";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: black;
  background: white;
  &::-webkit-scrollbar{
    display: none;
  }
`;

function App() {
  return (
    <Container>
      <Intro/>
      <Filter/>
      <Score/>
    </Container>
  );
}

export default App
