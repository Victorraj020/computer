




import React,{useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/Startupdashboard.css';

import Startuptrackpad from './Startuptrackpad';
import StartupApplication from './StartupApplication';
import Header from '../Header';
import Extrafeatures from './Extrafeatures';
import PeerForum from './PeerForum';
import Footer from './Footer';
import Logout from './Logout';
import YourProfile from './YourProfile';

import logo from '../../assets/ayush_logo.jpg';
import logo2 from '../../assets/ayush_logo2.jpg';
import logo3 from '../../assets/logo_hindiEnglish.png';
import Inscommunication from './Inscommunication';
import YourDownload from './YourDownload';

export default function Startupdashboard() {
    //1 is doctor
    //2 is farmer
    const [value, setvalue] = useState(1);
    const [tokenvalidation, settokenvalidation] = useState();
   const params= useLocation();
   let values=new URLSearchParams(params.search);
   let decemail= values.get('email');
//    console.log(decemail);
  let email= atob(decemail);
   let token= values.get('token');
   const [activeTab, setActiveTab] = useState('Status');
   
   useEffect(()=>{
    const fetch_it = async(e)=>{
        try {
            const response = await axios.post('http://localhost:5002/api/tokenverify', 
                {token}, { // parsing the token as a JSON file
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
//    if(!tokenvalidation){
//     return(<h1>Error 404</h1>)
//    }
  
//    console.log(email);  
   if(!email.endsWith('@gmail.com'))
   {
   return( <h1 style={{ textAlign: 'center' }}>Email Should be valid</h1>);
   }
    function goStatus()
    {
       
        setvalue(1);
       
    }
    function goApplication()
    {
        
        setvalue(2);
      
    }
    function goAyush()
    {
       
        setvalue(3);
      
    }
    function goPeerForum()
    {
        
        setvalue(4);
      
    }
    function goYourProfile(){
        setvalue(5);
    }

    function goYourLicense(){
        setvalue(6);
    }


    const navigate=useNavigate();
    const handleClick = () => {
      navigate('/');
    };


  return (
    <div>
    {/* <Header/> */}
    <div className=' bg-white w-[100%]'>
    <div className=' flex justify-between px-28 py-3 fixed top-0 left-0 right-0 bg-white z-10'>
        <div className=' flex items-center cursor-pointer' onClick={handleClick}>
          <div><img src={logo} width={30}/></div>
          <div className='flex items-center '>
            <img src={logo3} className=' h-[50px]' />
          </div>
        </div>

        {/* right side */}
        <div className=' flex items-center gap-6'>
            {/* <div><button className=' bg-blue-400 py-1 px-3 rounded-md text-white'><Link to='/login-register'>Register/Login</Link></button></div> */}
            <div><img src={logo2} width={50}/></div>
        </div>
    </div>
    </div>

    {/* <div style={{paddingTop:"160px"}}><p className='sttup-head'>Startup Dashboard</p></div> */}
    
      <div className=' flex w-full relative'>

      <div className='mt-20 w-[20%] h-[700px] fixed bg-[#a59d84] '>
    
          <div className='flex flex-col gap-7 p-5 cursor-pointer startup-right-hover'>
        <p 
            className={activeTab === 'Status' ? 'active-tab' : ''} 
            onClick={() => { goStatus(); setActiveTab('Status'); }}
        >
            Status Tracking
        </p>
        <p 
            className={activeTab === 'Application' ? 'active-tab' : ''} 
            onClick={() => { goApplication(); setActiveTab('Application'); }}
        >
            Fill Application
        </p>
         <p 
            className={activeTab === 'Ayush' ? 'active-tab' : ''} 
            onClick={() => { goAyush(); setActiveTab('Ayush'); }}
        >
            Ayush Ecosystem 
        </p> 
        <p 
            className={activeTab === 'PeerForum' ? 'active-tab' : ''} 
            onClick={() => { goPeerForum(); setActiveTab('PeerForum'); }}
        >
            Peer Forum
        </p>
        <p 
            className={activeTab === 'YourProfile' ? 'active-tab' : ''} 
            onClick={() => { goYourProfile(); setActiveTab('YourProfile'); }}
        >
            Your Profile
        </p>
        <p 
            className={activeTab === 'YourDownload' ? 'active-tab' : ''} 
            onClick={() => { goYourLicense(); setActiveTab('YourDownload'); }}
        >
            Download License
        </p>
          </div>

          <div className='startup-dsh-nav-right'>
             <Logout/>
          </div>
      </div>

      <div className=' w-[80%] absolute left-72'>
          {value === 1 ? (<Startuptrackpad email={email} />) :
              (value === 2 ? (<StartupApplication email={email} />) :
                  (value === 3 ? (<Inscommunication email={email} />) :
                      (value === 4 ? (<PeerForum email={email} />) : 
                          (value === 5 ? (<YourProfile email={email} />) :
                           (value === 6 ? (<YourDownload email={email} />) : (null)))
                      )
                  )
              )
          }
      </div>

      </div>
      
    {/* <Footer/> */}
</div>

  );
}