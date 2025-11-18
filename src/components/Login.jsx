import './styles/Login.css';
import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from './LoadingPage';

function Login(){
  const [logit, setLogit] = useState({Email_ID:"  ",password:""});
  const [invalidtext, setInvalidtext] = useState("");
  const [bringTheLoadingPage,setBringTheLoadingPage ]=useState(false);

  const params=useLocation();
  let value=new URLSearchParams(params.search);
  let usertype=value.get('value') || 'user';
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

const getTitle = () => {
  if(usertype==="authority") return "Government Login";
  if(usertype==="druginspector") return "Gazette Officer Login";
  return `${usertype.replace(/^./, str => str.toUpperCase())} Login`;
};

const getSignupLink = () => {
  if(usertype==="authority") return "/signupauthority";
  if(usertype==="druginspector") return "/signupdrug";
  if(usertype==="farmer") return "/signupfarmer";
  if(usertype==="doctor") return "/signupdoctor";
  return "/signupstartup";
};

  return(
    <div className='login-page'>
      { bringTheLoadingPage ? (
        <LoadingPage text={"Loading..."}/>
      ):(
        <div className='login-card'>
          <div className='login-avatar'>
            <div className='login-avatar-inner'></div>
          </div>
          <p className="login-title">{getTitle()}</p>
          <form className='login-form' onSubmit={handelSubmit}>
            <div className='login-field'>
              <label className="login-label">Email ID</label>
              <div className='login-input-wrap'>
                <span className='login-icon'>✉️</span>
                <input type="text" className="login-input" name="Email_ID" required onChange={handleChange} placeholder="Email ID" />
              </div>
            </div>
            <div className='login-field'>
              <label className="login-label">Password</label>
              <div className='login-input-wrap'>
                <span className='login-icon'>🔒</span>
                <input type="password" className="login-input" name="password" onChange={handleChange} placeholder="Password" />
              </div>
              { invalidtext && <p className="Login-error">{invalidtext}</p>}
            </div>
            <div className='login-utility'>
              <label className='remember-wrap'>
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className='forgot-btn'>Forgot Password?</button>
            </div>
            <button className="login-submit">LOGIN</button>
          </form>
          <Link to={getSignupLink()} className="login-signup">Signup / create new account</Link>
        </div>
      )
      }
    </div>
  );
}
export default Login;




