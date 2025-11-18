import React, { useState, useEffect } from 'react';
import '../styles/StartupApplication.css';
import axios from 'axios';
import refreshIcon from '../styles/refresh.svg';
import UserManual from './UserManual';
function StartupSingup({ email }) {

  const cn_email = email || "not passed";

  const [startupdata, setStartupdata] = useState({
    Email:cn_email, PANno:"", GSTno:"",
    websiteAddress:"",certificateNo:"",CompanyDOI:"",
    IssuuingAuthority:"",IE_code:"",IE_DOI:"" });

  const [originalData, setOriginalData] = useState({});
  const [editing, setEditing] = useState();
  const [userExists, setUserExists] = useState(false); // Flag to track if the user data exists

  // Captcha handling
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const [panError, setPanError] = useState('');
  const [gstError, setGstError] = useState('');
  const [dpiitError, setDpiitError] = useState('');

  useEffect(() => { // load user data
    generateCaptcha();
    // Fetch user data on mount if it exists
    const fetchUserData = async () => {
      try {
        const Email_ID = email;
        const response = await axios.post('http://localhost:5002/api/startup-dash-retrieval', { Email_ID });
        if (response.data.success) {
          const fetchedData ={...response.data.data}[0];  // 4d thinking
          // Ensure all fields are populated properly
          setStartupdata({
            Email: fetchedData.Email || "",
            PANno: fetchedData.PANno || "",
            
            GSTno: fetchedData.GSTno || "",
            websiteAddress: fetchedData.websiteAddress || "",
            certificateNo: fetchedData.certificateNo || "",
            CompanyDOI: fetchedData.CompanyDOI || "",
            IssuuingAuthority: fetchedData.IssuuingAuthority || "",
            IE_code: fetchedData.IE_code || "",
            IE_DOI: fetchedData.IE_DOI || "",
          });

          setOriginalData({
            Email: fetchedData.Email || "",
            PANno: fetchedData.PANno || "",
            GSTno: fetchedData.GSTno || "",
            websiteAddress: fetchedData.websiteAddress || "",
            certificateNo: fetchedData.certificateNo || "",
            CompanyDOI: fetchedData.CompanyDOI || "",
            IssuuingAuthority: fetchedData.IssuuingAuthority || "",
            IE_code: fetchedData.IE_code || "",
            IE_DOI: fetchedData.IE_DOI || "",
          }); // Store original data to COMPARE LATER
          setUserExists(true); // Set flag to indicate that user data exists
          setEditing(false);
        } else {
          setUserExists(false);
          setEditing(true);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [email]);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStartupdata({ ...startupdata, [name]: value });
  };

  // Captcha and validation methods
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6;
    let randomCaptcha = '';
    for (let i = 0; i < captchaLength; i++) {
      randomCaptcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(randomCaptcha);
  };

  const handleCaptchaChange = (event) => setUserCaptcha(event.target.value);
  const validateCaptcha = () => userCaptcha === captcha ? true : setCaptchaError('Invalid captcha');
  const validatePAN = (PANno) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(PANno);
  const validateGST = (GSTno) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(GSTno);
  const validateDPIIT = (certificateNo) => /^[A-Z]{4}[0-9]{5}$/.test(certificateNo);

  // Edit mode toggle
  // const editit = () => setEditing(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!validatePAN(startupdata.PANno)) {
      setPanError('Invalid PAN format.');
      isValid = false;
    } else {
      setPanError('');
    }


    if (!validateGST(startupdata.GSTno)) {
      setGstError('Invalid GST format.');
      isValid = false;
    } else {
      setGstError('');
    }

    if (!validateDPIIT(startupdata.certificateNo)) {
      setDpiitError('Invalid DPIIT format.');
      isValid = false;
    } else {
      setDpiitError('');
    }



    if (!validateCaptcha()) {
      isValid = false;
      // alert("Invalid Captcha");
    }

    if (isValid) {
      try {
            if (userExists) {
                    // Update method: Send only changed fields using PUT
                      const updatedFields = {};
                      Object.keys(startupdata).forEach((key) => {
                        if (startupdata[key] !== originalData[key]) {
                          updatedFields[key] = startupdata[key];
                        }
                      });
                      if (Object.keys(updatedFields).length > 0) {
                        const response = await axios.put(`http://localhost:5002/api/update-fill-application/${email}`, updatedFields);
                        if (response.data.success) {
                            alert('Data updated successfully!');
                          }
                      } else {
                        alert('No changes detected.');
                      }

              } else {
                      // Create and POST for new user data
                      const response = await axios.post('http://localhost:5002/api/startup-dash-post-fillapplication', startupdata);
                      if (response.data.success) {
                        alert('Successfully Filled the application');
                      
                      } else {
                        alert('Error in submission. Please try again.');
                      }
              }
              window.location.reload();
      } catch (error) {
        console.log('Error in form submission:', error);
      }
  } else {
    console.log('Form is not valid');
  }
};

function makeiteditable(){
  setEditing(true);
  console.log("changed to edit");
}

    return (
        <>
        <div className="container-application mt-28 relative ">
            <div className="header">
                <p style={{color : 'rgb(6, 6, 87)', fontSize:'2rem'}}>Application Form</p>
            </div>
            <div className=''>
            <UserManual/>
            </div>
             {userExists ? <p style={{color:"green",fontSize:"0.9rem"}}>You have already submitted the data.<br/>You can edit now</p>
                         : <p style={{color:"red",fontSize:"0.9rem"}}>You haven't submitted the form yet. Please fill the details.</p> }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{fontSize:'1.5rem'}}>1.Details of Manufacturer</label>
                </div>
                
                  <div className=' flex w-full'>
                         <div className="form-group w-[50%] mr-2">
                           <label>PAN No. of the company<span className=' text-red-500 ml-2'>*</span></label>
                           <input  type="text"  placeholder="PAN No. of the company/Firm"   name="PANno" readOnly={!editing} value={startupdata.PANno ||""} onChange={handleChange}  maxLength="10" // Limiting PAN number to 10 characters 
                           />
                           {panError && <p className="error">{panError}</p>}
                       </div>
       
                       {/* <div className="form-group w-[50%] ml-2">
                           <label>PAN No. of the company</label>
                           <input className='h-[52%] ' type="file" placeholder="PAN No. of the company/Firm"  readOnly={!editing} onChange={handleChange} 
                           />
                           {panError && <p className="error">{panError}</p>}
                           </div> */}
                  </div>


                <div className='flex w-full'>
                <div className="form-group w-[50%] mr-2">
                <label>GST No. of the company/Firm</label>
                    <input type="text" placeholder="GST No. of the company/Firm" name="GSTno" readOnly={!editing}value={startupdata.GSTno ||""}onChange={handleChange} maxLength="15" // Limiting GST number to 15 characters
 
 />
                    {gstError && <p className="error">{gstError}</p>}
                </div>
                <div className="form-group w-[50%] ml-2">
                    <label>Website Email Address</label>
                    <input type="text"name="websiteAddress"readOnly={!editing} value={startupdata.websiteAddress ||""} onChange={handleChange} placeholder="Website Address.." />
                </div>
                </div>


                <div className="form-group">
                    <label style={{fontSize:'1.5rem'}}>2. Startup Certification Details</label>
                    {/* <label> Company Incorporation Certification Details</label> */}
                </div>

                <div className=' grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4'>
                   <div className="form-group">
                       <label>DPIIT No.<span className=' text-red-500 ml-2'>*</span></label>
                       <input type="text"readOnly={!editing} name="certificateNo" value={startupdata.certificateNo ||""} onChange={handleChange} maxLength="9" placeholder="Enter company certificate no"/>
                       {dpiitError && <p className="error">{dpiitError}</p>}
                   </div>
                   <div className="form-group">
                       <label>Date of Issue</label>
                       <input type="date"readOnly={!editing} name="CompanyDOI" value={startupdata.CompanyDOI ||""} onChange={handleChange}/>
                   </div>
                   <div  className="form-group">
                       <label>Issuing Authority</label>
                       <input type="text" readOnly={!editing}name="IssuuingAuthority" value={startupdata.IssuuingAuthority ||""}onChange={handleChange} placeholder="Enter name of issuing authority" />
                   </div>
                </div>


                <div className="form-group">
                    <label style={{fontSize:'1.5rem'}} >3. Details of IE Code by DGFT</label>
                </div>
                <div className=' grid sm:grid-cols-2 grid-cols-1 gap-4'>
                   <div className="form-group">
                       <label>(a)IE Code</label>
                       <input type="text" readOnly={!editing} name="IE_code" value={startupdata.IE_code ||""} onChange={handleChange} placeholder='Enter IE Code' />
                   </div>
                   <div className="form-group">
                       <label>(b)IE code Date of Issue</label>
                       <input type="date" name="IE_DOI" readOnly={!editing} value={startupdata.IE_DOI ||""} onChange={handleChange}/>
                   </div>
                </div>


                <div className="form-group">
                    {/* <label style={{fontSize:'1.5rem'}} >4. Purpose of Applying*</label> */}
                    <label > <span style={{color:"blue"}}>{userExists ? "EXISTING" : "NEW" } </span> (automatic detection) </label>
                </div>

                <div className=' flex flex-col '>
                    <div><label id="ll32">Captcha</label></div>
                    <div className='grid md:grid-cols-3 grid-cols-1'>
                        <div className="cap-cont w-[300px] " > <span id="captcha">{captcha+"  "}</span></div>              
                        
                         <div className='flex gap-2'>
                            <button id="captcha-regenerate" onClick={generateCaptcha}> 
                              <div style={{ backgroundImage: `url(${refreshIcon})`, width: '35px', height: '35px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div> 
                             </button>
                            <input id="li20" type="text" placeholder="Enter captcha" value={userCaptcha} className="bluish-input w-full" onChange={handleCaptchaChange} />
                         </div>
                    </div>
                  <br/>
                  {captchaError && <p className="error">{captchaError}</p>}       
                </div>

               

                <div className=' flex w-[60%] items-center h-full gap-4'>
                <div className=' w-[30%] '>
                  <button className={`edit-button ${editing ? "editable" : ""}`} disabled={!userExists} onClick={makeiteditable}>Edit</button>
                </div>
      
                <div className='w-[60%]'>
                  <button type="submit" className=' w-full'>Submit</button>
                </div>
                </div>
               
            </form>
      
        </div>
        </>
    );
}

export default StartupSingup;


