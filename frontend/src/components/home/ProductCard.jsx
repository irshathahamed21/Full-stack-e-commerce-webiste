import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from "@material-ui/lab";
import "./home.css"


const ProductCard = ({product}) => {
 

  let options = {
    value:product.ratings,
    readOnly:true,
    precision:0.5
  }

  return (
    <>
    <Link to = {`/product/${product._id}`} >
    <div className='productCard'>
        <img src = {product && product.images[0].url} alt = {product.name} />
        <p>{product.name}</p>
        <div >
          <Rating {...options}/>{" "}
          <span className = "productCardSpan" > {" "}({product.numReviews} Reviews)</span>

        </div>
        <span>₹ {product.price}</span>
    </div>
    </Link>


    </>
  )
}

export default ProductCard