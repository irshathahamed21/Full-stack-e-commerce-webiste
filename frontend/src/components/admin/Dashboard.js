
import Sidebar from './Sidebar'
import "./dashboard.css"
import {Doughnut, Line} from "react-chartjs-2"
import { CategoryScale, Chart, ArcElement, LinearScale, PointElement, LineElement} from "chart.js";
import { useSelector, useDispatch } from 'react-redux'
import {Link} from  "react-router-dom"
import { Typography } from '@material-ui/core'
import { useEffect } from 'react';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
import { getAllOrders } from '../../actions/orderAction';


const Dashboard = () => {
  Chart.register(LineElement, CategoryScale, ArcElement, LinearScale, PointElement);

  const dispatch = useDispatch()
  const {users} = useSelector((state) => state.allUsers)
  const {orders} = useSelector((state) => state.allOrders)
  const {products} = useSelector((state) => state.products)

  console.log(users, products, orders)
  let outOfStock = 0;

  products && 
  products.forEach((item) => {
    if(item.Stock === 0){
      outOfStock = outOfStock + 1
    }
  })

  let totalAmount = 0;

  orders && 
  orders.forEach((item) => {
    totalAmount = totalAmount + item.totalPrice
  })

  useEffect(() => {
      dispatch(getAdminProduct())
      dispatch(getAllUsers())
      dispatch(getAllOrders())
  },[dispatch])

  const lineState = {
    labels:["Initial Amount", "Amount Earned"],
    datasets:[
      {
        label:"TOTAL_AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length- outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard">
        <Sidebar/>
        <div className="dashboardContainer">
            <Typography component = 
            "h1">
              Dashboard
              </Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br/> 2000
                </p>
              </div>
            <div className="dashboardSummaryBox2">
              <Link to = "/">
                <p>Product</p>
                <p> {products && products.length}</p>
              </Link >
              <Link to = "/">
                <p>Orders</p>
                <p> {orders && orders.length}</p>
              </Link>
              <Link to = "/">
                <p>Users</p>
                <p> {users && users.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data = {lineState}/>
          </div>
          <div className="doughnutChart">
            <Doughnut data = {doughnutState} />
          </div>
        </div>
    </div>
  )
}

export default Dashboard