import PrintList from './PrintList.jsx';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/Filterstartup.css';
export default function Filterstartup({name,email}) {
  const [startupdata,setstartupdata] = useState([]);
   
    console.log(Array.isArray(startupdata));
 useEffect(()=>{
   const fetchit = async(e)=>{
  
    try{
      if(name='farmer')
        {
      const response=await axios.post('http://localhost:5002/api/farmer-dashboard',email);
      //variable name is email but it contains phone number in case of farmer
        }
        else if(name='doctor')
        { 
          const response= await axios.post('http://localhost:5002/api/doctor-dashboard',email);
        }
        if(response.success)
        {
             setstartupdata(response.data);
        }
    }
    catch(error)
    {
      console.log(error);
    }
   }
   fetchit();
 },[])

  return (
    <> 
    <p className='startup-info'>Startup Info</p>

    {  startupdata.length > 0 ? 
      ( startupdata.map((obj,index) => (
        
      <PrintList   name1={obj.name} Email1={obj.Email} phone1={obj.phone} district1= {obj.district} ></PrintList>
           ))) :(<h1 style={{textAlign:'center'}}>no startup available</h1>)}
   </>
  );
}