import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import Cube from './Cube';
import { AppContext } from '../AppContext';

const DivStyle = styled.div`
    display: flex;
    scroll-snap-align: center;
    height: 100vh;
    background: url("./img/bg.jpeg");
    flex-direction: row;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 55vw;
    padding-top: 5vh;
`;

const Right = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

const RightTopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    height: 50%;
    width: 100%;
    margin-top: 18vh;
`;

const RightBottonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
    margin-top: 9.26vh; /* 100px ≈ 9.26vh (assuming viewport height 1080px) */
`;

const StockInfoContainer = styled.div`
    width: 40%;
    height: 41.67vh; /* 45vh */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    background: #2f4f4f;
    margin-top: 6.48vh; /* 7vh */
    border-radius: 10px;
    padding: 7px;
`;

const StockHeader = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 9.26vh; /* 10vh */
    width: 5.73vw; /* 11vw */
    border-radius: 10px;
`;

const StockInfo = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30.56vh; /* 33vh */
    width: 5.73vw; /* 11vw */
    border-radius: 10px;
    margin-top: 0.93vh; /* 10px */
`;

const ImageContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const ProgressBar = styled.div`
    margin-top: 1.39vh; /* 15px */
    width: 60%;
    height: 2vh; /* 16px */
    border-radius: 10px;
    background-color: #e6e6e6;
    margin-bottom: 10px;
    justify-content: flex;
`;

const ProgressBarFill = styled.div`
    height: 100%;
    border-radius: 10px;
    background-color: #2ecc71;
    transition: width 1.5s ease-out;
`;

const ScoreComment = styled.div`
    font-size: calc(1.1vw + 1.1vh);
    margin-top: -5.56vh; /* -60px */
    color: #FFFFFF;
    text-align: center;
`;

const ProgressLabel = styled.div`
    margin-top: 0.93vh; /* 10px */
    font-size: calc(1vw + 1vh);
    color: #FFFFFF;
`;

