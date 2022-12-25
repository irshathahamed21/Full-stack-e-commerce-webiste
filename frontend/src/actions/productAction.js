import axios from "axios"
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL
    
} from "../constants/productConstants"

export const getProduct = (keyword = "", price = [0, 25000], category, ratings = 0,page) => async (dispatch) => {
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})

        let link = `/irshath-e-commerce-store/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${page}`

        if(category){
            link = `/irshath-e-commerce-store/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}&page=${page}`
        
        }

        const {data} = await axios.get(link)
        console.log(data)
        
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})

        
    }
    catch(error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message})
    }
    
}

// get all products for admin

export const getAdminProduct = () => async(dispatch) => {
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST})

        const {data} = await axios.get("/irshath-e-commerce-store/admin/products")
        console.log(data)
        dispatch({type:ADMIN_PRODUCT_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:error.response.data.message})
        
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/irshath-e-commerce-store/product/${id}`)

        console.log(data)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})

    }

    catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL, payload:error.response.data.message})
    }

}

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type:NEW_PRODUCT_REQUEST})

        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post("/irshath-e-commerce-store/admin/product/new", productData, config )
        dispatch({type:NEW_PRODUCT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:NEW_PRODUCT_FAIL, payload:error.response.data.message})
    }
}


export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST})

        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.put(`/irshath-e-commerce-store/admin/product/${id}`, productData, config)
            console.log(data)
        dispatch({type:UPDATE_PRODUCT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_PRODUCT_FAIL,  payload:error.response.data.message})
    }
}


export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data} = await axios.delete(`/irshath-e-commerce-store/admin/product/${id}`)

        dispatch({type:DELETE_PRODUCT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAIL,  payload:error.response.data.message})
    }
}





export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({type:NEW_REVIEW_REQUEST})
        
        const config = {headers: {
            "Content-Type":"application/json"
        }}
        const {data} = await axios.put("/irshath-e-commerce-store/review", reviewData, config)
        
        dispatch({type:NEW_REVIEW_SUCCESS, payload:data.success})


    }
    catch(error){
        dispatch({type:NEW_REVIEW_FAIL, payload:error.response.data.message})

    }
}

export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({type:ALL_REVIEW_REQUEST})

        const {data} = await axios.get(`/irshath-e-commerce-store/reviews?id=${id}`)

        dispatch({type:ALL_REVIEW_SUCCESS, payload:data.reviews})
    }   
    catch(error) {
        dispatch({type:ALL_REVIEW_FAIL, payload:error.response.data.message})
    }
}

export const deleteReviews = (reviewId, productId) => async(dispatch) => {
    try {
        dispatch({type:DELETE_REVIEW_REQUEST})

        const {data} = await axios.get(`/irshath-e-commerce-store/reviews?id=${reviewId}&productId=${productId}`)

        dispatch({type:DELETE_REVIEW_SUCCESS, payload:data.success})
    }
    catch(error){
        dispatch({type:DELETE_REVIEW_FAIL, payload:error.response.data.message})

    }
}




export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}






