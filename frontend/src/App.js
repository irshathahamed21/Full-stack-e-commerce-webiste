import React, {useEffect, useState} from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/layout/header/Header';
import Home from "./components/home/Home";
import Footer from "./components/layout/footer/Footer";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/user/LoginSignup";
import UpdateProfile from "./components/user/UpdateProfile";
import Cart from "./components/cart/Cart"
import store from "./store"
import { loadUser } from "./actions/userAction";
import {useSelector} from "react-redux";
import "./App.css";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UpdatePassword from "./components/user/UpdatePassword";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment"
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct"
import ProductList from "./components/admin/ProductList"
import UpdateProduct from "./components/admin/UpdateProduct"
import UserList from "./components/admin/UserList"
import OrderList from "./components/admin/OrderList"
import ProcessOrder from "./components/admin/ProcessOrder";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import NotFound from './components/layout/notfound/NotFound';


function App() {
    const { user, token} = useSelector((state) => state.user)
    const [stripeApiKey, setStripeApiKey] = useState(null)

  //  async function getStripeApikey() {
  //   const {data} = await axios.get("/irshath-e-commerce-store/stripeapikey")

  //   setStripeApiKey(data.stripeApiKey)
  //  }
  
   axios.defaults.headers.common = {
    'Authorization': `Bearer ${token}`,
  };
    console.log(user)
    // const [stripeApiKey, setStripeApiKey] = useState("")
    console.log(stripeApiKey)

  
  
   
 
    useEffect(() => {
        WebFont.load({
          google: {
            families: ["Roboto", "Droid Sans", "Chilanka"],
          },
        })
        store.dispatch(loadUser() )
        // getStripeApikey()
         
       
    },[])

 
  
  return (
   
    <Router >
      <Header user = {user}  />
      
      {stripeApiKey && (
        <Elements stripe={loadStripe(pk_test_51M7fPNSBLINyeutfGMCg1908KqHwIfGPqZviHB9YO5Cd9kiomy0HYbcGsn870uV4KNRniHNuYzXKiYcdiTi2OGse00hbszBZDZ)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        
      
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/product/:id" component = {ProductDetails} />
      <Route exact path = "/products" component={Products}/>
      <Route path="/products/:keyword" component={Products} />
      <Route exact path = "/search" component={Search}/>
      <Route exact path = "/login" component = {LoginSignup}/>
      <ProtectedRoute exact path = "/account" component = {Profile} />
      <ProtectedRoute exact path = "/me/update" component = {UpdateProfile}/>
      <ProtectedRoute exact path = "/password/update" component = {UpdatePassword}/>
      <ProtectedRoute exact path = "/cart" component = {Cart} />
      <ProtectedRoute exact path = "/shipping" component = {Shipping} />
      <ProtectedRoute exact path = "/success" component = {OrderSuccess} />
      <ProtectedRoute exact path = "/orders" component={MyOrders} />
      <ProtectedRoute exact path = "/order/confirm" component = {ConfirmOrder} />
      <ProtectedRoute exact path = "/order/:id" component = {OrderDetails}/>
      
      <ProtectedRoute exact path = "/admin/dashboard" isAdmin = {true} component = {Dashboard}/>
      <ProtectedRoute exact path = "/admin/products" isAdmin = {true} component = {ProductList}/>
      <ProtectedRoute exact path = "/admin/product" isAdmin = {true} component = {NewProduct}/>
      <ProtectedRoute exact path = "/admin/product/:id" isAdmin = {true} component = {UpdateProduct}/>
      <ProtectedRoute exact path = "/admin/orders" isAdmin = {true} component = {OrderList}/>
      <ProtectedRoute exact path = "/admin/order/:id" isAdmin = {true} component = {ProcessOrder}/>
      <ProtectedRoute exact path = "/admin/users" isAdmin = {true} component = {UserList}/>
      <ProtectedRoute exact path = "/admin/user/:id" isAdmin = {true} component = {UpdateUser}/>
      <ProtectedRoute exact path = "/admin/reviews" isAdmin = {true} component = {ProductReviews}/>
      <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
      <Footer/>
      {/* // 07:10 -08:05 */}
    </Router>
  )
}

export default App