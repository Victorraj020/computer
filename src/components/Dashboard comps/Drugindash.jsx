


import React,{useEffect,useState} from 'react';
import PrintdrugList from './PrintdrugList';
import '../styles/Drugindash.css';
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/ayush_logo.jpg';
import logo2 from '../../assets/ayush_logo2.jpg';
import logo3 from '../../assets/logo_hindiEnglish.png';

export default function Drugindash() {

  const params= useLocation();
  let values=new URLSearchParams(params.search);
  let decemail= values.get('email');
  let email= atob(decemail);
  let token= values.get('token');
  const [tokenvalidation, settokenvalidation] = useState(false);
  
//   const [pendingStartups , setPendingStartups] = useState([]); 
//   const [startUpEmails , setstartUpEmails] = useState([]);
  const [pendingemails, setpendingEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  useEffect(()=>{  // token verification
    const fetch_it = async(e)=>{
      try {
        const response = await axios.post('http://localhost:5002/api/tokenverify', 
            {email}, { // parsing the token as a JSON file
                        headers: {
                            'authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json',
                        } 
                    }
        );
        const tokenSuccess  = response.data.tokenSuccess;
        settokenvalidation(tokenSuccess);        
        if (tokenSuccess) {
            console.log("Token success:", tokenSuccess);
            
        } else if(tokenSuccess===false){
            alert("token is false.. invalid entry into the portal");
            settokenvalidation(false);
            // block the whole website down
        }else {
            console.log("TokenSuccess variable itself is not recieved from the Backend RESPONSE.");
        }
    } catch (error) {

        if (error.response) {
            // Server responded with a status code OUTSIDE of the 2xx range
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
        } else if (error.request) {
            // No response received from the server
            console.error("No response received:", error.request);
        } else {
            // Something went wrong setting up the request
            console.error("Request error:", error.message);
        }
    }
    
            }
    fetch_it();
   
    return()=>{
        fetch_it();
    }
},[]);

useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/isDrugInspectorAssigned-true');
        if(response.data.success && response.data.assignedList.length > 0) {
          setpendingEmails(response.data.assignedList);
        } else {
          setpendingEmails([]); // Set to empty if no emails found
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setpendingEmails([]);
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    fetchEmails();
  }, []); // Run only once when the component mounts

        
if(tokenvalidation===false){
    return(<><h1>Error 404 </h1> <p>Token is not received</p></>)
}
if (loading) {
    return <h1>Loading...</h1>;
}





   return (
    <>
    {/* <Header/> */}

    <div className=' flex justify-between max-w-[1300px] mx-auto py-3 fixed top-0 left-0 right-0 bg-white z-10'>
        <div className=' flex items-center cursor-pointer' onClick={handleClick}>
          <div><img src={logo} width={30}/></div>
          <div className='flex items-center '>
            <img src={logo3} className=' h-[50px]' />
          </div>
        </div>

        <div className=' flex items-center gap-6'>
            <div><p>Language</p></div>
            <div><img src={logo2} width={50}/></div>
        </div>
    </div>


    <div id="drug-dash-id"> 
    <p className='drug-dash-head'>DrugInspector Dashboard</p>
    </div>
   
    <div>
     { pendingemails.length === 0 ? (
        <h1>No emails found</h1>
      ):(
        <PrintdrugList startupmails={pendingemails}/>
      )
      }
    </div>
    </>
  )
}
