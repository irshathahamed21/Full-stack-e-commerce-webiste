import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"

import axios from "axios"


export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({type:CREATE_ORDER_REQUEST})
       const config = {
        headers:{
            "Content-Type":"application/json"
        }
       } 
       const {data} = await axios.post("/irshath-e-commerce-store/order/new", order, config)

       dispatch({type:CREATE_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:CREATE_ORDER_FAIL,  payload:error.response.data.message})
    }
}


export const myOrders = () => async(dispatch) => {
    try {
        dispatch({type:MY_ORDERS_REQUEST})
      
       const {data} = await axios.get("/irshath-e-commerce-store/orders/me")
        console.log(data.orders)
       dispatch({type:MY_ORDERS_SUCCESS, payload:data.orders})
    } catch (error) {
        dispatch({type:MY_ORDERS_FAIL,  payload:error.response.data.message})
    }
}

export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/irshath-e-commerce-store/order/${id}`)
        console.log(data)
        dispatch({type:ORDER_DETAILS_SUCCESS, payload: data.order})
    }
    catch(error){
        dispatch({type:ORDER_DETAILS_FAIL, error:error.response.data.message})
    }
}

// get all orders for admin 
export const getAllOrders = () => async(dispatch) => {
    try {
        dispatch({type:ALL_ORDERS_REQUEST})

        const {data} = await axios.get("/irshath-e-commerce-store/admin/orders")
        console.log(data.orders)
        dispatch({type:ALL_ORDERS_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type:ALL_ORDERS_FAIL, payload:error.response.data.message})
    }
}



export const updateOrder = (id, order) => async(dispatch) => {
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})

        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.put(`/irshath-e-commerce-store/admin/order/${id}`, order, config)
        
        dispatch({type:UPDATE_ORDER_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type:UPDATE_ORDER_FAIL, error:error.response.data.message})
    }
}


export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch({type:DELETE_ORDER_REQUEST})

        const {data} = await axios.delete(`/irshath-e-commerce-store/admin/order/${id}`)
        
        dispatch({type:DELETE_ORDER_SUCCESS, payload: data.success})
    }
    catch(error){
        dispatch({type:DELETE_ORDER_FAIL, error:error.response.data.message})
    }
}



export const clearErrors = () => (dispatch) => {
        dispatch({type:CLEAR_ERRORS})
}







