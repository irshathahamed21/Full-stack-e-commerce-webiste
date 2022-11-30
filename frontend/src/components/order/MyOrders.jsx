import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {DataGrid} from "@material-ui/core"

import "./myOrders.css"


const myOrders = () => {
    const dispatch = useDispatch
    const {loading, error, orders} = useSelector((state) => state.myOrders)
    const {user} = useSelector((state) => state.user)

    const rows = []
    const colums = []

    
    return (
   <>
   {
    loading ? (<Loader/>) :
    (
      <>
      <div className="myOrdersPage">
        <DataGrid
          rows = {rows}
          colums = {colums}
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

export default myOrders