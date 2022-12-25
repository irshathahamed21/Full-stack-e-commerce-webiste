import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import {
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
    CardNumberElement,
  } from '@stripe/react-stripe-js';
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey"; 
import CheckoutSteps from "./CheckoutSteps" 
import { createOrder , clearErrors} from "../../actions/orderAction";
import { useAlert } from "react-alert";

const Payment = ({history}) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    console.log(orderInfo)
    const dispatch = useDispatch()
    const elements = useElements()
    const stripe = useStripe()
    const payBtn = useRef(null)
    const alert = useAlert()
    const {shippingInfo, cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)
    const {error} = useSelector((state) => state.newOrder)

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
        e.preventDefault()
        payBtn.current.disabled = true
        try {
            const config = {headers:{"Content-Type":"application/json"},}
            
            const {data} = await axios.post("/irshath-e-commerce-store/payment/process", paymentData, config)
            
            console.log(data)
            const client_secret = data.client_secret


            if(!stripe || !elements) {
                return
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country,
                        }
                    }

                }
            })
            console.log(result)

            if(result.error){
                payBtn.current.disabled = false
            }
            else {
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    history.push("/success")
                }
                else {
                    console.log("there is some issue while making payment")
                }
            }

        }
        catch(error){
            payBtn.current.disabled = false
            console.log(error)

        }
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    },[dispatch, error, alert])

   

  return (
    <>
     <CheckoutSteps activeStep = {2} />
    <div className="paymentContainer">
        <form  className="paymentForm" onSubmit = {(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className="paymentInput" />
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