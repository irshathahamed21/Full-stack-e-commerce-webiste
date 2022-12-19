import React from 'react'
import {DataGrid} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Sidebar from './Sidebar'


const OrderList = ({history}) => {
    const dispatch = useDispatch()
    const {error, orders} = useSelector((state) => state.allOrders)
    const {error:isDeletedError, isDeleted} = useSelector((state) => state.order)

    const columns = [
        {field:"id", headerName:"Order ID", minWidth:300, flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName:(params) => {
                return params.getValue(parm.id, "status") === "Delivered" ? "greenColor" :"redColor"
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
            sortable:false
        },
        
    ]
    
  return (
    <>
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <DataGrid
                rows = {rows}
                colums = {columns}
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