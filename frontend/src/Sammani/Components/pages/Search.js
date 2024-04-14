import "../assets/css/headerUI.css";
import Header from "../MainHeader.js";
import Unique from "./Unique.js";
import image1 from "../assets/img/anime.png";
import image2 from "../assets/img/game.jpeg";
import { useState } from 'react'; // Import useState from react
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function Search(){

   const [fileList, setFileList] = useState([]);
   const [email, setEmail] = useState('');
   const [description, setDescription] = useState('');
//add
   
const handleSubmit = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   fileList.forEach((file) => {
     formData.append('image', file.originFileObj);
   });
   formData.append('email', email);
   formData.append('description', description);
 
   try {
     await axios.post('http://localhost:8070/Tee/addTshirt', formData);
     toast.success('T-shirt details added successfully!', {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       style: {
         backgroundColor: "black",
         color: "white"
       }
     });


     setTimeout(() => {
      window.location.reload();
    }, 1000); 
   } catch (error) {
     console.error('Error adding T-shirt details:', error);
     toast.error('Failed to add T-shirt details. Please try again later.');
   }
 };
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList || [])

      const updatedFileList = newFileList.map(file => ({
         ...file,
         status: 'done'
       }));
       setFileList(updatedFileList);
    };
  
    const onPreview = async (file) => {
      let src = file.url;
      if (!src && file.originFileObj) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open('');
      imgWindow?.document.write(image.outerHTML);
    };
  
   return(
      <>
      <div className="contact-us blog-author bg-gray-300">
         <Header />
       
         <div className="card card-body  shadow-blur mx-3 mx-md-4 mt-n6 mb-4" style={{backgroundColor:"#7da3c62b" }}>
          
            <div style={{marginTop:"200px",display:'flex'}}>
               <div style={{width:"550px"}}> <Unique style={{width:'200px'}}/></div> 
               <div style={{marginLeft:'10px'}}>
                  <a href="http://react-three-openai.s3-website.eu-west-3.amazonaws.com/" target="_blank">  
                     <img style={{width:"670px"}} src={image1} alt="anime" />
                  </a>
                  <br></br>
                  <br></br>
                  <div style={{backgroundColor:'#ffffff8c',marginLeft:"10px",marginRight:'10px'}}>
                  <form encType="multipart/form-data">
                  <div  style={{marginLeft:"20px", display:"flex", paddingTop:"15px",}}>
                   
                  <ImgCrop rotationSlider>
                  <div style={{ border: "1px solid black" , borderRadius:"8px", display:"flex", width:"100px"  }}>
  <Upload
    action="https://example.com/upload"
    listType="picture-card"
    fileList={fileList}
    onChange={onChange}
    onPreview={onPreview}
  >
    {fileList.length < 1 && "+ Upload"}
  </Upload>

</div>
</ImgCrop>

<div>

<div className="input-group input-group-outline" style={{width:"500px", height:'20px', marginLeft:"30px"}} >
<h6>Email :</h6>
      <input type="email" name="discount" onChange={(e) => setEmail(e.target.value)} style={{ border: "1px solid black", marginLeft:"20px" }}
                  className="form-control"  required/>  
    </div>
    <div className="input-group input-group-outline" style={{width:"500px", height:'20px', marginLeft:"30px", marginTop:"30px"}} >
    <h6>Description :</h6>
      <textarea type="text" name="discount" onChange={(e) => setDescription(e.target.value)}  style={{ border: "1px solid black",marginLeft:"20px" }}
                  className="form-control"  required/>  
    </div>

        
    </div>    
  
</div>

<button style={{marginLeft:"25px", marginTop:"20px"}} onClick={handleSubmit} className="btn bg-gradient-success mb-0" >Submit</button>
          
                  </form>
                  <br></br>
                  </div>
                 <div style={{marginLeft:"10px",marginTop:"20px"}}>
                  <img style={{height:"210px", width:'650px'}} src={image2} />
                 </div>
                  <br></br>
               </div>
            </div>
         </div>
      </div>
      <ToastContainer/>
      </>
   );
}

export default Search;
