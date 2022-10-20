import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productsReducer } from "./reducers/productReducer"
import { userReducer } from "./reducers/userReducer"


const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer
}
)

const middleware = [thunk]
const initialState = {}

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)) )

export default store