import React, { useState, useEffect } from "react";
import "../assets/css/Stores.css"
import axios from "axios";


function FashionStores(){

  // Display
  const [data, setData] = useState([]);
   
  useEffect(() => {
     fetchData();
  }, []);

  const fetchData = async () => {
      try {
         const response = await axios.get("http://localhost:8070/shop/getTypes/Women");
         setData(response.data);
      } catch (error) {
         // Check if the error is due to cart being empty
         if (error.response && error.response.status === 404) {
            // Cart is empty, set data to an empty array
            setData([]);
         } else {
            console.error("Error fetching data:", error);
         }
      }
   }

   return (
    <>
      <div id="mz-gallery-container">
        <div id="mz-gallery">
          {data && data.map((singleData) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.image.data.data))
            );
            return (
              <figure key={singleData._id}>
        <img src={`data:image/png;base64,${base64String}`} alt="image"  style={{ width: "150px", height: "150px" }}   />
                <figcaption>{singleData.shopName}</figcaption>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </figure>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FashionStores;