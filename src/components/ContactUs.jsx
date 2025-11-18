import React, { useState } from "react";
import "./styles/ContactUs.css";
import Header from "./Header";
import Footer from "./Dashboard comps/Footer";

const teamContacts = [
  { name: "Customer Support", role: "General Queries", email: "support@example.com" },
  { name: "Technical Assistance", role: "Tech Issues", email: "tech@example.com" },
  { name: "Partnerships", role: "Collaborations", email: "partners@example.com" },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    queryType: "General Inquiry",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ loading: false, success: true });
      setFormData({ name: "", email: "", phone: "", message: "", queryType: "General Inquiry" });
    }, 2000);
  };

  const handleSendEmail = (email) => {
    const subject = "Inquiry";
    const body = "Hello,\n\n[Your message here]";
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div>
      <Header />
      <div className="contact-us-container mt-32">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Reach out to the Ministry of AYUSH with your questions, feedback, or concerns.</p>
        </div>

        {/* Contact Information */}
        <div className="contact-information">
          <h2 className=" text-3xl">Our Office</h2>
          <p>Ministry of AYUSH</p>
          <p>AYUSH Bhawan, B-Block, GPO Complex, INA, New Delhi - 110023</p>
          <p>
            Email: <a href="mailto:info-ayush@nic.in">info-ayush@nic.in</a>
          </p>
          <p>
            Phone: <a href="tel:+911123456789">+91 11 2345 6789</a>
          </p>
        </div>

        {/* Google Map */}
        <div className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8390532219!2d77.06889742478004!3d28.527280343931267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3f6f80c2d75%3A0x84e91bb79c7aa6e3!2sMinistry%20of%20Ayush!5e0!3m2!1sen!2sin!4v1698888888888!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Ministry of AYUSH Location"
          ></iframe>
        </div>

        {/* Contact Cards */}
        <div className="">
          <div><h3>Direct Contacts</h3></div>
        <section className="contact-info ">
          {teamContacts.map((contact, idx) => (
            <div key={idx} className="contact-card max-w-[900px] mx-auto">
              <div>
                <h4>{contact.name}</h4>
                <p>{contact.role}</p>
              </div>
              <button onClick={() => handleSendEmail(contact.email)}>Email</button>
            </div>
          ))}
        </section>
        </div>

        {/* Contact Form */}
        <div className="form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>

            <div className=" flex w-full">
             <div className=" w-[50%] mr-2">
                 <label>Name:
                   <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name"/>
                 </label>
             </div>
             <div className=" w-[50%] ml-2">
                <label> Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email"/>
                </label>
             </div>
            </div>


            <div className=" flex w-full">
               <div className=" w-[50%] mr-2">
                 <label>Phone:<input  type="tel"  name="phone"  value={formData.phone}  onChange={handleChange}  required  placeholder="Enteryour phone number"/>
                 </label>
               </div>
               <div className=" w-[50%] ml-2">
                  <label>
                    Query Type:
                    <select name="queryType" value={formData.queryType} onChange={handleChange}>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Complaint">Complaint</option>
                    </select>
                  </label>
               </div>
            </div>

            <div>
               <label>
                 Message:
                 <textarea
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   required
                   placeholder="Enter your message"
                 ></textarea>
               </label>
            </div>

            <button type="submit" disabled={formStatus.loading}>
              {formStatus.loading ? "Sending..." : "Submit"}
            </button>
          </form>

          {formStatus.success === true && <p className="success-message">Thank you! Your message has been sent.</p>}
          {formStatus.success === false && <p className="error-message">Something went wrong. Please try again.</p>}
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
