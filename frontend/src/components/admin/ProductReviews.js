import React, {useState, useEffect} from 'react'
import {DataGrid} from "@material-ui/data-grid"
import Sidebar from './Sidebar'
import Star from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction';
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import "./productReviews.css"

const ProductReviews = ({history}) => {
  const [productId, setProductId] = useState("")
  const dispatch = useDispatch()
  const alert = useAlert()
  const {loading, reviews, error} = useSelector((state) => state.productReviews)

  const { isDeleted, error:deleteError} = useSelector((state) => state.review)
 
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId))
  }


  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId))
  };

  useEffect(() => {
    if (productId && productId.length === 24) {
      dispatch(getAllReviews(productId))
      
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors()) 
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors()) 
     
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId])



  const columns = [
    {field:"id", headerName:"Review ID", minWidth:200, flex:0.5},
    {
        field:"user",
        headerName:"User",
        minWidth:200,
        flex:0.6,
    },
    {
        field:"comment",
        headerName:"Comment",
        type:"number",
        minWidth:350,
        flex:1
    },
    {
        field:"rating",
        headerName:"Rating",
        type:"number",
        minWidth:180,
        flex:0.4,
        cellClassName:(params) => {
          return params.getValue(params.id, "rating") >= 3 ? "greenColor" :"redColor"

        }
    },
    {
        field:"actions",
        headerName:"Actions",
        type:"number",
        minWidth:150,
        flex:0.3,
        sortable:false,
        renderCell:(params) => {
            return (
                <>
                <Button onClick = { () => deleteReviewHandler(params.getValue(params.id, "id"))} >
                  <DeleteIcon />
                </Button>
                </>
            )
        }
    },
    
]



  const rows = []

  reviews && 
  reviews.forEach((item) => {
      rows.push({
          id:item._id,
          user: item.user,
          comment:item.comment,
          rating:item.rating,

      })
  })

  return (
    <>
    <metadata title = "Product Reviews" />

    <div className="dashboard">
      <Sidebar/>
      
      <div className="productReviewsContainer">
        <form onSubmit = {productReviewsSubmitHandler} className = "productReviewsForm">
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <Star/>
              <input 
                  type = "text"
                  placeholder='Product Id'
                  required
                  value = {productId}
                  onChange = {(e) => setProductId(e.target.value)}
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
        
     {reviews && reviews.length == 0 ? (
      <div> No Reviews Yet</div>
     ) : (
      <DataGrid
      rows = {rows}
      columns = {columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
     )}
      </div>

    </div>

    </>
  )
}

export default ProductReviews