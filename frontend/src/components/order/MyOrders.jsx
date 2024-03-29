import React , {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {DataGrid} from "@material-ui/data-grid"
import Loader from "../layout/loader/Loader"
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrors, myOrders } from '../../actions/orderAction'
import "./myOrders.css"
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata';


const MyOrders = () => {
    const dispatch = useDispatch()
    const {loading, error, orders} = useSelector((state) => state.myOrders)
    const {user} = useSelector((state) => state.user)
    const alert = useAlert()
    const rows = []
  
    orders && orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    })
    const columns = [
      {field:"id", headerName:"order Id", minWidth:300, flex:1},
      {field:"status", 
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    }

    ]

  useEffect(() =>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(myOrders())
  },[dispatch, alert, error])

    
    return (
   <>
    <Metadata title = "My Orders" />

   {
    loading ? (<Loader/>) :
    (
      <>

      <div className="myOrdersPage">
        <DataGrid
          rows = {rows}
          columns = {columns}
          pageSize= {10}
          disableSelectionOnClick
          className = "myOrdersTable"
          autoHeight
        />
        <Typography id="myOrdersHeading">
          {user.name} Orders
        </Typography>
      </div>
      </>
    )
   }
   </>
  )
}

export default MyOrders