import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useConfig } from '../ConfigContext';
import {
  BsWhatsapp,
  BsSearch,
  BsPlus,
  BsPersonFill,
  BsReplyAllFill,
  BsCloudHaze2Fill,
  BsChevronCompactDown,
  BsFileEarmark,
  BsChatDotsFill,
  BsMessenger,

} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";
// import 'react-quill/dist/quill.snow.css';




export default function Chat() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([7830372716]);
  const [error, setError] = useState(null);

  const { userConfig, setConfig } = useConfig();

  const [messages, setMessages] = useState([]);

  //functionality to get numbers form the backend

  const fetchNumbers = async () => {
    var data_G = {
      "reqtype": "numberList",
      agentId: userConfig.whatsappNum,
      // whatsappnumber:userConfig.whatsappnumber
      //send number 
    };
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);

    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText); // Parse the entire response
          setOptions(result.numbers);
        } else {
          setError('No Number found');
        }
      } catch (error) {
        setError('Error parsing response');
      }
    };
    xhtps.send(JSON.stringify(data_G));
  };
  useEffect(() => {
    fetchNumbers();
  }, [])


  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    return option;
  };


  const fetchMsg = async () => {
    const selected_number = selectedOption;

    if (selectedOption) {
      setError('');
      var message_request = {
        reqtype: "UiMessages",
        number: selected_number,
        agentId: userConfig.whatsappNum,
      };


      const xhtps = new XMLHttpRequest();
      xhtps.open("POST", "access", true);
      // xhtps.setRequestHeader("Content-Type", "application/json");

      xhtps.onload = function () {
        try {
          if (xhtps.status === 200) {
            const result = JSON.parse(xhtps.responseText);
            // console.log(result.messages);
            const showmsg = result.messages.map(message => ({
              msg: message.msg,
              msg_type: message.msg_type,
              time: message.time_m || "1:23",
            }))
            setMessages(showmsg);

            // setTimeout(fetchMsg(), 3000);
          } else {
            setError('No data found. Status: ' + xhtps.status);
          }
        } catch (error) {
          setError('Error parsing response: ' + error.message);
        }
      };

      xhtps.onerror = function () {
        setError('Network error occurred');
      };

      xhtps.send(JSON.stringify(message_request));
    } else {
      setError("please select appropriate number")
    }
  };



  const isActive = (route) => {
    return window.location.pathname === route;
  };




  const formatTime = (time) => {
    // Format the time as needed, or use a default value if null
    return time ? time : "1:15";
  };



  //change class name on the basis of type
  function isRecvOrisSent(msgType) {
    if (msgType === 'recv') {
      return 'recv';
    } else if (msgType === 'sent') {
      return 'sent';
    } else {
      return 'msg-box';
    }
  }


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
              /> <div className="libox">Agent chats with customers
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
            <span className="me-2" style={{ padding: '3px' }} ><BsChatDotsFill style={{ color: '#25d366', paddingRight: '10px' }} className="Licons" />Chat</span>
            <span style={{ paddingLeft: '6px', color: 'gray' }} className="fs-16 fw-6 .text-gray-600 ">Agent chats with customers</span>
          </h2>
          <div style={{ display: 'flex', }}>
            <div className="selectA">
              <div className="custom-dropdown">
                <div className="selected-option" onClick={() => setShowOptions(!showOptions)}>
                  {selectedOption || 'Select Users Whatsapp Number'}
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
            <div className="error"> {error && <span>Error: {error}</span>}</div>
          </div>


          <div className='Rcvcontainer'>
            <h3 style={{ margin: '35px 15px' }}>Latest Received Messages...</h3>

            <button onClick={fetchMsg} className="Main_btn">
              <span class="text">Show msgs</span>
              <span class="svgIcon">
                <BsMessenger className='ac_icon' />
              </span>
            </button>

            <div className='msgbackground'>
              <ul className='rcvcontainer'>
                {messages.map((message, index) => (
                  <li key={index}>
                    <p className={isRecvOrisSent(message.msg_type)}>{message.msg}<span className='time_m'> {message.time} </span> </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>


        </div>



















      </div>
    </div >
  );
}
