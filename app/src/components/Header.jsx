import React, { useState } from "react";
import {
  BsDoorOpen,
  BsSend,
  BsChevronBarLeft,
  BsChevronBarRight,
  BsList,
  BsArrowUpRightCircleFill,
  BsX,
} from "react-icons/bs";
import "../css/startpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useConfig } from '../ConfigContext';


function Header({ toggleSidebar, handleStartPage, isExpanded }) {
  const { userConfig, updateConfig, clearConfig } = useConfig();


  const navigate = useNavigate();


  const funcChangeBtn = () => {
    // const state = userConfig && userConfig.tgglbtn !== null ? userConfig.tgglbtn : false;


    // // console.log(state);

    // updateConfig(prevConfig => {
    //   const newConfig = { ...prevConfig };
    //   if ('tgglbtn' in newConfig) delete newConfig.tgglbtn;
    //   return {
    //     ...newConfig,
    //     tgglbtn: !state,
    //   };

    // });

  };
  const isActive = (route) => {
    return window.location.pathname === route;
  };




  const CancelBack = () => {
    const logoutBox = document.getElementById('logoutbox');
    // const overlay = document.getElementById("overlay");
    logoutBox.style.display = "none";
    // overlay.style.display = "none";
  }


  //fnc to logout
  const handleLogout = () => {
    // const overlay = document.getElementById("overlay");
    const logoutBox = document.getElementById('logoutbox');

    logoutBox.style.display = "flex";
    // overlay.style.display = "block";
  }

  const logoutAccount = async () => {
    // clearConfig();
    // alert('Logout successfully');
    navigate("/");


  }
  return (
    <div style={{ justifyContent: 'space-between' }} className="header">
      {userConfig.tgglbtn ? (
        <BsList id="hhbtn" className="Licons" onClick={funcChangeBtn} style={{ marginLeft: '314px', cursor: 'pointer', color: 'rgb(106 104 104)', }} />
      ) : (
        <BsChevronBarRight style={{ cursor: 'pointer', color: 'rgb(106 104 104)', marginLeft: '115px' }} id="hhbtn1" className="Licons" onClick={funcChangeBtn} />
      )}


      <div style={{ display: "flex", alignItems: "center" }}>

      </div>
      {/* //changes that can be removed------------------------------ */}




      <div className="headbtn">

        <div onClick={handleLogout} className="btnH head2">Logout
          <BsDoorOpen className="Licons" size={25} />

        </div>
        {/* {/* <BsFillEnvelopeFill className="icon" color="lightgreen" /> */}
        <div onClick={handleStartPage} className="btnH head2">Home
          <BsChevronBarRight className="Licons" size={22} />

        </div>



      </div>

      {/* //logoutBox  */}
      <div id="logoutbox" style={{ display: 'none' }}>
        <span className='m-e'>Are You sure you want to logout? </span>
        <div style={{ display: 'flex' }}>
          <button onClick={logoutAccount} className="Main_btn">
            <span className="text">Yes</span>
            <span className="svgIcon">
              <BsArrowUpRightCircleFill className='ac_icon' />
            </span>
          </button>
          <button onClick={CancelBack} className="Main_btn">
            <span className="text">No</span>
            <span className="svgIcon">
              <BsX className='ac_icon' />
            </span>
          </button>
        </div>


      </div>
    </div>
  );
}

export default Header;
