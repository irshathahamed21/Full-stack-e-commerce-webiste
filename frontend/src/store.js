import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./reducers/productReducer"
import { allUsersReducer, profileReducer, userReducer, userDetailsReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer"


const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    allUsers:allUsersReducer,
    product:productReducer,
    newProduct:newProductReducer,
    userDetails:userDetailsReducer
}
)

const initialState = {
  cart: {
 cartItems: localStorage.getItem("cartItems")
   ? JSON.parse(localStorage.getItem("cartItems"))
   : [],
 shippingInfo: localStorage.getItem("shippingInfo")
   ? JSON.parse(localStorage.getItem("shippingInfo"))
   : {},
}
}



const middleware = [thunk]


const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)) )

export default store


// 02:16 - 02:37 restroom
// 02:37 - 03:00 eating snacks
// 03:00 - 03:42 talking with family while sitting on the floor in the hall
