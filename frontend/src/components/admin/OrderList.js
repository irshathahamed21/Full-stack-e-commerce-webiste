import React from 'react'
import {DataGrid} from "@material-ui/data-grid"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteOrder, getAllOrders } from '../../actions/orderAction'
import { useEffect } from 'react'
import { clearErrors } from '../../actions/productAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import "./productlist.css"
import { useAlert } from "react-alert";




const OrderList = ({history}) => {
    const dispatch = useDispatch()
    const {error, orders} = useSelector((state) => state.allOrders)
    const {error:deleteError, isDeleted} = useSelector((state) => state.order)
    const alert = useAlert()
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))

    }
    const columns = [
        {field:"id", headerName:"Order ID", minWidth:300, flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName:(params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" :"redColor"
            }

        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.4
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex:0.5
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.4
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
                     <Link to = {`/admin/order/${params.getValue(params.id, "id")}`}>
                     <EditIcon/>
                     </Link>
                     <Button onClick = {() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                     <DeleteIcon/>
                     </Button>
                    </>
                )
            }
        },
        
    ]

    const rows = []

    orders && 
    orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
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
            alert.success("Order deleted successfully")
            history.push("/admin/orders")
            dispatch({type:DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders())

    },[dispatch, isDeleted, error, deleteError, history, alert])

    
  return (
    <>
    <metadata title = "Order's List" />
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
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

export default OrderList