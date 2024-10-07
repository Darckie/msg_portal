import React, { useState } from 'react';
import { Link, } from "react-router-dom";
import {
  BsWhatsapp,
  BsSearch,
  BsPlus,
  BsPersonFill,
  BsRobot,
  BsReplyAllFill,
  BsCloudHaze2Fill,
  BsFileEarmarkPptFill,
  BsChevronCompactDown,
  BsSaveFill,
  BsChatDotsFill,
  BsClipboardDataFill,
  BsFileEarmark
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";






export default function AutoResponder() {



  //editor logic here----------------------------



  const [editorValue, setEditorValue] = useState('');
  const saveContent = () => {
    console.log('Content saved:', editorValue);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(editorValue).then(() => {
      console.log('Content copied to clipboard');
    });
  };



  const default_editor_value = 'hello form the other side !!!';



  //checkbox logic
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };




  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const options = ['Account A', 'Account B'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };


  const isActive = (route) => {
    return window.location.pathname === route;
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

      <div className="home" >
        <div id="contianerUser" className="container px-4 py-4" style={{ width: '60%', textAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}  >
          <h2 className="mb-5" style={{ display: 'flex', flexDirection: 'column', float: 'right' }}>
            <span className="me-2" style={{ padding: '3px' }} ><BsReplyAllFill style={{ color: '#25d366', paddingRight: '10px' }} className="Licons" />Autoresponder</span>
            <span style={{ paddingLeft: '6px', color: 'gray' }} className="fs-16 fw-6 .text-gray-600 ">Send a pre-written message</span>
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
            <span><BsChevronCompactDown /></span>
          </div>


          <div className="subContainer">
            <h3 className='card-title' >Set autoresponder for all account </h3>
            <hr className='hr' />
            <h3 className='As-title' >Status </h3>
            <div className="stateA">
              <input type="checkbox" id="enable" />
              <label >Enable</label>
              <input type="checkbox" id="disable" onChange={handleCheckboxChange} checked={isChecked} />
              <label >Disable</label>
            </div>
            {/* //second */}
            <h3 className='As-title' >sent to </h3>


            <div className="stateA">
              <input type="checkbox" id="all" />
              <label >All</label>
              <input type="checkbox" id="individual" onChange={handleCheckboxChange} checked={isChecked} />
              <label >Individual</label>
              <input type="checkbox" id="group" />
              <label >Group</label>


            </div>
            <div className="btnAll">
              <button className="btnU" >Text & Media</button>
              <button className='btnU' >Buttons</button>
              <button className='btnU' >List messages</button>
            </div>


          </div>
          <h3 className='As-title' >Media File</h3>
          <div className="mediaA">  <input type="file" id="mediaFile" name="mediaFile" />  <button className='btnU' onClick={saveContent}> <BsSaveFill className='Licons' />   Save</button></div>


          <h3 className='As-title' >Caption</h3>
          <div className="editor" >

            <div className="edi" style={{ width: '100%', borderRadius: '6px' }}>
              <textarea
                placeholder='write caption'
                className='textarea'
                style={{ height: '100px', width: '97%', outline: 'none' }}
                defaultValue={default_editor_value}
              />
              <div className="btnAll">
                <button className='btnU' onClick={saveContent}> <BsSaveFill className='Licons' />   Save</button>
                <button className='btnU' onClick={copyContent}> <BsClipboardDataFill className='Licons' />Copy</button>
              </div>
            </div>



          </div>



        </div>

        {/* third */}

















      </div>
    </div >
  );
}
