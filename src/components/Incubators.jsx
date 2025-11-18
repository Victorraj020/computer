// import Footer from './Dashboard comps/Footer';
import investorPic from '../assets/ayush_logo.jpg';
import LoadingPage from './LoadingPage';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './styles/IncubatorSignup.css';

const Incubators = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    contactNumber: "",
    location: "",
    sectorFocus: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordChecklist, setPasswordChecklist] = useState({
    minLength: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [bringTheLoadingPage, setBringTheLoadingPage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordChecklist({
        minLength: value.length >= 8,
        specialChar: /[!@#$%^&*]/.test(value),
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
      });
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    if (!Object.values(passwordChecklist).every(Boolean)) {
      setErrorMessage("Password does not meet the required criteria.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    setBringTheLoadingPage(true);
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
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
          <form onSubmit={handleSubmit} className="incubator-form">
          <label className="incubator-label" htmlFor="organizationName">
            Organization Name
          </label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <label className="incubator-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <label className="incubator-label" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <label className="incubator-label" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <label className="incubator-label" htmlFor="sectorFocus">
            Sector Focus
          </label>
          <select
            id="sectorFocus"
            name="sectorFocus"
            value={formData.sectorFocus}
            onChange={handleInputChange}
            className="incubator-select"
            required
          >
            <option value="">Select</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <label className="incubator-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <label className="incubator-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="incubator-input"
            required
          />

          <ul className="password-checklist">
            <li
              className={
                passwordChecklist.minLength ? "valid" : "invalid"
              }
            >
              At least 8 characters
            </li>
            <li
              className={
                passwordChecklist.specialChar ? "valid" : "invalid"
              }
            >
              Contains a special character (!@#$%^&*)
            </li>
            <li
              className={
                passwordChecklist.uppercase ? "valid" : "invalid"
              }
            >
              Contains an uppercase letter
            </li>
            <li
              className={
                passwordChecklist.lowercase ? "valid" : "invalid"
              }
            >
              Contains a lowercase letter
            </li>
            <li
              className={passwordChecklist.number ? "valid" : "invalid"}
            >
              Contains a number
            </li>
          </ul>

          {errorMessage && <div className="invalid-error">{errorMessage}</div>}

          <button type="submit" className="incubator-button">
            Register
          </button>
        </form>
          </div>
        </div>
      )}
</>

    
  );
};

export default Incubators;
