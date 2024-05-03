import React,{useState,useEffect} from "react";
import axios from "axios";

 
function ApprovedMemberships(){

    const[Amemberships, setAmemberships] = useState([]);
    
    useEffect(()=>{
        function getAmemberships(){
            axios.get('http://localhost:8070/approvedMemberships/AMdis').then((res)=>{
                setAmemberships(res.data)
                
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getAmemberships();

    }, []);
    return(
        <div className="container">
        <br/>
        <h1>Approved Memberships</h1>
       <table className="table">
                <thead>
                    <tr className="table-success">  
                        <th></th>
                        <th scope="col">fullName</th>
                        <th scope="col">Nic</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {Amemberships.map((Amembership, index) => (
                        <tr key={Amembership._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{Amembership.fullName}</td>
                            <td>{Amembership.nic}</td>
                            <td>{Amembership.email}</td>
                            <td>{Amembership.phone}</td>
                            
                           
                        </tr>
                    ))}
                </tbody>
            </table>
 
     </div>     
    );
}

export default ApprovedMemberships;