import React from 'react';
import styled from "styled-components";
import ThreeDModel from './ThreeDModel';

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  height: calc(100vh - 60px);
  scroll-snap-align: center;
  width: 85%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 74px;
  color: #000000;
  text-shadow: 
    -1px -1px 0 #FFFFFF,
    1px -1px 0 #FFFFFF,
    -1px  1px 0 #FFFFFF,
    1px  1px 0 #FFFFFF;
`;

const Curstock = styled.li`
  font-size: 22px;
  color: #FFFFFF;
`;

const Right = styled.div`
  flex: 3;
  margin-top: 30px;
  margin-left: 120px;
`;

const Infobox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 0px 0;
  border: 2px solid #222;
  border-radius: 10px;
  border-color: #FFFFFF;
  margin-top: -100px;
`;

const Desc = styled.p`
  color: #FFFFFF;
`;

const Button = styled.button`
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const navigateTo = (url) => {
  window.open(url, '_blank');
};

const Intro = () => {
  return (
    <>
      <Section>
        <Container>
          <Left>
            <Title>Mutsa Stock</Title>
            <Curstock>Welcome to OSU likelion team project, Stock News Sentiment Analyzer! 
              Simply search for any stock ticker to get sentiment scores from recent news articles. 
              Stay informed with current trends and make smarter investment decisions with ease.
            </Curstock>
          </Left>
          <Right>
            <ThreeDModel />
            <Infobox>
              <Desc>
                Learn more about Likelion!
              </Desc>
              <Button onClick={() => navigateTo('https://www.likelion.net/')}>Learn More</Button>
            </Infobox>
          </Right>
        </Container>
      </Section>
    </>
  );
};

export default Intro;
