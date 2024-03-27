import "../assets/css/headerUI.css";
import Header from "../MainHeader.js";
import Unique from "./Unique.js"






function Search(){



   


  
   return(
      <>
      <div className="contact-us blog-author bg-gray-200">
         <Header />
         <div className="card card-body  shadow-blur mx-3 mx-md-4 mt-n6 mb-4" style={{ display: 'flex',backgroundColor:"#7da3c62b" }}>
            <div style={{marginTop:"200px", width:'550px'}}>
            <Unique></Unique>
         </div>
            </div>
        
         
         {/* <Footer /> */}
      </div>
     
     
      </>
   );
}

export default Search;
