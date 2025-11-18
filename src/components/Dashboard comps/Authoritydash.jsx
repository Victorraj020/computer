

import React,{useState,useEffect} from 'react';
import Authorityhome from './Authorityhome';
import Authoritynotification from './Authoritynotfication';
import Header from '../Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Authoritydash.css';
import Footer from './Footer';
import Logout from './Logout';
import Authendicatedrug from './Authendicatedrug';

import logo from '../../assets/ayush_logo.jpg';
import logo2 from '../../assets/ayush_logo2.jpg';
import logo3 from '../../assets/logo_hindiEnglish.png';

export default function Authoritydash() {
     const [drugtab, Setdrugtab] = useState(1);
     const params= useLocation();
     const [tokenvalidation, settokenvalidation] = useState();
   let values=new URLSearchParams(params.search);
   let decemail= values.get('email');
   let email= atob(decemail);
   let token= values.get('token');

   useEffect(()=>{     // parsing the token
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

//       if(tokenvalidation==false){
//     return(<p>Error 404</p>)
//    }
    function gohome()
    {
        Setdrugtab(1);
    }
    function gonotification()
    {
        Setdrugtab(2);
    }
    function goauthendicate()
    {
        Setdrugtab(3);
    }
    const navigate=useNavigate();
    const handleClick = () => {
      navigate('/');
    };
  return (
    <>
    {/* <Header/> */}

    <div className=' flex justify-between px-24 py-3 fixed top-0 left-0 right-0 bg-white z-10'>
        <div className=' flex items-center cursor-pointer' onClick={handleClick}>
          <div><img src={logo} width={30}/></div>
          <div className='flex items-center '>
            <img src={logo3} className=' h-[50px]' />
          </div>
        </div>

        {/* right side */}
        <div className=' flex items-center gap-6'>
            <div><p>Language</p></div>
            {/* <div><button className=' bg-blue-400 py-1 px-3 rounded-md text-white'><Link to='/login-register'>Register/Login</Link></button></div> */}
            <div><img src={logo2} width={50}/></div>
        </div>
    </div>




    <div className='flex w-full relative '>
    <div id="" className='w-[20%] fixed top-20 left-0 right-0 h-full bg-orange-200'> 
    {/* <p className='drug-head'>Licensing Authority Dashboard</p> */}
         <div className='p-6'>
             <div className='flex flex-col gap-5 cursor-pointer text-sm '>
                 <p className={drugtab === 1 ? 'active-tabauth' : ''}  onClick={gohome}>Home</p>
                 <p className={drugtab === 2 ? 'active-tabauth' : ''} onClick={gonotification}>Notifications</p>
                 <p className={drugtab === 3 ? 'active-tabauth' : ''} onClick={goauthendicate}>Authendicate Drug Inscpector</p>
             </div>
             <div className=' mt-10'>
             <Logout/> 
             </div>
         </div>
    </div>
    <div className=' w-[80%] absolute left-72 top-20'>
         {
           drugtab === 1 ? (<Authorityhome email={email}/>) : drugtab === 2 ? (<Authoritynotification email={email}/>) :
           drugtab === 3 ? (<Authendicatedrug email={email}/>) : (null)
         }
    </div>
    </div>

   {/* <Footer/> */}
    </>
  )
}
