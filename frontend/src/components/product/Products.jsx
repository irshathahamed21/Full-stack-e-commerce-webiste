import React from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getProduct } from '../../actions/productAction';
import ProductCard from '../home/ProductCard';

import Loader from '../layout/loader/Loader';
import {useParams} from "react-router-dom"

import "./products.css"

const Products = () => {
  const dispatch = useDispatch()
  const {loading, products, error} = useSelector((state) => state.products)
  const {keyword} = useParams()
  console.log(keyword)

  useEffect(() => {
      dispatch(getProduct(keyword))
  },[dispatch,keyword])


  return (
    <>
    {loading ? (
      <Loader/>
    ) :(
     <>
     <div className="products">
      {
        products && products.map((product) => (
          <ProductCard key = {product._id} product = {product} /> 
        ))
      }
     </div>
     </>
    )}
    
    </>
  )
}

export default Products