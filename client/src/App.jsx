import React, { Fragment } from 'react';


import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom";
import DashBoardPage from './pages/DashBoardPage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NewPage from './pages/NewPage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';
import CompletedPage from './pages/CompletedPage.jsx';
import CanceledPage from './pages/CanceledPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import ForgetPassPage from './pages/ForgetPassPage.jsx';
import Page404 from './pages/Page404.jsx';
import FullscreenLoader from './components/masterLayout/FullScreenLoader.jsx';
import { getToken } from './helper/SessionHelper.js';
import SendOTPPage from './pages/AccountRecover/SendOTPPage.jsx';
import VerifyOTPPage from './pages/AccountRecover/VerifyOTPPage.jsx';
import CreatePasswordPage from './pages/AccountRecover/CreatePasswordPage.jsx';
const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
        <Routes>
          <Route exact path ="/" element={<DashBoardPage/>}/> 
          <Route exact path ="/create" element={<CreatePage/>}/>
          <Route exact path ="/New" element={<NewPage/>}/>
          <Route exact path ="/Progress" element={<ProgressPage/>}/>
          <Route exact path ="/Completed" element={<CompletedPage/>}/>
          <Route exact path ="/Canceled" element={<CanceledPage/>}/>
          <Route exact path ="/profile" element={<ProfilePage/>}/>
          
          <Route exact path ="*" element={<Page404/>}/>
        </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
      </Fragment>
  )} else {
    return (
      <Fragment>
        <BrowserRouter>
        <Routes>
          <Route path='/'element={<Navigate to = "/login" replace/> }/>
          <Route exact path ="/login" element={<LoginPage/>}/>
          <Route exact path ="/registration" element={<RegistrationPage/>}/>
          <Route exact path ="/forgetPass" element={<ForgetPassPage/>}/>
          <Route exact path ="*" element={<Page404/>}/>
          <Route exact path ="/sendOTP" element={<SendOTPPage/>}/>
          <Route exact path ="/verifyOTP" element={<VerifyOTPPage/>}/>
          <Route exact path ="/createPassword" element={<CreatePasswordPage/>}/>
        </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
      </Fragment>
  )
    
  }
  
  
};

export default App;