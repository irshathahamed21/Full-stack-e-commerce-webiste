import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import "./header.css"
import logo from "../../../images/logo.png";

const Nav = styled.nav`

  width: calc(100%- 40px);
  height: 75px;
  border-bottom: 2px solid #b49e9e;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color:white(34, 33, 33);
  color:black;
  .logo {
    padding: 5px 0;
   
   
  }
  .logo > img {
    width:200px;
    height:65px;
  }
`

const Header = () => {

  return (
    <Nav className = "navbar">
      <div className="logo">
        <img src = {logo} alt = "logo" />   
    </div>
      <Burger/>
    </Nav>
  )
}

export default Header