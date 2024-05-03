import React, { useState } from 'react';
import axios from 'axios';

function AddImageModal({ setShowModal }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://localhost:8070/socialP/addimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Image</h5>
            <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="imageUpload">Upload Image</label>
                <input type="file" className="form-control-file" id="imageUpload" onChange={handleFileChange} />
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImageModal;
