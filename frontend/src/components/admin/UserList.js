import React, {Fragment} from 'react'
import {DataGrid} from "@material-ui/data-grid"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar'
import { useEffect } from 'react'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { deleteUser, getAllUsers, clearErrors } from '../../actions/userAction'


const UserList = ({history}) => {
    const dispatch = useDispatch()
    const {error, users} = useSelector((state) => state.allUsers)
    const {error:deleteError, isDeleted} = useSelector((state) => state.profile)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))

    }
    const columns = [
        {field:"id", headerName:"User ID", minWidth:180, flex:0.8},
        {
            field:"email",
            headerName:"Email",
            minWidth:200,
            flex:1,
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.5
        },
        {
            field:"role",
            headerName:"Role",
            type:"number",
            minWidth:150,
            flex:0.3,
            cellClassName:(params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
            },
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
                <Fragment>
                  <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                    onClick={() =>
                      deleteUserHandler(params.getValue(params.id, "id"))
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },

        
    ]

    const rows = []

    users && 
    users.forEach((item) => {
        rows.push({
            id:item._id,
            role: item.role,
            email:item.email,
            name:item.name,

        })
    })

    useEffect(() => {
        if(error){
            dispatch(clearErrors())
        }
        if(deleteError){
            dispatch(clearErrors())
        }
        if(isDeleted){
            history.push("/admin/users")
            dispatch({type:DELETE_USER_RESET})
        }
        dispatch(getAllUsers())

    },[dispatch, isDeleted, error, deleteError, history])

    
  return (
    <>
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>
            
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

export default UserList