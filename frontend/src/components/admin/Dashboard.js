import React from 'react'
import Sidebar from './Sidebar'
import "./dashboard.css"
import {Doughnut, Line} from "react-chartjs-2"
import { CategoryScale, Chart, ArcElement, LinearScale, PointElement, LineElement} from "chart.js";
import { useSelector, useDispatch } from 'react-redux'
import {Link} from  "react-router-dom"
import { Typography } from '@material-ui/core'


const Dashboard = () => {
  Chart.register(LineElement, CategoryScale, ArcElement, LinearScale, PointElement);

  const lineState = {
    labels:["Initial Amount", "Amount Earned"],
    datasets:[
      {
        label:"TOTAL_AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 1000],
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [6, 9],
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
              <Link to = "">
                <p>Product</p>
                <p>10</p>
              </Link >
              <Link to = "">
                <p>Orders</p>
                <p>10</p>
              </Link>
              <Link to = "">
                <p>Users</p>
                <p>10</p>
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