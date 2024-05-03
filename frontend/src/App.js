import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CheckoutForm from './components/CheckoutForm';
import CheckoutDetails from './components/CheckoutDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CheckoutDetails />} />
          <Route path="/add" element={<CheckoutForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
