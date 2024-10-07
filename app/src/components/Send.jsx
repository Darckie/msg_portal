import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useConfig } from '../ConfigContext';
import {
  BsSearch,
  BsPersonFill,
  BsFillSendFill,
  BsCheck2Circle,
  BsSendFill
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";
import "../css/chatbot.css";

export default function Send() {

  const { userConfig, updateConfig, setConfig } = useConfig();

  // const [myValue, setMyValue] = useState('');

  // const handleChange = (event) => {
  //   // Update the state when the input value changes
  //   setMyValue(event.target.value);
  // };
  //recieved
  // const [receivedM, setreceivedM] = useState([]);

  //message and the contact name?

  const [number, setNumber] = useState();
  const [message, setMessage] = useState('hello !');
  const [file, setFile] = useState(null);
  const [countBalance, setcountBalanceOnSend] = useState();
  const [agentCid, setagentCid] = useState();
  const [agentNumber, setagentNum] = useState()
  const [accountsList, setAccountList] = useState([]);
  const [hidebtn, setHidebtn] = useState(true);
  const Hreq = process.env.REACT_APP_Hreq;
  const container_ip = process.env.REACT_APP_container_ip;
  const container_port = process.env.REACT_APP_container_port;
  const agent_user = " ";

  // console.log(containerID);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //api integration_____________________________

  // console.log("total left count ", userConfig.usedcount)
  //fetch count ----------------------------------------

  const fetchconts = async () => {
    var data_C = {
      "reqtype": "getCounts",
      whatsappNum: agentNumber,
    };
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);
    // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);
    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText).counts;
          const used = result[0].usedBalance;
          const total = result[0].countBalance;
          setcountBalanceOnSend(used, total);
          sendMessage(used, total);
        } else {
          console.log('No Number found');
        }
      } catch (error) {
        console.log('Error parsing response');
      }
    };
    xhtps.send(JSON.stringify(data_C));
  };


  //SEND LOGIC --------------------------------------------------

  const sendMessage = async (usedBal, total) => {


    if (number.length === 10) {
      if (usedBal < total) {
        setHidebtn(false);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('message', message);
        formData.append('number', number);
        formData.append('agentId', agentNumber);
        formData.append('agent_user', agent_user);

        axios.post(
          `${Hreq}://${container_ip}:${container_port}/router/webapp/cluster/api/sendMessage?_subHost=` + agentCid + '&_port=' + container_port + '&_path=',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
          .then(response => {
            // updateCount();

            setTimeout(() => {
              alert(response.data + "check reports for more details");
              // Clear input fields
              document.getElementById('number').value = '';
              var fileInputT = document.getElementById('file');
              fileInputT.value = '';
              document.getElementById('msg').value = '';
              setHidebtn(true);

            }, 1000);


          })
          .catch(error => {
            alert("msg not sent")
            setHidebtn(true);
            console.error('Error sending message:', error);
          });


      } else {
        alert("Please recharge with new plan. Visit home and check the pricing section.")

      }
    } else {
      alert("The number length should be at least 10.");
    }

  };

  //upgrade count value each time when msg sent successfully ------------------------------------------------------------------

  const updateCount = async (num) => {
    // create detailsData object---------------
    const updateCount = {
      reqtype: 'updateCount',
      whatsappNumber: agentNumber,
      // containerId: userConfig.container_Id
    }
    // console.log("inside the update count", agentNumber);

    // console.log(userDetails);
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);
    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText);
        }
      } catch (error) {
        console.log('Server Error ' + error);
      }
    };
    xhtps.send(JSON.stringify(updateCount));

  };




  //fetch number and container Id
  const fetchDetails = (cId, number) => {

    if (cId) {
      //Logic to set active List-----------------------

      updateConfig(prevConfig => {
        const newConfig = { ...prevConfig };
        if ('ActiveSendNumber' in newConfig) delete newConfig.ActiveSendNumber;
        return {
          ...newConfig,
          ActiveSendNumber: number
        };
      });
      // console.log(userConfig.ActiveApi)

      setagentCid(cId);
      setagentNum(number);
    }
    else {
      // setApiLink1(null);
    }


    // setApiLink2(recv_api2);

    // if (item) {
    //   updateConfig(prevConfig => {
    //     const newConfig = { ...prevConfig };

    //     if ('ActiveInitiativeNum' in newConfig) delete newConfig.ActiveInitiativeNum;
    //     return {
    //       ...newConfig,
    //       ActiveInitiativeNum: item
    //     };
    //   });
    // }
  }
  //Logic to show List on the page------------------------

  const fetchHasAccount = async () => {
    var data_Ar = {
      "reqtype": "getRegisterDetails",
      email: userConfig.email,
    };
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);
    // xhtps.open("POST", " http://localhost:8080/whatsupapi/access", true);
    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText).details;
          const accountList = [];
          result.forEach(detail => {
            accountList.push({
              name: detail.Aname,
              number: detail.whatsappNum,
              cId: detail.containerId
            });

          });
          setAccountList(accountList);
        }
      } catch (error) {
        console.log('Error parsing response:', error);
      }
    };
    xhtps.send(JSON.stringify(data_Ar));
  };



  useEffect(() => {
    fetchHasAccount();
  }, []);



  return (
    <div className="whatsapp" >
      {/* <div className="list">
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
      </div> */}
      <div className="list">
        <h3 className='select-I'><BsCheck2Circle className='Licons' /> {agentNumber || 'Select Initiative'} </h3>
        <div className="searchbar">
          <BsSearch color="gray" style={{ height: '16px', width: '16px', marginLeft: '7px' }} />
          <input id="search" type="text" />
        </div>

        <div className="title-I" >Select Initiative</div>

        <div className="features">

          {accountsList.map((item, index) => (
            <li className='listI' key={index}>
              <Link className={agentNumber === item.number ? "active" : ""} onClick={() => fetchDetails(item.cId, item.number)}>
                <BsPersonFill style={agentNumber === item.number ? { color: 'rgb(42, 189, 42)' } : ""} className="Licons" />
                <div className="libox">
                  {item.name}
                  <span className="span-text">{item.number}</span>
                </div>
              </Link>
            </li>
          ))}


        </div>
      </div>
      <div style={{ paddingBottom: '80px' }} className="home" color='white'>
        <div className="containerSend" >
          <h2 style={{ color: '#4c4c4c', marginBottom: '4px' }}><BsFillSendFill MessageDotsFill color='#0f74bfc7' /> Send Messages</h2>
          <span style={{ color: 'gray', paddingLeft: '28px', fontSize: '13px', fontFamily: 'system-ui' }} className='.fs-16 fw-6'>Send Custom & Pre-written message  </span>
          <hr style={{ width: '80%', marginLeft: '-8px' }} />

          <div style={{ width: '240px', margin: '17px', color: 'white' }} className='box'>
            <label className='fs-14 text-success' htmlFor="exampleInputPassword1">Sender</label>
            <input value={agentNumber} type="number" className="searchbar" id="numberA" />
          </div>

          <div style={{ display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <div style={{ width: '240px', margin: '17px', color: 'white' }} className='box'>
              <label className='fs-14 text-success' htmlFor="exampleInputPassword1">Customer Name.</label>
              <input
                value={contactName} onChange={(e) => setContactName(e.target.value)} type="text" className="searchbar" id="customer_name" />
            </div>
          <span>or</span> */}
            <div style={{ width: '240px', margin: '17px', color: 'white' }} className='box'>
              <label className='fs-14 text-success' htmlFor="exampleInputPassword1">Mobile No.</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" className="searchbar" id="number" />
            </div>
          </div>



          {/* <div style={{ width: '240px', margin: '17px', color: 'white' }} className='box'>
            <label className='fs-14 text-success' htmlFor="exampleFormControlSelect1">Select Template</label>
            <select className="searchbar" id="get_t" onChange={selectTemplate}>
            </select>
          </div> */}


          <div style={{ margin: '17px', color: 'white' }} className='box'>
            <label className='fs-14 text-success' htmlFor="exampleFormControlTextarea1">Content</label>
            <textarea value={message}
              onChange={(e) => setMessage(e.target.value)} style={{ alignItems: 'right', width: '50%', borderRadius: '2px', height: '100px' }} className="searchbar" id="msg" rows="3"></textarea>
          </div>


          <div className='box fileSection'>
            <label className='fs-14 text-success'>File</label>
            <input type="file" onChange={handleFileChange} className="searchbar" id="file" />
          </div>

          {hidebtn ? (<button style={{ marginTop: '40px' }} id="sendBtn" onClick={fetchconts} className="Main_btn">
            <span class="text">Send</span>
            <span class="svgIcon">
              <BsSendFill className='ac_icon' />
            </span>
          </button>) :

            <div id="masterSent">
              <p>Sending ...</p>
              <div className="spinner"></div>
            </div>
          }

        </div>
      </div>



    </div>

  )



};