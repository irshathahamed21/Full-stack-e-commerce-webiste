import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import "./cart.css"
import CartItemCard from './CartItemCard'
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {Link} from "react-router-dom"

const Cart = ({history}) => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)
    
    console.log(cartItems)

    const increaseQuantity = (id, quantity, stock ) =>{
        const newQty = quantity + 1
        if(quantity > stock){
            return 
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id,quantity) => {
        const newQty = quantity - 1
        
        if(quantity < 0){
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shopping")
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }


  return (
    <>
    {
        cartItems.length === 0 ? (
            <div className = "emptyCart">
                <RemoveShoppingCartIcon />
                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ): (<>
   <div className="cartPage">
    <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
    </div>
    {
        cartItems && cartItems.map((item) => (
            <div className="cartContainer" key = {addItemsToCart.product}>
                <CartItemCard item = {item} deleteCartItems = {deleteCartItems} />
                <div className="cartInput">
                    <button onClick = {decreaseQuantity(item.product, item.quantity)} >-</button> 
                    <input type = "number" value = {item.quantity} readOnly />
                    <button onClick = {increaseQuantity(item.product, item.quantity, item.stock)} >-</button>
                </div>
                <p className="cartSubTotal">
                    {`₹${item.price * item.quantity}`}
                </p>
            </div>
        ))
    }
    <div className="cartGrossProfit">
        <div></div>
        <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            {/* <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>    */}
        </div>
        <div></div>
        <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
        </div>
    </div>


   </div>
   </> )
            }
     </>
  )
}

export default Cart