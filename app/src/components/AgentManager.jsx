import React, { useState, useEffect } from 'react';
import "../css/sign_up.css";
import "../css/agentmanager.css";
import { useConfig } from '../ConfigContext';
import { BsArrowBarRight, BsEyeFill, BsFillPersonCheckFill, BsPeople, BsPeopleFill, BsPersonAdd, BsPersonArmsUp, BsPersonCheck, BsPersonCheckFill, BsPersonDashFill, BsPersonFillAdd, BsPersonFillCheck, BsPlusCircleDotted } from 'react-icons/bs';
export default function AgentManager() {
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const { userConfig, setConfig } = useConfig();
    const [agentListOn, setAgentOn] = useState(false);
    const [options, setOptions] = useState([]);
    const [agentList, setAgentList] = useState([]);
    let agentListChecker;

    const [formData, setFormData] = useState(
        {
            "reqtype": "assignAgent",
            Agentname: '',
            agentwhatsapp: '',
            email: userConfig.email,
            password: '',
        }
    );



    const showAgentList = () => {
        fetchAgentsAccount();
        setAgentOn(false);

    }
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setError('');

    };

    const addAgentfunc = () => {

        fetchagentNumbers();
        setAgentOn(true);

    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    //fetch number list connected to this email



    const fetchagentNumbers = async () => {
        var data_G = {
            "reqtype": "getnumberList",
            agentId: userConfig.email,
            // whatsappnumber:userConfig.whatsappnumber
            //send number 
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "test", true);

        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    setOptions(result.numbers);


                    console.log(options);
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
        fetchAgentsAccount()
    }, [0])


    //show accounts 
    const fetchAgentsAccount = async () => {
        var data_Ar = {
            "reqtype": "getagentsList",
            email: userConfig.email,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "test", true);
        // xhtps.open("POST", " http://localhost:8080/whatsupapi/access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText).agents;
                    setAgentList(result);



                };
            } catch (error) {
                console.log('Error parsing response:', error);
            }
        };
        xhtps.send(JSON.stringify(data_Ar));
    };

    //save data to the database-------------------------------------
    console.log(agentListChecker);
    const sendUsersData = async () => {
        const isWhatsappPresent = agentList.some(agent => agent.agentWhatsapp === formData.agentwhatsapp);


        console.log(isWhatsappPresent);
        if (!isWhatsappPresent) {
            setConfig(formData);
            console.log(formData);
            const xhtps = new XMLHttpRequest();
            xhtps.open("POST", "test", true);
            xhtps.onload = async function () {
                try {
                    if (xhtps.status === 200) {
                        const result = JSON.parse(xhtps.responseText); // Parse the entire response
                        console.log(result);
                        setTimeout(() => {
                            alert('A new agent has been assigned.');
                        }, 1000);
                    } else {
                        setError('Network Error');
                    }
                } catch (error) {
                    setError('Server Error');
                }
            };
            xhtps.send(JSON.stringify(formData));
        } else {
            alert("This whatsapp number is already assigned")
        }
    };
    // sendUsersData();
    //



    return (
        < div className="container">
            <h2 className="mb-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', color: '#433e3ef0' }}>
                <span className="me-2" style={{ padding: '3px' }} ><BsPersonCheckFill style={{ color: 'voilet', paddingRight: '10px' }} className="Licons" />Agent Manager</span>
                <span style={{ paddingLeft: '42px', color: 'gray', fontFamily: 'system-ui', fontSize: '13.5px' }} className="fs-16 fw-6 .text-gray-600 ">Add New Agent Here</span>
            </h2>
            <hr style={{ width: '70%', marginLeft: '-10px', marginTop: '-13px' }} />
            <div id="agcontainer" style={{ width: '78%' }}
            >

                <hr />
                <div className="btnContainer headbtn">
                    <button onClick={showAgentList} className="btnH">
                        <span >Agent List</span>
                        <BsPeopleFill style={{ marginTop: '4px' }} className='Licons' />
                    </button>
                    <button onClick={addAgentfunc} className="btnH">
                        <span > Add Agent</span>
                        <BsPersonFillAdd className='Licons' />
                    </button>

                </div>

                {agentListOn ? (<div className="form">
                    <div className="flex">
                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder=""
                                name="Agentname"
                                value={formData.Agentname}
                                onChange={handleChange}
                                required
                            />
                            <span>Agent Name</span>
                        </label>
                        <label>
                            <input

                                className="input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder=""
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span>Set Password<BsEyeFill className={`eye-icon eye ${showPassword ? 'open' : 'closed'}`} onClick={togglePasswordVisibility} /></span>
                        </label>
                    </div>
                    <div className="flex">
                        <label className="input-label">
                            <select
                                id="selectInput"
                                className="input"
                                name="agentwhatsapp"
                                value={formData.agentwhatsapp}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}



                            </select>
                            <span className="input-span">Assign WhatsApp</span>
                        </label>

                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder=""
                                name="email"
                                value={userConfig.email}
                                onChange={handleChange}
                                required
                            />
                            <span>Linked email</span>
                        </label>

                    </div>
                    <button onClick={sendUsersData} className="Main_btn">
                        <span className="text">Add</span>
                        <span className="svgIcon">
                            <BsPlusCircleDotted className='Licons' />
                        </span>
                    </button>
                </div>

                )
                    :
                    (
                        <div className="agentList">
                            <h3 className='ag-h3'>All Associated Agents</h3>

                            <div className="Agentboxes">
                                {agentList.map((agent, index) => {
                                    return (
                                        <section className="containerBox" key={index}>
                                            <div className="card">
                                                <p className='indexag'>Agent- {index + 1}</p>
                                                <div className="content">
                                                    <p className="logoAg">{agent.agentName}</p>
                                                    <div className="hover_content">
                                                        <p className='agentnum1'>Agent Whatsapp number <br /> <span className='agentnum2'>{agent.agentWhatsapp}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    );
                                })}


                            </div>
                        </div>

                    )}

            </div >
        </div>
    )
}
