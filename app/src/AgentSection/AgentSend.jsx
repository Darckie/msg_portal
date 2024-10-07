
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useConfig } from '../ConfigContext';
import sampLogo from '../img/metaphor.svg';
import {
    BsWhatsapp,
    BsSearch,
    BsChatDotsFill,
    BsFillSendFill,
    BsSendFill,
    //new
    BsDoorOpen,
    BsBuildingFillAdd,
    BsArrowBarRight,
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";
import "../css/chatbot.css";

export default function AgentSend() {


    const navigator = useNavigate();


    const handleStartPage = () => {
        navigator('/StartPage')
    }
    // const [myValue, setMyValue] = useState('');

    // const handleChange = (event) => {
    //   // Update the state when the input value changes
    //   setMyValue(event.target.value);
    // };
    //recieved

    const { userConfig, setConfig } = useConfig();
    // const [receivedM, setreceivedM] = useState([]);



    //message and the contact name?

    const [number, setNumber] = useState();
    const [message, setMessage] = useState('hello from the server 0007');
    const [file, setFile] = useState(null);

    const containerID = userConfig.containerIdAgent;
    // const containerID = "container1"
    // console.log(containerID);

    const isActive = (route) => {
        return window.location.pathname === route;
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //api integration_____________________________

    //   console.log("total left count ", userConfig.usedcount)




    const sendMessage = () => {
        const usedcount = 15;
        // var usedcount = userConfig.usedcount;
        // console.log(usedcount);
        if (usedcount <= 15) {
            const formData = new FormData();
            formData.append('file', file); // Assuming file is defined elsewhere
            formData.append('message', message); // Assuming message is defined elsewhere
            formData.append('number', number); // Assuming number is defined elsewhere
            formData.append('agentId', userConfig.whatsappNumAgent);

            axios.post(
                'http://192.168.1.254:8999/router/webapp/cluster/api/sendMessage?_subHost=' + containerID + '&_port=8999&_path=',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
                .then(response => {
                    console.log('Response:', response.data);
                    updateCount();
                })
                .catch(error => {
                    alert("msg not sent")
                    console.error('Error sending message:', error);
                });

        } else {
            alert("Please recharge with new plan. Visit home and check the pricing section.")
        }

    };


    //upgrade count value each time when msg sent successfully ------------------------------------------------------------------

    const updateCount = async (num) => {
        // create detailsData object---------------
        const updateCount = {
            reqtype: 'updateCount',
            whatsappNumber: userConfig.whatsappNumAgent,
        

        }

        // console.log(userDetails);
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "test", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);

                    console.log("count updated ", result);
                }
            } catch (error) {
                console.log('Server Error ' + error);
            }
        };
        xhtps.send(JSON.stringify(updateCount));
        console.log("count updated");
    };


    //Logic to show recieved msg on the web------------------------

    return (
        <>
            <div style={{ justifyContent: 'space-between' }} className="header">


                <div >
                    <img className='LogoAgentPage' src={sampLogo} alt="" />
                </div>

                <div style={{ display: 'flex', width: '80%', justifyContent: 'flex-end' }}>
                    {/* //changes that can be removed------------------------------ */}
                    <div className="headbtn">
                        {/* {/* <BsFillEnvelopeFill className="icon" color="lightgreen" /> */}


                        <Link className="btnH" to="/AgentHome"> Dashboard
                            <BsBuildingFillAdd className="Licons" style={{ cursor: 'pointer' }} size={20} color="4b4e5f" />  </Link>
                    </div>

                    <div className="headbtn">
                        {/* {/* <BsFillEnvelopeFill className="icon" color="lightgreen" /> */}
                        <Link to='/StartPage' onClick={handleStartPage} className="btnH">Home
                            <BsDoorOpen className="icon" size={22} color="#4b4e5f" />
                        </Link>


                        <Link to='/Agentlogin' className="btnH"> Logout
                            <BsArrowBarRight className="Licons" style={{ cursor: 'pointer' }} size={23} color="#4b4e5f" />
                        </Link>




                    </div>
                </div>
            </div >

            <div className="whatsapp" >
                <div className="list">
                    <div className="searchbar">
                        <BsSearch className="icon" color="gray" />
                        <input id="search" type="text" />
                    </div>
                    {/* <div className="add">
        <h2 className="Rep card-title" >Report</h2>
        <button className="fs-14 text-success"> <BsPlus className="Licons" /> Add Account</button>
    </div> */}
                    <div className="features">
                        <h3>FEATURES</h3 >
                        <li >
                            <li>
                                <Link className={isActive("/AgentSend") ? "active" : ""} to="/AgentSend">
                                    <BsWhatsapp
                                        className="Licons"
                                    /> <div className="libox">Send
                                        <span className="span-text ">Send Custom & Pre-written message  </span>
                                    </div>
                                </Link>
                            </li>


                            <li>
                                <Link className={isActive("/AgentChat") ? "active" : ""} to="/AgentChat">
                                    <BsChatDotsFill
                                        className="Licons"
                                    /> <div className="libox">Chat participants
                                        <span className="span-text ">User List </span>
                                    </div>
                                </Link>
                            </li>
                        </li>

                    </div>
                </div>

                <div className="home" color='white'>
                    <div style={{ margin: '35px -48px' }} className="container" >
                        <h2 style={{ color: '#4c4c4c', marginBottom: '4px' }}><BsFillSendFill MessageDotsFill color='#0f74bfc7' /> Send Messages</h2>
                        <span style={{ color: 'gray', paddingLeft: '28px', fontSize: '13px', fontFamily: 'system-ui' }} className='.fs-16 fw-6'>Send Custom & Pre-written message  </span>
                        <hr style={{ width: '80%', marginLeft: '-8px' }} />
                        <div style={{ width: '240px', margin: '17px', color: 'white' }} className='box'>
                            <label className='fs-14 text-success' htmlFor="exampleInputPassword1">Sender</label>
                            <input value={userConfig.whatsappNumAgent} type="number" className="searchbar" id="number" />
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

                        <button style={{ marginTop: '40px' }} id="sendBtn" onClick={sendMessage} className="Main_btn">
                            <span class="text">Send</span>
                            <span class="svgIcon">
                                <BsSendFill className='ac_icon' />
                            </span>
                        </button>

                    </div>
                </div>



            </div>
        </>
    )



};