import axios from "axios"
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR
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
        dispatch({type:ALL_PRODUCT_ERROR,payload:error.response.data.message})
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
        dispatch({type:PRODUCT_DETAILS_ERROR, payload:error.response.data.message})
    }

}
