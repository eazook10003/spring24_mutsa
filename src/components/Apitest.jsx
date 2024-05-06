import React, { useEffect, useState } from 'react';
import styled from "styled-components";


const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
`;


function Apitest() {
    const [data, setData] = useState(null);  // Initialize to null for loading state

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
        return <Section><p>Loading...</p></Section>;  // 주식 기사 데이터를 로딩중이거나, 없을 때
    }

    return (
        <Section>
            {data.news_data.length > 0 ? (
                data.news_data.map((news, i) => (
                    <p key={i}>
                    {news.ticker} - {news.date} - {news.time} - 
                    <a href={news.links} target="_blank" rel="noopener noreferrer">
                        {news.title}
                    </a> 
                    - {news.source}
                    </p>
                ))
            ) : (
                <p>No news available.</p>
            )}
        </Section>
    );
}

export default Apitest;