import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import Logout from "./Logout"; // Import your Logout component here
import React, { useEffect, useState } from 'react';


// Subsidebar element 
import Home from "./components/Home";

import Profile from "./components/Profile";
import AutoResponder from "./components/AutoResponder";
import Chat from "./components/Chat";
import Send from "./components/Send";
import Api from "./components/Api";
import Bulk from "./components/Bulk";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Whatsapp from "./components/Whatsapp";
import StartPage from "./Home_Section/StartPage";
import Login from "./Home_Section/Login";
import SignIn from "./Home_Section/SignIn";
import SignUp from "./Home_Section/SignUp";
import PageNotFound from './Home_Section/PageNotFound';
import Agentlogin from './AgentSection/Agentlogin';
import AgentHome from "./AgentSection/AgentHome";
import AgentSend from "./AgentSection/AgentSend"
import AgentChat from "./AgentSection/AgentChat";
import AgentManager from "./components/AgentManager";
import Pricing from "./Home_Section/Pricing";
import F_Q from "./Home_Section/F_Q";
import Features from "./Home_Section/Features";
import Reports from "./components/Reports";



import { useConfig } from './ConfigContext';
// import AgentManager from "./components/AgentManager";
// const { setConfig } = useConfig();
function App() {


  const [LoginData, setLoginData] = useState(
    {
      "reqtype": "Login",
      email: 'Test@gmail.com',
      password: '1234',
    }
  );
  useEffect(() => {
  
    setConfig(LoginData);
  }, [])


  const { userConfig, setConfig ,updateConfig} = useConfig();

  const navigate = useNavigate();




  const handleStartPage = () => {
    navigate("/");
  };


  // const handleSignIn = () => {

  //   navigate("/SignIn");
  // };

  //animation 



  return (
    <div className="grid-container">

      {(window.location.pathname !== "/msg_portal" && window.location.pathname !== "/" && window.location.pathname !== "/msg_portal/" && window.location.pathname !== "/msg_portal/Login" && window.location.pathname !== "/msg_portal/SignUp" && window.location.pathname !== "/msg_portal/PageNotFound" && window.location.pathname !== "/msg_portal/Agentlogin" && window.location.pathname !== "/msg_portal/AgentHome"
        && window.location.pathname !== "/msg_portal/AgentSend" && window.location.pathname !== "/msg_portal/AgentChat" && window.location.pathname !== "/msg_portal/Pricing" && window.location.pathname !== "/msg_portal/Features" && window.location.pathname !== "/msg_portal/F_Q"
      ) && (
          <Header handleStartPage={handleStartPage} />
        )}
      {(window.location.pathname !== "/msg_portal" && window.location.pathname !== "/msg_portal/" && window.location.pathname !== "/msg_portal/Login" && window.location.pathname !== "/msg_portal/SignUp"
        && window.location.pathname !== "/Chat" && window.location.pathname !== "/"
        && window.location.pathname !== "/Autoresponder" && window.location.pathname !== "/Profile"
        && window.location.pathname !== "/msg_portal/PageNotFound" && window.location.pathname !== "/Agentlogin" && window.location.pathname !== "/AgentHome"
        && window.location.pathname !== "/AgentSend" && window.location.pathname !== "/AgentChat" && window.location.pathname !== "/msg_portal/Pricing" && window.location.pathname !== "/msg_portal/F_Q"
        && window.location.pathname !== "/msg_portal/Features") && (

          <Sidebar />
        )}
      <main className="main">
        <Routes>
          {/* <Route path="/msg_portal" element={<Home />} />
          <Route path="/Whatsapp" element={<Whatsapp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Autoresponder" element={<AutoResponder />} />
          <Route path="/Send" element={<Send />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Api" element={<Api />} /> */}


          {/* {userConfig && userConfig.email && (  */}

          <>
            {/* <Route path="/" element={<StartPage />} /> */}
            <Route path="/Whatsapp" element={<Whatsapp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Autoresponder" element={<AutoResponder />} />
            <Route path="/Send" element={<Send />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Api" element={<Api />} />
            <Route path="/Bulk" element={<Bulk />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/AgentManager" element={<AgentManager />} />
          </>
          {/* // )} */}

          {/* Not Found Route */}
          <Route path="/PageNotFound" element={<PageNotFound />} />

          {/* Redirect to Not Found if no config */}
          {userConfig && !userConfig.email && <Route path="*" element={<Navigate to="/PageNotFound" replace />} />}
          <Route path="/AgentHome" element={<AgentHome />} />
          <Route path="/AgentSend" element={<AgentSend />} />
          <Route path="/Agentlogin" element={<Agentlogin />} />
          <Route path="/AgentChat" element={<AgentChat />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/F_Q" element={<F_Q />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
