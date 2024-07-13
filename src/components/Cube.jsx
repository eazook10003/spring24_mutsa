import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const CubeContainer = styled.div`
  width: 275px;
  height: 275px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-45deg);
`;

const CubeFace = styled.div`
  position: absolute;
  width: 275px;
  height: 275px;
  background: rgba(255, 165, 0, 0.9);
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Front = styled(CubeFace)`
  transform: translateZ(137.5px);
`;

const Back = styled(CubeFace)`
  transform: rotateY(180deg) translateZ(137.5px);
`;

const Right = styled(CubeFace)`
  transform: rotateY(90deg) translateZ(137.5px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightSection = styled.div`
  width: 100%;
  height: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
`;

const Left = styled(CubeFace)`
  transform: rotateY(-90deg) translateZ(137.5px);
`;

const Top = styled(CubeFace)`
  transform: rotateX(90deg) translateZ(137.5px);
  background: #f0f0f0;
  overflow: hidden;
`;

const Bottom = styled(CubeFace)`
  transform: rotateX(-90deg) translateZ(137.5px);
`;

const TickerName = styled.div`
  font-size: 80px;
  font-weight: bold;
`;

const StockInfo = styled.div`
  font-size: 25px;
  font-weight: bold;
  line-height: 1.5;
  white-space: pre-line;
`;

const SlideShow = styled.div`
  display: flex;
  width: 100%;
  animation: ${slide} 5s linear infinite;
`;

const SlideItem = styled.div`
  min-width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

function Cube() {
  const { scrapedData } = useContext(AppContext);
  const { news_price } = scrapedData;
  
  console.log(scrapedData); // scrapedData를 확인합니다.
  const ticker = scrapedData.ticker || 'Search Ticker';

  const currentPrice = news_price && news_price.length > 0 ? news_price[0].price : ' ';
  const changePercent = news_price && news_price.length > 0 ? news_price[0].change_percent : ' ';
  const dollarChange = news_price && news_price.length > 0 ? news_price[0].dollar_change : ' ';

  return (
    <CubeContainer>
      <Front>
        <div>
          <img src="./img/likelion_search_logo.png" alt="Like Lion" width="100%" />
        </div>
      </Front>
      <Back></Back>
      <Right>
        <RightSection>
          <StockInfo>Current Price: {currentPrice}</StockInfo>
        </RightSection>
        <RightSection>
          <StockInfo>Change: {changePercent}%</StockInfo>
        </RightSection>
        <RightSection>
          <StockInfo>Dollar Change: {dollarChange}</StockInfo>
        </RightSection>
      </Right>
      <Left>
        <div>left</div>
      </Left>
      <Top>
        <SlideShow>
          <SlideItem>
            <TickerName>{ticker}</TickerName>
          </SlideItem>
          <SlideItem>
            <TickerName>{ticker}</TickerName>
          </SlideItem>
        </SlideShow>
      </Top>
      <Bottom>
        <div>bottom</div>
      </Bottom>
    </CubeContainer>
  );
}

export default Cube;
