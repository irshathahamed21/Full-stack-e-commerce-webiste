import React from 'react'
import { useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import {useSelector, useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import { Rating } from "@material-ui/lab";
import "./productDetails.css"

const ProductDetails = () => {
    const[quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const params = useParams()
    const {loading, product, error} = useSelector((state) => state.productDetails)
    const  {id} = params
    console.log(id)
    console.log(product)

    const increaseQuantity = () => {
        setQuantity(quantity +1)

    }

    const decreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity -1 : quantity = 1)
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
    },[dispatch, id])

    const options = {
        size:"large",
        value:product.ratings,
        precision:0.5,
        readOnly:true
    }
    
    return ( 
        loading ? <> <Loader/> </> :
    <>
    <div className="productDetails">
        <div>
            <Carousel>
                {
                    product.images && 
                    product.images.map((item,i) => (
                        <img src = {item.url}  
                            className = "CarouselImage"
                            alt = {`${i} Slide`}
                            key = {i}
                                />
                    ))
                }
            </Carousel>     
        </div>
        <div>
            <div className="detailsBlock_1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
            </div>
            <div className="detailsBlock_2">
                <Rating {...options}/>
                <span> {" "} ({product.numReviews} Reviews)</span>
            </div>
            <div className="detailsBlock_3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock_3_1">
                    <div className="detailsBlock_3_1_1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity}  />
                        <button onClick = {increaseQuantity} >+</button>
                    </div>
                    <button
                         disabled={product.Stock < 1 ? true : false}
                       
                         >
                    Add to Cart
                    </button>

                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
            </div>
            <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
            </div>

            <button  className="submitReview">
                Submit Review
            </button>
            


        </div>


    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>

    </>
  )
}

export default ProductDetails