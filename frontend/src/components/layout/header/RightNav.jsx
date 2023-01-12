import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom"
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Ul = styled.ul`
  list-style: none;
  width:500px;
  height:70px;
  display: flex;
  flex-flow:row nowrap;
  justify-content: space-evenly;
  align-items:center;
 
  li {
    padding: 8px 10px;
    height:20px;
  }
   a {
      text-decoration: none;
      color:black;
    }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color:white;
    position: fixed;
    align-items:start;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 500px;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
     li {
    padding: 8px 10px;
    height:20px;
     }
   
  }
`;
const RightNav = ({ open }) => {
  const { isAuthenticated, user} = useSelector((state) => state.user)

  useEffect(()=>{

  },[isAuthenticated])


  return (
    <Ul open={open}>
      <li><Link to = "/" >Home </Link></li>
      <li><Link to = "/products" >Products </Link></li>
      <li><Link to = "/about" >About </Link></li>
      <li><Link to = "/contact" >Contact </Link></li> 
     { isAuthenticated ?<li><UserOptions user = {user} /></li> : <li><Link to = "/login" >Sign In </Link></li>}
    </Ul>
  )
}

export default RightNav