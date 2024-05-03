import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddImageModal from './AddImageModel'; 

export default function Photos() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:8070/socialP/images");
        setItems(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ padding: '10px', marginBottom: '10px' }}>
              <p style={{ color: '#190A5F', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', cursor: 'pointer', letterSpacing: '5px' }}>ALL IMAGES</p>
            </div>
            <button className="btn rounded-pill" style={{ width: '200px', background: '#190A5F', color: 'white' }}
                    onClick={() => setShowModal(true)}> {/* Toggle modal visibility */}
              <b>Add Items</b>
            </button>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div className="row">
              {items.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card h-100" style={{ backgroundColor: '#3F8CE9' }}>
                    <div className="card-body d-flex flex-column justify-content-between">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={`Item ${item.id}`}
                          style={{ maxWidth: "100%", maxHeight: "300px", cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showModal && <AddImageModal setShowModal={setShowModal} />}
        </div>
      </div>
    </div>
  );
}
