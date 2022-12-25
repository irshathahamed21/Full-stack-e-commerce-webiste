import React from 'react'
import { useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import {useSelector, useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import { Rating } from "@material-ui/lab";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
import "./productDetails.css"
import ReviewCard from './ReviewCard';
import { addItemsToCart } from '../../actions/cartAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import {useAlert} from "react-alert"

const ProductDetails = () => {
    const[rating, setRating] = useState(0)
    const[open, setOpen] = useState(false)
    const[quantity, setQuantity] = useState(1)
    const[comment, setComment] = useState("")
    const dispatch = useDispatch()
    const params = useParams()
    const {loading, product, error} = useSelector((state) => state.productDetails)
    const {success, error:reviewError } = useSelector((state) => state.newReview)
    const  {id} = params
    const alert = useAlert()

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        setQuantity(quantity +1)

    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        let qty =1;
        setQuantity(quantity > 1 ? quantity -1 : qty)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        // alert.success("Items added to cart")
    }
    

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", id)   
        
        dispatch(newReview(myForm))
        setOpen(false)
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(reviewError){
            alert.error(reviewError)
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Review submitted successfully")
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id))
    },[dispatch, id, error, reviewError, success, alert])

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
                            className = "carouselImage"
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
                    <button disabled={product.Stock < 1 ? true : false} 
                            onClick = {addToCartHandler}>
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

            <button  className="submitReview" onClick = {submitReviewToggle}>
                Submit Review
            </button>
            


        </div>


    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>
    <Dialog
         aria-labelledby="simple-dialog-title"
         open={open}
         onClose={submitReviewToggle}
    >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className='submitDialog'>
            <Rating
                onChange = {(e) => setRating(e.target.value)}
                value = {rating}
                size = "large"
            />
            <textarea
             className="submitDialogTextArea"
             cols="30"
             rows="5"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
        </DialogContent>
        <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
                Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>
    

    
    {product.reviews && product.reviews[0] ? (
        <div className="reviews">
            {
                product.reviews.map((review) => (
                    <ReviewCard key = {review._id} review = {review} />
                ))
            }
        </div>
    ) : (
        <div className='noReviews'>No Reviews Yet </div>
    )}

    </>
  )
}

export default ProductDetails