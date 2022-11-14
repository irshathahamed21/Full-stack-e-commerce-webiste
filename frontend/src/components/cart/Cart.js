import React from 'react'
import { useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import "./cart.css"
import CartItemCard from './CartItemCard'


const Cart = () => {
    const {cartItems} = useDispatch((state) => state.cart)

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
        dispatch(removeItemsFromCart(id))
    }


  return (
   <>
   <div className="cartPage">
    <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
    </div>
    {
        cartItems && cartItems.map((item) => (
            <div className="cartContainer" key = {addItemsToCart.product}>
                <CartItemCard item = {item}  />
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
        </div>
    </div>


   </div>
   </>
  )
}

export default Cart