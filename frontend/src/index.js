import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CheckoutForm from './CheckoutForm'; // Correct the import path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path ='/' element={<App />} />
      <Route path ='/checkouts' element={<CheckoutForm />} /> {/* Update here */}
    </Routes>
  </BrowserRouter>
);
