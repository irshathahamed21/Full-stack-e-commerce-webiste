import React, { useEffect} from 'react'
import { CgMouse } from "react-icons/cg";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard"
import {useSelector, useDispatch} from "react-redux"
import "./home.css"
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import Metadata from '../layout/Metadata';


const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const {loading, products, error} = useSelector((state) => state.products)

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      dispatch(getProduct())
    }, [dispatch, error, alert])
    
  return (
    <>
    <Metadata title = "E-Commerce" />
      
      <div className = "home">
      <div className="banner">
      <p>Welocme to E Commerce</p>
      <h1>Find amazing products below </h1>  
      <a href="#container">
        <button>
          scroll <CgMouse/>
        </button>
      </a> 
      </div>   
      <h2 className = "homeHeading">
      Featured Products
      </h2>
    
      {loading ?  <Loader/>   : (
        <div className="container" id = "container">
       { products && 
        products.map((product) => (
          <ProductCard key = {product._id}  product = {product}/>
        ))
      }
      </div>
      )
      }
      </div> 
    </>
  )
  
}

export default Home