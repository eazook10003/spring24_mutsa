import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    padding: 20px;
    background-color: original-background-color;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.h1`
    margin: 0;
    padding: 20px 0;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
    gap: 20px;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 70%;
`;

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
`;

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 69%;
    margin-top: 20px;
    height: 50%;
`;

const Tooltip = styled.div`
    visibility: hidden;
    opacity: 0;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    width: 250px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.3s;

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
`;

const StatBox = styled.div`
    background-color: #333;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    width: 22%;
    position: relative;
    border: 2px solid white;

    &:hover ${Tooltip} {
        visibility: visible;
        opacity: 1;
    }
`;

const StatLabel = styled.div`
    display: flex;
    justify-content: space-between;

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }
`;

const BarContainer = styled.div`
    display: flex;
    margin-top: 5px;
    background: linear-gradient(
        to right, 
        green ${props => props.leftWidth}, 
        green ${props => props.leftWidth}, 
        red ${props => props.leftWidth}, 
        red 100%
    );
    height: 10px;
    border-radius: 10px;
    overflow: hidden;
`;

const Table = styled.table`
width: 100%;
border-collapse: separate;
border-spacing: 0;
color: white;
font-size: 14px;
background-color: #333;
border: 2px solid white;
border-radius: 8px;
overflow: hidden;  /* 이 줄을 추가하세요 */
`;


const Th = styled.th`
    padding: 4px;
    background-color: #444;
`;

const Td = styled.td`
    padding: 4px;
    text-align: center;

    &.positive {
        color: green;
    }

    &.negative {
        color: red;
    }

    &.ticker {
        color: #00BFFF;
    }
`;

const FutureTr = styled.tr`
    height: 20px;
    min-height: 20px;
`;

const ForexTr = styled.tr`
    height: 20px;
    min-height: 20px;
`;

const StatsImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ImageContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -80px;

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
    }
`;

const Filter = () => {
    const [stocks, setStocks] = useState([]);
    const [futures, setFutures] = useState([]);
    const [forex, setForex] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStockInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/stock-info');
                const data = await response.json();
                setStocks(data.stock_info);
                setFutures(data.future_news_info.slice(0, 10));
                setForex(data.forex_news_info.slice(0, 10));
                setStats(data.stats);
            } catch (error) {
                console.error('Error fetching stock information:', error);
            }
        };

        fetchStockInfo();
    }, []);

    const firstHalf = stocks.slice(0, 19);
    const secondHalf = stocks.slice(19, 38);

    const tooltipTexts = [
        'Total "Advancing/Declining" issues on NYSE, Nasdaq and AMEX',
        'Total "New High/New Low" issues on NYSE, Nasdaq and AMEX',
        'Total "Above SMA50/Below SMA50" issues on NYSE, Nasdaq and AMEX',
        'Total "Above SMA200/Below SMA200" issues on NYSE, Nasdaq and AMEX'
    ];

    return (
        <Section>
            <Title>Stock Information - What is happening now?</Title>
            <Container>
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Ticker</Th>
                                <Th>Last</Th>
                                <Th>Change</Th>
                                <Th>Volume</Th>
                                <Th>Signal</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstHalf.map((stock, index) => (
                                <tr key={index}>
                                    <Td className="ticker">{stock.ticker}</Td>
                                    <Td>{stock.last}</Td>
                                    <Td className={parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}>
                                        {stock.change}
                                    </Td>
                                    <Td>{stock.volume}</Td>
                                    <Td>{stock.signal}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Ticker</Th>
                                <Th>Last</Th>
                                <Th>Change</Th>
                                <Th>Volume</Th>
                                <Th>Signal</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {secondHalf.map((stock, index) => (
                                <tr key={index}>
                                    <Td className="ticker">{stock.ticker}</Td>
                                    <Td>{stock.last}</Td>
                                    <Td className={parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}>
                                        {stock.change}
                                    </Td>
                                    <Td>{stock.volume}</Td>
                                    <Td>{stock.signal}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
                <SideContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Futures</Th>
                                <Th>Last</Th>
                                <Th>Change</Th>
                                <Th>Change %</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {futures.map((future, index) => (
                                <FutureTr key={index}>
                                    <Td className="ticker">{future.futures}</Td>
                                    <Td>{future.label}</Td>
                                    <Td className={parseFloat(future.change) >= 0 ? 'positive' : 'negative'}>
                                        {future.change}
                                    </Td>
                                    <Td>{future.change_by_percent}</Td>
                                </FutureTr>
                            ))}
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Forex</Th>
                                <Th>Last</Th>
                                <Th>Change</Th>
                                <Th>Change %</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {forex.map((fx, index) => (
                                <ForexTr key={index}>
                                    <Td className="ticker">{fx.forex}</Td>
                                    <Td>{fx.forex_label}</Td>
                                    <Td className={parseFloat(fx.forex_change) >= 0 ? 'positive' : 'negative'}>
                                        {fx.forex_change}
                                    </Td>
                                    <Td>{fx.forex_change_by_percent}</Td>
                                </ForexTr>
                            ))}
                        </tbody>
                    </Table>
                    
                </SideContainer>
            </Container>
            <StatsImageContainer>
                <StatsContainer>
                    {stats.map((stat, index) => (
                        <StatBox key={index}>
                            <StatLabel>
                                <span className="positive">{stat.label_left}</span>
                                <span className="negative">{stat.label_right}</span>
                            </StatLabel>
                            <StatLabel>
                                <span className="positive">{stat.value_left}</span>
                                <span className="negative">{stat.value_right}</span>
                            </StatLabel>
                            <BarContainer
                                leftWidth={stat.value_left.split(' ')[0]}
                                rightWidth={stat.value_right.split(' ')[0]}
                            />
                            <Tooltip className="tooltip">
                                Total {stat.label_left}/{stat.label_right} issues on NYSE, Nasdaq and AMEX
                            </Tooltip>
                        </StatBox>
                    ))}
                </StatsContainer>
                <ImageContainer>
                    <img src="./img/likelion3.png" alt="Like Lion" />
                </ImageContainer>
            </StatsImageContainer>
        </Section>
    );
};

export default Filter;
