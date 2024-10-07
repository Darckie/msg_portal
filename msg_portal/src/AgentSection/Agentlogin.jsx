import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sampLogo from '../img/metaphor.svg';
import '../css/logout.css';
import '../css/list.css';
import { BsArrowBarRight, BsEyeFill, BsPerson, BsPersonFill } from 'react-icons/bs';
import { useConfig } from '../ConfigContext';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const { setConfig ,userConfig} = useConfig();
    const [isTesting, setIsTesting] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // simulate Log in functionality???????????????????????????
    const [LoginData, setLoginData] = useState(
        {
            "reqtype": "AgentLogin",
            agentName: '',
            password: '',
        }
    );
    const handleChange = (e) => {
        setLoginData({ ...LoginData, [e.target.name]: e.target.value });
    };

    const handleLogIn = async () => {
        setIsTesting(true);
        setTimeout(() => {
            setIsTesting(false);
        }, 5000);
        // navigate('/AgentSend');
        sendAgentData();
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // simulate sign in functionality???????????????????????????

    //check wheather login id or password is correct-----------------------------------------------
    const sendAgentData = async () => {

        console.log(LoginData);
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "test", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText); // Parse the entire response

                    if (result.response === "success") {
                        const containerId = result.containerId;
                        const Mainemail = result.email;
                        const whatsappNum = result.agent_whatsapp
                        console.log(Mainemail,whatsappNum);
                        setConfig({
                            agentName: LoginData.agentName,
                            containerIdAgent: containerId,
                            Mainemail: Mainemail,
                            whatsappNumAgent: whatsappNum,
                        });
                      
                        console.log(userConfig);
                        setTimeout(() => {
                            alert("success");
                            navigate('/AgentChat');
                        }, 2000);

                    } else {
                        setError('Invalid AgentName or password');
                        setTimeout(() => {
                            setError(null);
                        }, 5000);
                    }
                } else {
                    setError('Server Error');
                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                }
            } catch (error) {
                console.log(error);
            }
        };

        xhtps.send(JSON.stringify(LoginData));

    };



    return (
        <div className="logout">
            <div className="containerL">
                <div className="form-L" >
                    <div className='background_what'>
                        <img className='logo_login' src={sampLogo} style={{ marginTop: '15px', height: '100px' }} alt="Logo" />
                        <p style={{ color: '#2b91b9', fontFamily: 'system-ui', fontSize: '19px', marginBottom: '50px', borderBottom: '2px solid #00000033', padding: '4px' }} className="title-L"><span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <BsPersonFill style={{ height: '36px', width: '36px' }} className='icon' /> </span>Agent</p>
                        <input onChange={handleChange} value={LoginData.email} name='agentName' placeholder="Agent Id" className="username input" type="text" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <input className="password input" onChange={handleChange} value={LoginData.password} name='password' placeholder="Password" type={showPassword ? 'text' : 'password'} />
                            <BsEyeFill style={{ position: 'absolute', marginBottom: '9px', marginLeft: '280px' }} className={`eye-icon eye ${showPassword ? 'open' : 'closed'}`} onClick={togglePasswordVisibility} />
                        </div>
                        {/* Checkbox for confirming not a robot */}
                        <ReCAPTCHA
                            sitekey="6LdILWUpAAAAAGIlNr7x5cl7J8168wB2CqpxDaBP"
                        />
                        {isTesting ? (
                            !error ? (
                                <div className='error'>
                                    Testing your credentials. Please wait...
                                </div>
                            ) :
                                <div className='error'>
                                    {error}
                                </div>

                        ) : (
                            <div>

                                <button style={{ marginTop: '50px' }} onClick={handleLogIn} className="btnLogin Main_btn">
                                    <span className="text">Login</span>
                                    <span className="svgIcon">
                                        <BsArrowBarRight className='Licons' />
                                    </span>
                                </button>
                                {/* <span className='span_sign_up'>Don't have an account? <span onClick={handleSignUp} className='link_signUp'>Sign up</span></span> */}
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}