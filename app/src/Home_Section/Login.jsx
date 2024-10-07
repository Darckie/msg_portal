import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sampLogo from '../img/logottt.svg';
import '../css/logout.css';
import '../css/list.css';
import { BsArrowBarRight, BsEyeFill } from 'react-icons/bs';
import { useConfig } from '../ConfigContext';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const { setConfig } = useConfig();
    const [isTesting, setIsTesting] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // simulate Log in functionality???????????????????????????
    const [LoginData, setLoginData] = useState(
        {
            "reqtype": "Login",
            email: 'Test@gmail.com',
            password: '1234',
        }
    );
    // setConfig(LoginData);
    const handleChange = (e) => {
        setLoginData({ ...LoginData, [e.target.name]: e.target.value });
    };

    const handleLogIn = async () => {
        setIsTesting(true);
        setTimeout(() => {
            setIsTesting(false);
        }, 5000);

        // sendUsersData();
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // simulate sign in functionality???????????????????????????
    const handleSignUp = () => {
        navigate('/SignUp');
    };

    //check wheather login id or password is correct-----------------------------------------------
    // const sendUsersData = async () => {
    //     //   setConfig(LoginData);
    //     const xhtps = new XMLHttpRequest();
    //     xhtps.open("POST", "access", true);
    //     xhtps.onload = async function () {
    //         try {
    //             if (xhtps.status === 200) {
    //                 const result = JSON.parse(xhtps.responseText).response; 
    //                 if (result === "success") {
    //                     setConfig(LoginData);
    //                     setTimeout(() => {
    //                         // alert('success');
    //                         navigate('/');
    //                     }, 3500);

    //                 } else {
    //                     setError('Invalid email or password');
    //                     setTimeout(() => {
    //                         setError(null);
    //                     }, 5000);
    //                 }

    //             } else {
    //                 setError('Server Error');
    //                 setTimeout(() => {
    //                     setError(null);
    //                 }, 5000);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     xhtps.send(JSON.stringify(LoginData));

    // };



    return (
        <div className="logout">
            <div className="containerL">
                <div className="form-L" >
                    <div className='background_what'>
                        <img className='logo_login' src={sampLogo} style={{ marginTop: '15px' }} alt="Logo" />
                        <p className="title-L">SAMP API</p>
                        <input onChange={handleChange} value={LoginData.email} name='email' placeholder="Email" className="username input" type="text" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <input className="password input" onChange={handleChange} value={LoginData.password} name='password' placeholder="Password" type={showPassword ? 'text' : 'password'} />
                            <BsEyeFill style={{ position: 'absolute', marginBottom: '9px', marginLeft: '280px' }} className={`eye-icon eye ${showPassword ? 'open' : 'closed'}`} onClick={togglePasswordVisibility} />
                        </div>
                        {/* Checkbox for confirming not a robot */}
                        <ReCAPTCHA
                            sitekey="6Le-UOspAAAAAOUDjmNualMK6xai2cHepicizcyA"
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

                                <button onClick={handleLogIn} className="btnLogin Main_btn">
                                    <span className="text">  Login</span>
                                    <span className="svgIcon">
                                        <BsArrowBarRight className='Licons' />
                                    </span>
                                </button>
                                <span className='span_sign_up'>Don't have an account? <span onClick={handleSignUp} className='link_signUp'>Sign up</span></span>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}