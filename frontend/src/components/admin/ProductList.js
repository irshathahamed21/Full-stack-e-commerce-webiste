import React from 'react'
import {DataGrid} from "@material-ui/data-grid"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useEffect } from 'react'
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import "./productlist.css"
import { useAlert } from "react-alert";


const ProductList = ({history}) => {
    const dispatch = useDispatch()
    const {error, products} = useSelector((state) => state.products)
    const {error:deleteError, isDeleted} = useSelector((state) => state.product)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))

    }
    const alert = useAlert()
    const columns = [
        {field:"id", headerName:"Product ID", minWidth:200, flex:0.5},
        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:1,
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex:0.5
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:0.5
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
                     <Link to = {`/admin/product/${params.getValue(params.id, "id")}`}>
                     <EditIcon/>
                     </Link>
                     <Button onClick = {() => deleteProductHandler(params.getValue(params.id, "id"))}>
                     <DeleteIcon/>
                     </Button>
                    </>
                )
            }
        },
        
    ]

    const rows = []

    products && 
    products.forEach((item) => {
        rows.push({
            id:item._id,
            name: item.name,
            stock:item.Stock,
            price:item.price,

        })
    })

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("Product deleted successfully")
            history.push("/admin/products")
            dispatch({type:DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProduct())

    },[dispatch, isDeleted, error, deleteError, history, alert])

    
  return (
    <>
    <metadata title = "Product's List" />

    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>

            <DataGrid
                rows = {rows}
                columns = {columns}
                className = "productListTable"
                pageSize = {10}
                disableSelectiOnClick
                autoHeight
            />
        </div>
    </div>
    </>
  )
}

export default ProductList