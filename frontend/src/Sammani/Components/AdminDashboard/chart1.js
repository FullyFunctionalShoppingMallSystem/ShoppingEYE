import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import Chart from "chart.js/auto";
import axios from "axios";



function Chart1(){
    const [orderCountsByDayOfWeek, setOrderCountsByDayOfWeek] = useState({});
    const [lastUpdateTime, setLastUpdateTime] = useState("");

  useEffect(() => {
    // Fetch orders from backend when component mounts
    axios.get("http://localhost:8070/order/")
      .then(response => {
        const orders = response.data;

        // Group orders by day of the week
        const ordersByDayOfWeek = {};
        orders.forEach(order => {
          const date = new Date(order.date);
          const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
          ordersByDayOfWeek[dayOfWeek] = (ordersByDayOfWeek[dayOfWeek] || 0) + 1;
        });
        setOrderCountsByDayOfWeek(ordersByDayOfWeek);
        setLastUpdateTime(new Date().toLocaleString());
       
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

      
      // Step 3: Count the number of orders for each day of the week
     
      


    useEffect(() => {
        // Chart data
        const data = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
            datasets: [
                {
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                    backgroundColor: "rgba(255, 255, 255, .8)",
                    data: Object.values(orderCountsByDayOfWeek),
                    maxBarThickness: 6
                   
                },
            ],
        };
    
        // Chart options
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "white", // Set the color of the y-axis labels to white
                        stepSize: 2, 
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.3)", // Set the color of the grid lines to white with 30% opacity
                        borderDash: [3, 3], // Set the border dash style to create dotted lines
                      },
                },
                x: {
                    ticks: {
                      color: "white", // Set the color of the x-axis labels to white
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.3)", // Set the color of the grid lines to white with 30% opacity
                      borderDash: [3, 3], // Set the border dash style to create dotted lines
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false, // Hide legend
                  },
                  tooltip: {
                    enabled: false, // Disable tooltips
                  },
                },
              };
    
        // Get chart canvas
        const ctx = document.getElementById("chart-line");
    
        // Destroy previous chart instance if exists
        const existingChartInstance = Chart.getChart(ctx);
        if (existingChartInstance) {
            existingChartInstance.destroy();
        }
    
        // Create new chart instance
        new Chart(ctx, {
            type: "bar",
            data: data,
            options: options,
        });
    }, [orderCountsByDayOfWeek]);
    
     
      return (
    <>
 
      
<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">


<div className="container-fluid py-4">



      <div className="row mt-4">
      
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  ">
            <div className="card-header p-0 position-relative mt-n4 mx-2 z-index-2 bg-transparent">
            <div className="bg-gradient-primary shadow-primary border-radius-lg py-4 pe-1">
                <div className="chart">
                  <canvas id="chart-line" className="chart-canvas" height="150"></canvas>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> Daily Sales </h6>
              <hr className="dark horizontal"/>
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> {lastUpdateTime}  </p>
              </div>
            </div>
          </div>
        </div>
       
    
</div>

        </div>
  

     </main> 

    
    </>
  );
}



export default Chart1;