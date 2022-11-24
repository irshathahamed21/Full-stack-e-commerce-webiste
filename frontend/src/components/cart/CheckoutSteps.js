import React from 'react'
import {Typography, Stepper, Step, StepLabel} from "@material-ui/core"
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkoutSteps.css"

const CheckoutSteps = ({activeStep}) => {
    let steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },
    ]

  return (
    <>
    <Stepper alternativeLabel activeStep={activeStep} >
        {steps.map((item,index) => (
        <Step key={index}  active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
            <StepLabel  style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }} icon = {item.icon}>
            {item.label}
            </StepLabel>
        </Step>
    ))}
    </Stepper>

    
    </>
  )
}

export default CheckoutSteps