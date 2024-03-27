import React, { useState, useEffect } from "react";
import "../assets/css/Furniture.css";
import Header from "../MainHeader";
import image1 from "../assets/img/mimosa.png";
import "../assets/css/pricing.css";
import axios from "axios";
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Mimosa() {
  const [data, setData] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8070/baylee/");
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
  };
  const fetchItemDetails = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:8070/baylee/getItem/${itemId}`);
      const item = response.data;

      const formData = new FormData();

      formData.append('itemId', String(item.itemId));
      formData.append('itemName', item.itemName);
      formData.append('price', String(item.price));
      formData.append('quantity', '1');
      formData.append('shopName', item.shopName);
      formData.append('type', item.type);
      formData.append('size', item.size);

      const imageBlob = new Blob([new Uint8Array(item.image.data.data)], { type: item.image.contentType });
      formData.append('image', imageBlob, item.itemId + '.png');

      await axios.post("http://localhost:8070/cart/addItem", formData);

      console.log("Item added to cart successfully!");
      // Show toast notification
      toast.success('Item added to cart successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "black",
          color:"white"
        }
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };



  return (
    <>
      <div className="contact-us blog-author bg-gray-200">
        <header>
          <Header />
          <div className="" loading="lazy">
            <img src={image1} alt="Mimosa" />
          </div>
        </header>
        <div
          className="card card-body  shadow-blur mx-3 mx-md-4 mt-n6 mb-4"
          style={{ backgroundColor: "rgb(125 163 198 / 17%)" }}
        >
          <br />
          <br />
          <div style={{ marginTop: "20px" }}>
            <div className="searchBar" style={{color:""}}>
              <input
                type="text"
                className="searchTerm"
                placeholder="Search for stores..."
              />
              <button type="submit" className="searchButton">
                <i
                  style={{ marginTop: "5px" }}
                  className="material-icons text-m"
                >
                  search
                </i>
              </button>
            </div>
            <br></br>
            <div className="pricing-box-container">
              {data &&
                data.map((singleData) => {
                  const base64String = btoa(
                    String.fromCharCode(
                      ...new Uint8Array(singleData.image.data.data)
                    )
                  );
                  return (
                    <div
                      key={singleData._id}
                      className="pricing-box pricing-box-bg-image text-center"
                    >
                      <img
                        src={`data:image/png;base64,${base64String}`}
                        alt="image"
                        style={{
                          width: "200px",
                          height: "300px",
                          marginTop: "20px",
                        }}
                      ></img>
                      <br></br>
                      <h6 style={{color:"white"}}>{singleData.itemName}</h6>
                      <button className="btn-primarys" onClick={() => fetchItemDetails(singleData.itemId)} >Add</button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Mimosa;
