import React, {useState, useEffect} from 'react'
import {DataGrid} from "@material-ui/data-grid"
import Sidebar from './Sidebar'
import Star from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const ProductReviews = () => {
  const {productId, setProductId} = useState("")
  const dispatch = useDispatch()
  const {loading, reviews, error} = useSelector((state) => state.productReviews)

  useEffect(() => {
    
  },[])
  

  return (
    <>
    <div className="dashboard">
      <Sidebar/>
      
      <div className="productReviewsContainer">
        <form onSubmit = {productReviewSubmitHandler} className = "productReviewsForm">
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <input 
                  type = "text"
                  placeholder='Product Id'
                  required
                  value = {ProductId}
                  onChange = {() => setProductId(e.target.value)}
                  /> 
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>

        </form>
        
        <DataGrid
          rows = {rows}
          colums = {columns}

        />
      </div>

    </div>

    </>
  )
}

export default ProductReviews