const Button5 = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: #fa6400;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: calc(0.7vw + 0.7vh);
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover,
  &:focus {
    background-color: #fb8332;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #c85000;
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;

const ButtonPosition = styled.div`
  margin-top: 2.78vh; /* 30px */
`;

const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start; 
    margin-left: 1.56vw; /* 30px */
    width: 100%;
    padding-top: 1.85vh; /* 20px */
`;

const SearchStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;     
  margin-left: 1.56vw; /* 30px */
  padding-top: 5.56vh; /* 60px */
  width: 100%;
  border-radius: 15px;
`;

const InputStyle = styled.input`
  width: 66.67vh; /* 72vh */
  padding: 1vh; /* 10px */
  font-size: calc(1vw + 1vh);
  height: 2.78vh; /* 3vh */
  border-radius: 10px;
`;

const ButtonStyle = styled.button`
  padding: 1vh 2.22vh;
  font-size: calc(0.8vw + 0.8vh);
  cursor: pointer;
  margin-left: 0.93vh; /* 10px */
  height: 5.37vh; /* 5.8vh */
  border-radius: 10px;
`;

const SelectStyle = styled.select`
  width: 7.03vw; /* 135px */
  padding: 1vh; /* 10px */
  margin-left: 0.93vh; /* 10px */
  font-size: calc(0.6vw + 0.6vh);
  height: 5.37vh; /* 5.8vh */
  border-radius: 10px;
`;

const NewsListContainer = styled.div`
  width: 50vw;
  max-width: 60vw;
  background: #2f4f4f;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  height: 70.93vh; /* 76.67vh */
  overflow-y: auto;

  /* Customize the scrollbar */
  &::-webkit-scrollbar {
    width: 1vw;
    padding: 5px 10px 2px 0;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 7px;
    margin: 5px 10px 2px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const NewsItem = styled.div`
  background: white;
  padding: 1.39vh; /* 1.5vh */
  margin-bottom: 0.93vh; /* 1vh */
  max-width: 47.5vw;
  border-radius: 0.37vh; /* 0.4vh */
  min-height: 6.94vh; /* 7.5vh */
`;

const NoNews = styled.div`
    background: white;
    padding: 1.39vh; /* 1.5vh */
    margin-bottom: 0.93vh; /* 1vh */
    border-radius: 0.37vh; /* 0.4vh */
    min-height: 6.94vh; /* 7.5vh */
    font-size: calc(1vw + 1vh);
    max-width: 47.5vw;
`;

const NewsItemHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: calc(0.7vw + 0.7vh);

    h3 {
        margin-right: 0.93vh; /* 10px */
    }
`;

const NewsItemTitle = styled.div`
    font-size: calc(0.7vw + 0.7vh);
    margin-top: 0.93vh; /* 1vh */
`;

function SearchBar() {
  const { setSearchTerm, setScrapedData } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('today');
  const [data, setData] = useState(null); 
  const [progress, setProgress] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSubmit = () => {
    setSearchTerm(inputValue);
  
    const url = `http://127.0.0.1:5000/news?searchType=${searchType}&query=${inputValue}`;
  
    setProgress(0);
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.news_data) {
          setScrapedData({ ...data, ticker: inputValue });
          setData(data);
          console.log(data);
        } else {
          const emptyData = { news_data: [], Average_Score: null, news_price: [], ticker: inputValue };
          setScrapedData(emptyData);
          setData(emptyData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        const emptyData = { news_data: [], Average_Score: null, news_price: [], ticker: inputValue };
        setScrapedData(emptyData);
        setData(emptyData);
      });
  };
  

  useEffect(() => {
    fetch("http://127.0.0.1:5000/news")
      .then(res => res.json())
      .then(data => {
        setScrapedData({ ...data, ticker: inputValue });
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error occurred:', error);
        const emptyData = { news_data: [], Average_Score: null, news_price: [], ticker: inputValue };
        setScrapedData(emptyData);
        setData(emptyData);
      });
  }, [setScrapedData]);
  

  const handleButtonClick = () => {
    if (!data || data.Average_Score === undefined || data.Average_Score === null) {
      setProgress(0);
    } else {
      setProgress((data.Average_Score * 100).toFixed(2));
    }
  };

  const progressComment = () => {
    if (progress === 0) {
      return " ";
    } else if (progress < 0) {
      return "Extremely Negative Investment Value";
    } else if (progress > 0 && progress <= 10) {
      return "Very Low Investment Value";
    } else if (progress > 10 && progress <= 20) {
      return "Low Investment Value";
    } else if (progress > 20 && progress <= 30) {
      return "Moderate Investment Value";
    } else if (progress > 30 && progress <= 40) {
      return "Above Average Investment Value";
    } else if (progress > 40 && progress <= 50) {
      return "Good Investment Value";
    } else if (progress > 50 && progress <= 60) {
      return "Very Good Investment Value";
    } else if (progress > 60 && progress <= 100) {
      return "Extremely Positive Investment Value";
    }
  };

  const progressGetColor = () => {
    if (progress < 20) {
      return "#ff0000";
    } else if (progress < 40) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  const price = data && data.news_price ? data.news_price.map(item => item.price) : [];
  const dollar_change = data && data.news_price ? data.news_price.map(item => item.dollar_change) : [];
  const change_percent = data && data.news_price ? data.news_price.map(item => item.change_percent) : [];

  return (
    <DivStyle>
      <Left>
        <SearchStyle>
          <InputStyle
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter stock ticker."
          />
          <SelectStyle value={searchType} onChange={handleTypeChange}>
            <option value="today">Today News</option>
            <option value="last_7days">Last 7days</option>
            <option value="all">All</option>
          </SelectStyle>
          <ButtonStyle onClick={handleSubmit}>Search</ButtonStyle>
        </SearchStyle>

        <NewsContainer>
          <NewsListContainer>
            {data && data.news_data && data.news_data.length > 0 ? (
              data.news_data.map((news, index) => (
                <NewsItem key={index}>
                  <NewsItemHeader>
                    <h3>{news.ticker} - {price}</h3>
                    <p>{news.date} - {news.time}</p>
                  </NewsItemHeader>
                  <NewsItemTitle>
                    <a href={news.links} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                    <span> - source : {news.source}</span>
                  </NewsItemTitle>
                </NewsItem>
              ))
            ) : (
              <NoNews>
                <p>No news available.</p>
              </NoNews>
            )}
          </NewsListContainer>
        </NewsContainer>
      </Left>

      <Right>
        <RightTopContainer>
          <Cube />
        </RightTopContainer>
        <RightBottonContainer>
          <ScoreComment>
            Quickly access investment value<br />with stock news sentiment scores.
          </ScoreComment>
          <ProgressBar>
            <ProgressBarFill style={{ width: `${progress}%`, backgroundColor: progressGetColor() }}>
            </ProgressBarFill>
          </ProgressBar>
          <ProgressLabel>
            {parseFloat(progress) === 0 ? <p>No Score Available</p> : `${progress}%`} {progressComment()}
          </ProgressLabel>
          <ButtonPosition>
            <Button5 onClick={handleButtonClick}>Calculate</Button5>
          </ButtonPosition>
        </RightBottonContainer>
      </Right>
    </DivStyle>
  );
}

export default SearchBar;
