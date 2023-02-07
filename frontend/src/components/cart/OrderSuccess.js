import React from 'react'
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./orderSuccess.css"
import Metadata from '../layout/Metadata';


const OrderSuccess = () => {
  return (
    <>
  
  <Metadata title = "Order Success" />
  
    <div className = "orderSuccess">
    <CheckCircleIcon/>
    <Typography>Your Order has been successfully placed</Typography>
    <Link to = "/orders">My Orders</Link>
    </div>
    </>
  )
}

export default OrderSuccess