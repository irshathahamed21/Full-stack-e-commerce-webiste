import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,

    
} from "../constants/userConstants"

import axios from "axios"


export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {headers: {"Content-Type":"application/json"}}

        const {data} = await axios.post(`/irshath-e-commerce-store/login`, {email,password}, config)
        

        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    }
    catch(error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type:REGISTER_USER_REQUEST})
        
        const config = {headers: {"Content-Type":"multipart/form-data"}}

        const {data} = await axios.post(`/irshath-e-commerce-store/register`, userData, config)
        console.log(data)

        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
    }
    catch(error) {
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message})

    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST})

        const {data} = await axios.get("/irshath-e-commerce-store/me")

        dispatch({type:LOAD_USER_SUCCESS, payload:data})

    }
    catch(error) {
        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message})
    }
}


export const logout = () => async(dispatch) => {
    try {

        await axios.get("/irshath-e-commerce-store/logout")
        dispatch({type:LOGOUT_SUCCESS})
    }
    catch(error){
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.message})
    }
}













