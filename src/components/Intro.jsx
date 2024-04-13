import React from 'react'
import styled from "styled-components";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`

const Title = styled.h1`
    font-size: 74px;
`

const Curstock = styled.li`

`

const Right = styled.div`
    flex: 3;
    position: relative;
`

const Img = styled.img`
    width: 800px;
    height: 600px;
    object-fit: contain;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`

const Infobox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    margin: 20px 0;
    border: 2px solid #222;
    border-radius: 10px;
`;

const Desc = styled.p`

`

const Button = styled.button`
    font-weight: 500;
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const Intro = () => {
    return (
        <Section>
            <Container>
                <Left>
                    <Title>Mutsa Stock</Title>
                    <Curstock>
                        Kospi: 2,708.54
                    </Curstock>
                    <Curstock>
                        Kosdaq: 857.61
                    </Curstock>
                    <Curstock>
                        Nasdaq: 16,253.96
                    </Curstock>
                </Left>
                <Right>
                    <Img src="./img/stock.jpg"/>
                    <Infobox>
                        <Desc>
                        This site is a practice screen for the Mutsa project.
                        </Desc>
                        <Button>Learn More</Button>
                    </Infobox>
                </Right>
            </Container>
        </Section>
    )
}

export default Intro