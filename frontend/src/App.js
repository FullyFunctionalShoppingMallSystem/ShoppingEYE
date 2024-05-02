import CheckoutForm from './components/CheckoutForm';
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';''
import CheckoutDetails from './components/CheckoutDetails';


function App(){
  return (
    <Router>
    <div className="App">
      
        <div>
          <Route path = "/" exact Component={CheckoutDetails}/>
          <Route path = "/add" exact Component={CheckoutForm}/>
        </div>
        
    </div>
    </Router>
  );
}

export default App;
