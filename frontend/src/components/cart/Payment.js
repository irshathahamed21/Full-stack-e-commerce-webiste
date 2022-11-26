import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import {
    CardElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";  

const Payment = ({history}) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    
    const dispatch = useDispatch()
    const elements = useElements()
    const stripe = useStripe()
    const payBtn = useRef(null)

    const {shippingInfo, cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice * 100)

    }

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }

    const submitHandler = async(e) => {
        e.peventDefault()
    }


  return (
    <>
    <div className="paymentContainer">
        <form  className="paymentForm" onSubmit = {(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardElement className="paymentInput" />
            </div>
            <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
            </div>
            <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
            </div>
            <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
            />
        </form>
    </div>
    </>
  )
}

export default Payment