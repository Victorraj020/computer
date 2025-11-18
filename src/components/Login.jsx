import './styles/Login.css';
import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import doctorpic from '../assets/logindoctor.jpg';
import startuppic from '../assets/regihaiyeh.jpg';
import farmerpic from '../assets/loginfarmer.jpg';
import drugpic from '../assets/logindrug.jpg';
import authorpic from '../assets/loginauthority.jpg';

import LoadingPage from './LoadingPage';

function 
Login(){
  const [logit, setLogit] = useState({Email_ID:"  ",password:""});
  const [invalidtext, setInvalidtext] = useState("");
  const [replacepic, setreplacepic] = useState();
const [bringTheLoadingPage,setBringTheLoadingPage ]=useState(false);

  const params=useLocation();
  let value=new URLSearchParams(params.search);
  let usertype=value.get('value');
  let invalid=false;
  const intake = usertype === "farmer" ? "phone number" : "email";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogit({ ...logit, [name]: value });
    if(name==="password"&& value.length<8)
      {
        setInvalidtext("Password must contain 8 letters");
      }
      else if(name==="password"&&value.length>=8){
        setInvalidtext("");
      }
};

const handelSubmit =async(e)=>{
  setBringTheLoadingPage(true); // made true
  e.preventDefault();
  if(logit.password.length<8)
  {
      invalid=true;
  }
  invalid ? setInvalidtext("password must contain 8 letters") : setInvalidtext("");
  if(usertype ==="farmer")
    setLogit({phone_number:logit.Email_ID, password:logit.password}); // changing the req.body backend recievers feild name in-according to the farmer
  try
  {
      const response = await axios.post(`http://localhost:5002/api/${usertype}-login`, logit); 
      // setBringTheLoadingPage(false);   this global false setting  is not working for some reason.
      if (response.data.success) 
      {
            const tokenrec = response.data.token;
            setBringTheLoadingPage(false);
            // alert("Logged in successfully!");
            if(usertype==="farmer")
          { 
               window.location.href=`/farmerdash?phno=${logit.phone_number}&token=${tokenrec}`;
               return null;
          }
            const encodedEmail = btoa(logit.Email_ID); // Encode the email using Base64
            console.log("encodedEmail ",encodedEmail,"token rec",tokenrec);
            window.location.href = `/${usertype}dash?email=${encodedEmail}&token=${tokenrec}`;
      
    }else{
      setBringTheLoadingPage(false);
        console.log("thrown message from backend : ",response.data.message);
        alert("thrown message from backend : "+response.data.message);
        }
  
    } catch (error) {
      setBringTheLoadingPage(false);
    console.error('Error occurred:', error);
    alert("invalid login details , please try again");
  }
 
}
useEffect(() => {
  
 if(usertype==='doctor')
   setreplacepic(doctorpic);
 else if(usertype==='druginspector') 
   setreplacepic(drugpic);
 else if(usertype==='farmer') 
   setreplacepic(farmerpic);
  else if(usertype==='authority')
    setreplacepic(authorpic);
 else if(usertype==='startup')
    setreplacepic(startuppic); 
}, []);
  return(
      <div className='login-total'>
      <Header/>

  { bringTheLoadingPage ? (
    <LoadingPage text={"Loading..."}/>
  ):(

    <div className=' mt-36 lg:w-[80%] md:w-[80%] sm:w-[80%] w-100% h-[580px] mx-auto flex relative'>
          <div className="w-[40%] h-[580px] bg-black lg:fixed md:fixed sm:hidden hidden">
            {/* The blurred image */}
            <img 
              src={replacepic} 
              className="w-full h-full object-cover opacity-90" 
              alt="start-up img" 
            />
      
          </div>

        <div className=' w-[60%] h-[580px] flex items-center justify-center bg-white absolute right-0 top-0 pb-10'>
           <form id=''onSubmit={handelSubmit}>
            
                  <div className="Login-container w-[500px] ">
                        
                        {usertype==="authority" ?  <p className="login-headin">{"Government Login"}</p> : 
                        usertype==="druginspector"? <p className="login-headin">{"Gazette Officer Login"}</p> :
                          <p className="login-headin">{usertype.replace(/^./, str => str.toUpperCase())} Login</p>
                        }
                        <div>
                          <p className=' text-xl'>Welcome Back</p>
                          <p className=' text-sm'>To keep connected with us please Login with your personal email and password</p>
                        </div>
                        <div className=' mt-8'>
                          <div className=''>
                             <label className="Login-label">Enter the {intake} </label>
                             <input type="text" className="Login-input" name="Email_ID" required onChange={handleChange}/>
                          </div>
                          <div className=' -mt-3'>
                             <label className="Login-label">Enter the password</label>
                             <input type="password" className="Login-input" name="password" onChange={handleChange}/>
                             { invalidtext && <p className="Login-error -mt-4">{invalidtext}</p>}
                          </div>
                        </div>

                        {
                            usertype==="authority"? <Link to="/signupauthority"><p className="login-headin"></p></Link> :
                            usertype==="druginspector"?<Link to="/signupdrug"> <p className="login-headin"></p></Link> :
                            <Link to="/signupstartup"><p className="">Don't have an account <span className=' underline'>Sign Up</span></p></Link>
                        }
                        {/* signupdrug */}
                       
                          <div className=' mt-4'>
                              <button className="Login-button">Submit</button>
                          </div>
                  
                  </div>

                  
            </form>
        </div>
      </div>
      )
      }
      </div>
    );
}
export default Login;




