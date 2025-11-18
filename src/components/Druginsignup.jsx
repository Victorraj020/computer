




import './styles/Druginsignup.css';
import React,{ useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';
import drugpic from '../assets/logindrug.jpg';
import startuppic from '../assets/loginstartup.jpg';

// import Footer from './Dashboard comps/Footer';

function Druginsignup(){

  const indian_states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh (UT)", "Chhattisgarh", "Dadra and Nagar Haveli (UT)", "Daman and Diu (UT)", "Delhi (NCT)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep (UT)", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry (UT)", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
  const [districtsList, setDistrictsList] = useState([]);
  const [drugindata, setDrugindata] = useState(
    {name:"",Email_ID:"",password:"",district:"",state:"",phone_number:""});
    const [passerror, setPasserror] = useState("");
    let passvalid=false;
    const [quality, setQuality] = useState(null);
    const [guidelines, setGuidelines] = useState(null);
    const [errors, setErrors] = useState({ quality: false, guidelines: false });
    const [pdfissubmited, setpdfissubmited] = useState();
    let druginspector='druginspector';
    const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
    const [changenumber, setchangenumber] = useState();
    const [numbererror, setnumbererror] = useState();

    const [renderQ, setRenderQ] = useState(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
  const [renderG, setRenderG] = useState(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
 
    useEffect( 
      ()=>{
       fetchDistricts();
        return ()=>{// empty the district list
          setDistrictsList([]);
           }
           
      },[drugindata.state]);

      const [validations, setValidations] = useState({
        lowercase: false,
        uppercase: false,
        digit: false,
        specialChar: false,
        length: false,
      });
    
      useEffect(() => {  // password handle
        // Define regular expressions for each validation rule
        const password = drugindata.password;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasValidLength = password.length >= 8 && password.length <= 30;
    
        // Update validation states based on regex tests
        setValidations({
          lowercase: hasLowercase,
          uppercase: hasUppercase,
          digit: hasDigit,
          specialChar: hasSpecialChar,
          length: hasValidLength,
        });
      }, [drugindata.password]);

    const handleChange=(e)=>
    {
      e.preventDefault();
      const{name,value}=e.target;
      setDrugindata({...drugindata,[name]:value});
      if(name==="password"&& value.length<8)
        {
         setPasserror("Password must contain 8 letters");
        }
        else if(name==="password"&&value.length>=8){
         setPasserror("");
        }
    if (name === "phone_number" && value.length !== 10) {
          setchangenumber("Phone number must contain exactly 10 digits");
      } else if (name === "phone_number" && value.length === 10) {
         setchangenumber("");
      }

    if(name==="phone_number" && value.length ===10){
      setRenderQ(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
    setRenderG(<span style={{ color: 'blue' }}>Status not yet calculated</span>);

    // Set a timeout of 3 seconds to update the status
    setTimeout(() => {
      setRenderQ(<span style={{ color: 'green' }}>Quality is validated</span>);
      setRenderG(<span style={{ color: 'green' }}>Guidelines are validated</span>);
    }, 2000);
    }
    
    }
        

        const  doVerifyGuidlines = async(formData)=>
          {
            try {
              const response = await axios.post("http://localhost:5002/api/guideline-check",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                } );
              if (response.data.success) {
                console.log("verified true quaility! ");
                return true; // return it
              } else {
                console.error("Signup failed", response.data);
                return false;
              }
            } catch (error) {
              console.error("Error during signup:", error);
            }
          } 
// Handle file upload (for the PDF)
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]); // Store the selected file in state
};
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        if(drugindata.phone_number.length!=10)
        {
            setnumbererror(true);
        }
        if(drugindata.password.length<8)
        {
          passvalid=true;
        }
        passvalid ? setPasserror("Password must contain 8 letters") : setPasserror("");


        try{
        const response= await axios.post("http://localhost:5002/api/drugInspector-reg",drugindata);
        if(response.data.success)
        {
          alert("Successfully registered !");
          window.location.href = `/login?value=${druginspector}`;
        }
        else{
          alert("Please Try again")
        }
      }
      catch (error) {
        console.log(error);
    }
  }
   
    const fetchDistricts = async () => {
      try {
          const response = await fetch('http://localhost:5002/api/districts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ stateName : drugindata.state}),
          });

          if (!response.ok) {
              throw new Error('State not found or other error');
          }

          const data = await response.json();
          setDistrictsList(data.districts);
      } catch (error) {
          console.error('Error fetching districts:', error);
      }
    }
    function checkQuality()
    {
       console.log("quality checking here");
      let response =true;
     setQuality(response);
     console.log("quality is",quality);
    }
    function checkGuidelines()
    {
      console.log("guidlines check here");
     let responses =true;
     console.log(responses);
    setGuidelines(responses);
    }

 
    return (
      <>
      <Header/>
      <div className='  mt-36 w-[90%] h-[580px] mx-auto flex relative'>
          <div className="w-[30%] h-[580px] bg-black fixed">
            {/* The blurred image */}
            <img 
              src={startuppic} 
              className="w-full h-full object-cover opacity-50" 
              alt="start-up img" 
            />
            
            {/* The text overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Welcome 
            </div>
          </div>

          <div className='w-[68%] bg-white absolute right-0 top-0 pb-10'>

          <form id="" onSubmit={handleSubmit}>
                <div className=" Drug-sign-head1">
                   <div className=" Drug-sign-head2">
                     <p className="Drug-sign-para">Drugs Inspector Registration Form </p>
                   </div>
                </div>

                <div className="px-8">
                   
                <div>
                   <label className="Drug-sign-label">Enter the name:</label> 
                   <input type="text" name="name" onChange={handleChange} className="Drug-sign-input mb-1" />
                </div>

                <div>
                   <label className="doctor-sign-label">Upload your Allotment Letter :</label>
                   <input type="file" accept=".pdf" className=" Drug-sign-input" onChange={handleFileChange}/>
                </div>

                <div className='flex w-full mb-1'>
                     <div className=' flex flex-col w-[50%] mr-2'>
                        <label className=" Drug-sign-label ">Enter the state:</label> 
                        <select value={drugindata.state} name="state" onChange={handleChange} className=" Drug-sign-input">
                                <option value="" disabled>Select a state</option>
                                {indian_states.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                         </select>
                     </div>
                     
                     <div className=' flex flex-col w-[50%] ml-2'>
                        <label className=" Drug-sign-label">Enter district name:</label> 
                        <select value={drugindata.district} name="district" onChange={handleChange} className=" Drug-sign-input">
                             <option value="" disabled>Select a district</option>
                             {districtsList.map((district, index) => (
                                 <option key={index} value={district}>
                                     {district}
                                 </option>
                             ))}
                         </select>
                     </div>
                      
                </div>

                
                
                <div className='flex w-full -mt-4'>
                    <div className=' flex flex-col w-[50%] mr-2'>
                       <label className=" Drug-sign-label">Enter Email:</label> 
                       <input type="email" name="Email_ID" onChange={handleChange} className=" Drug-sign-input" />
                    </div>
                    <div className=' flex flex-col w-[50%] ml-2'>
                       <label className="Drug-sign-label" >Enter the phone number:</label>
                       <input type="number" className=" Drug-sign-input" name="phone_number" onChange={handleChange}/><br />
                       {changenumber&&<p style={{color:"red"}}>{changenumber}</p>}
                    </div>
                </div>

                <div className='-mt-10'>
                     <label className=" Drug-sign-label">Enter the password:</label>
                     <input type="password" name="password" onChange={handleChange} className=" Drug-sign-input" /><br />
                     <ul className="password-checklist">
                     <li className={validations.lowercase ? "valid" : "invalid"}>
                       At least one lowercase letter
                     </li>
                     <li className={validations.uppercase ? "valid" : "invalid"}>
                       At least one uppercase letter
                     </li>
                     <li className={validations.digit ? "valid" : "invalid"}>
                       At least one digit
                     </li>
                     <li className={validations.specialChar ? "valid" : "invalid"}>
                       At least one special character from the set
                     </li>
                     <li className={validations.length ? "valid" : "invalid"}>
                       Be between 8 and 30 characters long
                     </li>
                     </ul>
                     
                     {/* {passerror&&<p className="Drug-sign-error">{passerror}</p>} */}
                </div>

                
                
                
                <div>
                    <p>PDF Quality : {renderQ} </p>
                    <p>PDF Followed Guidelines : {renderG} </p>
                </div>
                
                
                <div>
                   <button className="Drug-sign-button">submit</button>
                </div>
                
                </div>

              </form>
          </div>
      </div>


    </>
    );
}

export default Druginsignup;











