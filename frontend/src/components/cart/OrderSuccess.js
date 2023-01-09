import React from 'react'
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./orderSuccess.css"

const OrderSuccess = () => {
  return (
    <>
  
  <metadata title = "Order Success" />
  
    <div className = "orderSuccess">
    <CheckCircleIcon>
        <Typography>Your Order has been successfully placed</Typography>
        <Link to = "/orders">My Orders</Link>
    </CheckCircleIcon>
    </div>
    </>
  )
}

export default OrderSuccess