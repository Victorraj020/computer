import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from "./components/Login.jsx";
import Doctorsignup from './components/Doctorsignup.jsx';
import Home from './components/Home.jsx';
import Startupsignup from './components/Startupsignup.jsx';
import Farmersignup from './components/Farmersignup.jsx';
import Hometwo from './components/Hometwo.jsx';
import Startupdashboard from './components/Dashboard comps/Startupdashboard.jsx';
import Authoritydash from './components/Dashboard comps/Authoritydash.jsx';
import Doctordash from './components/Dashboard comps/Doctordash.jsx';
import Farmerdash from './components/Dashboard comps/Farmerdash.jsx';
import AiChatBot from './components/AiChatBot.jsx';
import Authoritysignup from './components/Authoritysignup.jsx';
import Druginsignup from './components/Druginsignup.jsx';
import Drugindash from './components/Dashboard comps/Drugindash.jsx';
import LoginRegister from './components/LoginRegister.jsx';
import Investorsignupp from './components/Investorsignupp.jsx';
import Incubators from './components/Incubators.jsx';
import Dashboard from './components/Dashboard.jsx';
import Blogs from './components/Blogs.jsx';
import ContactUs from './components/ContactUs.jsx';
import Logincards from './components/logincards.jsx';
import FakeLogin from './components/FakeLogin.jsx';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          {/* Root shows original Home page again */}
          <Route path='/' element={<Home/>} />
          {/* Keep fake login available on a separate route for testing */}
          <Route path='/fake-login' element={<FakeLogin />} />
          <Route path='/hometwo' element={<Hometwo/>}/>
          <Route path='/login-register' element={<LoginRegister/>}/>
          <Route path='/login-cards-ayush' element={<Logincards/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Blogs' element={<Blogs/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/signupstartup' element={<Startupsignup/>}/>
          <Route path='/signupinvestor' element={<Investorsignupp/>}/>
          <Route path='/signupincubator' element={<Incubators/>}/>
          <Route path='/signupauthority' element={<Authoritysignup/>}/>
          <Route path='/signupdrug' element={<Druginsignup/>}/>
          <Route path='/signupdoctor' element={<Doctorsignup/>}/>
          <Route path='/signupfarmer' element={<Farmersignup/>}/>
          <Route path='/startupdash' element={<Startupdashboard/>}/>
          <Route path='/authoritydash' element={<Authoritydash/>}/>
          <Route path='/druginspectordash' element={<Drugindash/>}/>
          <Route path='/doctordash' element={<Doctordash/>}/>
          <Route path='/farmerdash' element={<Farmerdash/>}/>
          <Route path='/chatbot' element={<AiChatBot/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
