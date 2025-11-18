// import Footer from './Dashboard comps/Footer';
import investorPic from '../assets/ayush_logo.jpg';
import LoadingPage from './LoadingPage';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './styles/InvestorSignup.css'


const Investorsignupp = () => {
  const [investorData, setInvestorData] = useState({
    Email_ID: "",
    password: "",
    name: "",
    organization: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    district: "",
    phone_number: "",
    investmentFocus: "",
    preferredIndustries: ""
  });


  const [pinerror, setPinerror] = useState("");
  const [phnerror, setPhnerror] = useState("");
  const [bringTheLoadingPage, setBringTheLoadingPage] = useState(false);

  const [validations, setValidations] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
    length: false,
  });


  useEffect(() => {
    fetchDistricts();
    return () => {
      setDistrictsList([]);
    };
  }, [investorData.state]);

  useEffect(() => {
    const password = investorData.password;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasValidLength = password.length >= 8 && password.length <= 30;

    setValidations({
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      digit: hasDigit,
      specialChar: hasSpecialChar,
      length: hasValidLength,
    });
  }, [investorData.password]);

  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInvestorData({ ...investorData, [name]: value });

    if (name === "phone_number" && value.length !== 10) {
      setPhnerror("Phone number must contain exactly 10 digits");
    } else if (name === "phone_number" && value.length === 10) {
      setPhnerror("");
    }
    if (name === "pinCode" && value.length < 6) {
      setPinerror("Pin number must contain 6 digits");
    } else if (name === "pinCode" && value.length >= 6) {
      setPinerror("");
    }
  };


  const onSubmit = async (e) => {
    setBringTheLoadingPage(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/api/investor-reg", investorData);
      if (response.data.success) {
        setBringTheLoadingPage(false);
        alert("Successfully Signed Up");
        window.location.href = `/login?value=${'investor'}`;
      } else {
        setBringTheLoadingPage(false);
        alert("Invalid Details. Please try again!");
      }
    } catch (error) {
      setBringTheLoadingPage(false);
      alert("An error occurred. Server might be down.");
    }

  };

  const indian_states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
  const [districtsList, setDistrictsList] = useState([]);

  const fetchDistricts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/districts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateName: investorData.state }),
      });
      const data = await response.json();
      setDistrictsList(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };




  return (
    <>
      <Header />

      {bringTheLoadingPage ? (
        <LoadingPage text={"Submitting your data..."} />
      ) : (
        <div className='flex w-[90%] mx-auto mt-40 mb-10'>
          <div className='w-[30%]'>
            <img src={investorPic} id='investor-pic-id' alt='Investor Registration' />
          </div>

          <div className='w-[70%]'>
            <form onSubmit={onSubmit}>
              <div className="investor-head1">
                <div className="investor-head2">
                  <p className="investor-para">Investor Registration Form</p>
                </div>
              </div>

              <div className="investor-container">
                <label className="investor-label">Full Name :</label>
                <input type="text" className="investor-input" name="name" onChange={handelChange} /><br />

                <label className="investor-label">Organization :</label>
                <input type="text" className="investor-input" name="organization" onChange={handelChange} /><br />

                <label className="investor-label">Investment Focus :</label>
                <input type="text" className="investor-input" name="investmentFocus" onChange={handelChange} /><br />

                <label className="investor-label">Preferred Industries :</label>
                <input type="text" className="investor-input" name="preferredIndustries" onChange={handelChange} /><br />

                {/* Other Fields */}
                <label className="investor-label">Address :</label>
                <input type="text" className="investor-input" name="address" onChange={handelChange} /><br />

                <label className="investor-label">City :</label>
                <input type="text" className="investor-input" name="city" onChange={handelChange} /><br />

                <label className="investor-label">PinCode :</label>
                <input type="number" className="investor-input" name="pinCode" onChange={handelChange} /><br />
                {pinerror && <p className="invaliderror">{pinerror}</p>}

                <label className="investor-label">Contact Number :</label>
                <input type="number" className="investor-input" name="phone_number" onChange={handelChange} /><br />
                {phnerror && <p className="invaliderror">{phnerror}</p>}

                <label className="investor-label">Email Address :</label>
                <input type="email" className="investor-input" name="Email_ID" onChange={handelChange} /><br />

                <label className="investor-label">Password :</label>
                <input type="password" className="investor-input" name="password" onChange={handelChange} /><br />

                <ul className="password-checklist">
                  <li className={validations.lowercase ? "valid" : "invalid"}>At least one lowercase letter</li>
                  <li className={validations.uppercase ? "valid" : "invalid"}>At least one uppercase letter</li>
                  <li className={validations.digit ? "valid" : "invalid"}>At least one digit</li>
                  <li className={validations.specialChar ? "valid" : "invalid"}>At least one special character</li>
                  <li className={validations.length ? "valid" : "invalid"}>8-30 characters long</li>
                </ul>

                <button className="investor-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Investorsignupp