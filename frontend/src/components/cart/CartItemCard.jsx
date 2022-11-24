import React from 'react'
import {Link} from "react-router-dom"
import "./cartItemCart.css"

const CartItemCard = ({deleteCartItems,item }) => {
  return (
    <>
    <div className="CartItemCard" key = {item.name}>
        <img src={item.image} alt={item.name} />
        <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
    </>
  )
}

export default CartItemCard