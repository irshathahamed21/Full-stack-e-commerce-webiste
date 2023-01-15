import React from 'react'
import { useEffect,useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../home/ProductCard';
import Pagination from "react-js-pagination";
import Loader from '../layout/loader/Loader';
import {useParams} from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import "./products.css"
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';

const Products = () => {
  const dispatch = useDispatch()
  const [price, setPrice] = useState([0,25000])
  const [currentPage, setCurrentPage] = useState(1)
  const [ category , setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const {loading, products, error, productsCount,
    resultPerPage,
    filteredProductsCount,} = useSelector((state) => state.products)
  const {keyword} = useParams()
  const alert = useAlert()
  let count = filteredProductsCount;

  console.log(price, category, ratings)

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const priceHandler = (e,price) => {
              setPrice(price)
  }
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
      dispatch(getProduct(keyword, currentPage, price, category, ratings))
  },[dispatch, keyword, currentPage, price, category, ratings, error, alert])


  return (
    <>
    <Metadata title = "Products" />

    {loading ? (
      <Loader/>
    ) :(
     <>
     <h2 className="productsHeading">Products</h2>
     <div className="products">
      {
        products && products.map((product) => (
          <ProductCard key = {product._id} product = {product} /> 
        ))
      }
     </div>
     <div className='filterBox'>
      <Typography>Price</Typography>
      <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
          />
      <Typography>Categories</Typography>
      <ul className="categoryBox">
        {categories.map((category) => (
          <li key = {category} className = "category-link" onClick = {() => setCategory(category)}>{category}</li>
        ))}
      </ul>
      <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
      </fieldset>
     </div>

     {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

     
     </>
    )}
    
    </>
  )
}

export default Products