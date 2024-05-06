import React, { useState } from 'react';
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
  width: 55%;      
  padding: 10px;
  font-size: 16px;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;  
  font-size: 16px;   
  cursor: pointer;   
  margin-left: 10px;
`;

const SelectStyle = styled.select`
  padding: 10px;     
  margin-left: 10px;   
  font-size: 16px;   
`;

const NewsListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  background: #2f4f4f;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const NewsItem = styled.div`
  background: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('ticker'); // 검색 유형 상태 추가

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value); // 다운바로 검색 필터 변경 시 상태 업데이트
  };

  const handleSubmit = () => {
    console.log('Search for:', inputValue, 'Search type:', searchType); // 검색한 입력값 함께 출력
  };

  const articles = [
    { title: "Sample Article 1", summary: "This is a sample summary for article 1." },
    { title: "Sample Article 2", summary: "This is a sample summary for article 2." },
    { title: "Sample Article 3", summary: "This is a sample summary for article 3." },
    { title: "Sample Article 4", summary: "This is a sample summary for article 4." },
    { title: "Sample Article 5", summary: "This is a sample summary for article 5." },
    { title: "Sample Article 6", summary: "This is a sample summary for article 6." },
    { title: "Sample Article 7", summary: "This is a sample summary for article 7." },
    { title: "Sample Article 8", summary: "This is a sample summary for article 8." }

  ];

  return (
    <DivStyle>
        <Left>
            <SearchStyle>
                <InputStyle
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter stock ticker or news keyword"
                />
                <SelectStyle value={searchType} onChange={handleTypeChange}>
                    <option value="ticker">Stock Ticker</option>
                    <option value="news">News Articles</option>
                    <option value="all">All</option>
                </SelectStyle>
                <ButtonStyle onClick={handleSubmit}>Search</ButtonStyle>
            </SearchStyle>

            <NewsContainer>
                <NewsListContainer>
                    {articles.map((article, index) => (
                    <NewsItem key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                    </NewsItem>
                    ))}
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