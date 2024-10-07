import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import userX from "../img/userX.jpg";
import {
  BsWhatsapp,
  BsSearch,
  BsPlus,
  BsPersonFill,
  BsRobot,
  BsReplyAllFill,
  BsPersonBoundingBox,
  BsCloudHaze2Fill,
  BsFileEarmarkPptFill,
  BsBoxArrowDownRight,
  BsChevronDown,
  BsFileEarmark,
  BsChatDotsFill

} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";
import Select from 'react-select';




export default function Profile() {




  const navigate = useNavigate();

  const isActive = (route) => {
    return window.location.pathname === route;
  };

  const handleLinkClick = (event, route) => {
    event.preventDefault();
    navigate(route);
  }

  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const options = ['Account A', 'Account B'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };



  return (
    <div className="whatsapp" >
      <div className="list">
        <div className="searchbar">
          <BsSearch className="icon" color="gray" />
          <input id="search" type="text" />
        </div>
        <div className="add">
          <h2 className="Rep card-title" >Report</h2>
          <button className="fs-14 text-success"> <BsPlus className="Licons" /> Add Account</button>
        </div>
        <div className="features">
          <h3>FEATURES</h3 >
          <li >
            <li>
              <Link className={isActive("/Send") ? "active" : ""} to="/Send">
                <BsWhatsapp
                  className="Licons"
                /> <div className="libox">Send
                  <span className="span-text ">Send Custom & Pre-written message  </span>
                </div>
              </Link>
            </li>
            <Link className={isActive("/Whatsapp") ? "active" : ""} to="/Whatsapp">
              <BsFileEarmark
                className="Licons"
              /> <div className="libox">
                Report
                <span className="span-text ">Customize system interface </span>
              </div>
            </Link>
          </li>
          <li>
            <Link className={isActive("/Profile") ? "active" : ""} to="/Profile">
              <BsPersonFill
                className="Licons"
              />
              <div className="libox">Profile
                <span className="span-text ">Information WhatsApp account </span>
              </div>
            </Link>
          </li>

          <li>
            <Link className={isActive("/Autoresponder") ? "active" : ""} to="/Autoresponder">
              <BsReplyAllFill
                className="Licons"
              /> <div className="libox">AutoResponder
                <span className="span-text ">Send a Pre-written message </span>
              </div>
            </Link>
          </li>

          <li>
            <Link className={isActive("/Chat") ? "active" : ""} to="/Chat">
              <BsChatDotsFill
                className="Licons"
              /> <div className="libox">Chat participants
                <span className="span-text ">User List </span>
              </div>
            </Link>
          </li>

          <li>
            <Link className={isActive("/Api") ? "active" : ""} to="/Api">
              <BsCloudHaze2Fill
                className="Licons"
              /> <div className="libox">Api
                <span className="span-text ">WhatsApp-Meta Api  </span>
              </div>
            </Link>
          </li>
        </div>
      </div>

      {/* //home container------------------- */}
      <div className="home" >
        <div id="contianerUser" className="container px-4 py-4" style={{ width: '50%', textAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}  >
          <h2 className="mb-5" style={{ display: 'flex', flexDirection: 'column', float: 'right' }}>
            <span className="me-2" style={{ padding: '3px' }} ><BsPersonBoundingBox style={{ color: '#25d366', paddingRight: '10px' }} className="Licons" />Profile</span>
            <span style={{ paddingLeft: '6px', color: 'gray' }} className="fs-16 fw-6 .text-gray-600 ">Information about whatsapp account</span>
          </h2>

          <div className="selectA">
            <div className="custom-dropdown">
              <div className="selected-option" onClick={() => setShowOptions(!showOptions)}>
                {selectedOption || 'Select Whatsapp account'}
              </div>
              {showOptions && (
                <ul className="options">
                  {options.map((option, index) => (
                    <li key={index} onClick={() => handleSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span><BsChevronDown /></span>
          </div>

          <div className="userDetails" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <img src={userX} alt="img" />
              <p>user name? </p>
              <details> contact & address</details>
            </div >
            <button className="btnU"><BsBoxArrowDownRight />  Logout</button>

          </div>


        </div>


      </div>
    </div>)
}
