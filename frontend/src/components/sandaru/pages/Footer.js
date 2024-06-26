import React from 'react';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import image from "../assets/img/logo.png"

export const Footer = () => {
  return (
    <div >
      <footer className="footer mt-auto py-3" style={ { bottom: 0, width: '100%', backgroundColor: 'black',position:'static', boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1),' }}>
        <div className="container" style={{paddingTop: '20px'}}>
          <div  className='row' style={{textAlign:'center', color: 'white'}}>
            <center>
            <div className='col-md-4'>
              <div style={{display:"flex"}}>
            <img src={image} style={{width:"40px" , height:"40px", marginBottom:"5px", marginLeft:'50px'}} ></img>
              &nbsp;
              <h4 style={{color: 'white',marginTop:"10px"}}> &nbsp; MAZZA GALLERRY</h4>
              </div>
              <Link to={'#'} className='btn rounded-pill' style={{color: 'white'}}><PhoneIcon/></Link>
              <span style={{ marginRight: "20px" }}></span>
              <Link to={'#'} className='btn rounded-pill' style={{color: 'white'}}><WhatsAppIcon/></Link>
              <span style={{ marginRight: "20px" }}></span>
              <Link to={'#'} className='btn rounded-pill' style={{color: 'white'}}><EmailIcon/></Link>
            
              <p> &nbsp; &nbsp; &nbsp;All Right Reserved for © <b>MAZZA GALLERRY</b></p> 
              <ul>
             <p>About US</p>
              <p>FAQ</p>
             </ul>
            </div>
            </center>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;