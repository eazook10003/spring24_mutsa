import React, { useEffect, useState } from 'react';
import styled from "styled-components";


const DivStyle = styled.div`
    display: flex;
    scroll-snap-align: center;
    height: 100vh;
    background: url("./img/bg.jpeg");
    flex-direction: row;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%
`

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 40%;
`

const Img = styled.img`
    width: 800px;
    height: 600px;
    object-fit: contain;
    margin-right: 25px;
`

const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start; 
    margin-left: 30px;
    width: 100%;
    padding-top: 20px;
`

const SearchStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;     
  margin-left: 30px;
  padding-top: 50px;
  width: 100%;
`;

const InputStyle = styled.input`
  width: 72vh;      
  padding: 10px;
  font-size: 1.5vh;
  height: 2vh;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;  
  font-size: 1.5vh;   
  cursor: pointer;   
  margin-left: 10px;
`;

const SelectStyle = styled.select`
  padding: 10px;     
  margin-left: 10px;   
  font-size: 1.5vh;   
`;

const NewsListContainer = styled.div`
  width: 100vh;
  max-width: 800px;
  margin-top: 20px;
  background: #2f4f4f;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  height: 66.67vh;
  overflow-y: auto;
`;

const NewsItem = styled.div`
  background: white;
  padding: 1.5vh;
  margin-bottom: 1vh;
  border-radius: 0.4vh;
  min-height: 7.5vh;
`;

const No_News = styled.div`
    background: white;
    padding: 1.5vh;
    margin-bottom: 1vh;
    border-radius: 0.4vh;
    min-height: 7.5vh;
`;

const NewsItem_header = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5vh;

    h3 {
        margin-right: 10px;  // h3와 p 사이의 간격
      }
`

const NewsItem_title = styled.div`
    font-size: 1.5vh;
    margin-top: 1vh;
`


function SearchBar() {

  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('today','last_7days'); // 검색 유형 상태 추가
  const [data, setData] = useState(null);  // Initialize to null for loading state


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value); // 다운바로 검색 필터 변경 시 상태 업데이트
  };

  const handleSubmit = () => {
    console.log('Search for:', inputValue, 'Search type:', searchType); // 검색한 입력값 함께 출력

    const url = `http://127.0.0.1:5000/news?searchType=${searchType}&query=${inputValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            setData(data);  // 데이터 업데이트
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setData({ news_data: [] });  // 오류 시 빈 배열로 설정
        });
};

  

  useEffect(() => {
    fetch("http://127.0.0.1:5000/news")
    .then(res => res.json())
    .then(data => {
        setData(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error occurred:', error);
        setData({ news_data: [] });  // Set to empty array in news_data in case of error
    })
}, []);

    if (!data || !data.news_data) {
        return <NewsItem><p>Loading...</p></NewsItem>;  // 주식 기사 데이터를 로딩중이거나, 없을 때
    }


  return (
    <DivStyle>
        <Left>
            <SearchStyle>
                <InputStyle
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
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
                    {data.news_data.length > 0 ? (
                        data.news_data.map((news, index) => (
                            <NewsItem key={index}>
                                <NewsItem_header>
                                    <h3>{news.ticker}</h3>
                                    <p>{news.date} - {news.time}</p>
                                </NewsItem_header>
                                <NewsItem_title>
                                    <a href={news.links} target="_blank" rel="noopener noreferrer">
                                        {news.title}
                                    </a>
                                    <span> - source : {news.source}</span>
                                </NewsItem_title>
                            </NewsItem>
                        ))
                    ) : (
                        <No_News>
                        <p>No news available.</p>
                        </No_News>
                    )}
                </NewsListContainer>
            </NewsContainer>
        </Left>

        <Right>
            <Img src="./img/Stock_Search.png" alt="Stock Image"/>
        </Right>
    </DivStyle>
  );
}

export default SearchBar;