import React from "react";
import styled from "styled-components";

const Section = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom right, #1d013f, #310062);
  z-index: 1000;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Logo = styled.img`
  height: 20px;
`;

const List = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  color: white;
`;

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/likelion_logo.png" />
          <List>
            <ListItem onClick={() => scrollToSection("home")}>Home</ListItem>
            <ListItem onClick={() => scrollToSection("search")}>Search</ListItem>
            <ListItem onClick={() => scrollToSection("stock")}>Stock</ListItem>
          </List>
        </Links>
      </Container>
    </Section>
  );
};

export default Navbar;
