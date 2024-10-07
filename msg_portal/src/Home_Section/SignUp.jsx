import React, { useState } from 'react';

import "../css/sign_up.css"
import { BsArrowBarRight, BsEyeFill, BsPatchCheck } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { useConfig } from '../ConfigContext';

const generateRandomOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString().split('');
    return randomOtp;

};
const SignUp = () => {
    const { setConfig } = useConfig();
    const [showPassword, setShowPassword] = useState(false);
    const [isVarifying, setisVarifying] = useState(false);
    const [error, setError] = useState('');
    const [otp, setOtp] = useState(['', '', '', ''])
    const [sendAgain, setsendAgain] = useState(false);
    const navigate = useNavigate();
    const otpInputs = Array.from({ length: 4 });
    const [generatedOtp, setGeneratedOtp] = useState(generateRandomOtp());
    const [formData, setFormData] = useState(
        {
            "reqtype": "register",
            name: '',
            number: '',
            email: '',
            password: '',
            confirmPassword: '',
            orgname: '',
        }
    );

    const handleChange = (e) => {

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setError('');

    };



    //check wheather email is already signUp ??

    const fetchEmails = async () => {
        var data_E = {
            "reqtype": "emailsList",
            email: formData.email
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);

        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    if (result.response === "already_exist") {
                        setError("Email already registered")
                    }
                    else {
                        verifyDetails();
                    }
                }
            } catch (error) {
                console.log('Error parsing response');
            }
        };
        xhtps.onerror = function () {
            setError('Network error occurred');
        };
        xhtps.send(JSON.stringify(data_E));

    };





    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    //GENERATE OTP LOGIC--------------------

    const verifyDetails = async () => {
        // console.log("formdata");
        if (!formData.name || !formData.email || !formData.number || !formData.password || !formData.confirmPassword || !formData.orgname) {
            setError('Please fill in all fields.');

            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Password and Confirm Password do not match.');

            return;
        }
        //LOGIC TO CHECK IF SPECIAL CHARACTER  AND CAPITAL LETTER IS PRESENT IN THE PASSWORD 
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const capitalLetters = /[A-Z]/;
        if (!specialChar.test(formData.password) || !capitalLetters.test(formData.password)) {
            setError('Password must contain at least one special character and one capital letter.');
            return;
        }
        if (formData.password.length <= 7) {
            setError('Password must contain at least 8 characters');
            return;
        }
        if (!document.getElementById('consentCheckbox').checked) {
            setError('Please consent to the terms of use.');
            return;
        }

        //logic to send otp to the user's email typically be done on the server side-----

        const emailOtp = {
            to: formData.email,
            c_subject: "OTP Verification",
            c_body: `Dear Customer, Your One Time Passcode for completing your registration at test WhatsApp
            Solution is <b>${generatedOtp.join('')}</b> Do not share this Passcode with anyone.
            Thank You
            test Team`

        }
        const sendOtp = async () => {
            const xhtps = new XMLHttpRequest();
            //change code here use 210 server ip code:::::
            xhtps.open("POST", "http://878777/APIS/Cosmp/send_email.php", true);
            xhtps.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhtps.onload = async function () {
                try {
                    if (xhtps.status === 200) {
                        // const result = xhtps.responseText;
                        // console.log(result);
                        // console.log('otp sent');
                    } else {
                        console.log('Network Error');
                    }
                } catch (error) {
                    console.log('Server Error');
                }
            };

            xhtps.send("to=" + emailOtp.to + "&c_subject=" + emailOtp.c_subject + "&c_body=" + emailOtp.c_body);
        };

        sendOtp();
        // console.log(generatedOtp);

        setTimeout(() => {
            setisVarifying(true);
        }, 1000);


    };



    //otp varification ------------------


    const handle_Otp_change = (index, value) => {
        const newOtp = [...otp]
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    }



    const handleVerify = () => {

        if (generatedOtp.join('') === otp.join('')) {
            //SEND USERS DATA TO THE BACKEND ---------------------------------------------------
            const sendUsersData = async () => {
                setConfig(formData);
                // console.log(formData);
                const xhtps = new XMLHttpRequest();
                xhtps.open("POST", "access", true);
                xhtps.onload = async function () {
                    try {
                        if (xhtps.status === 200) {
                            // const result = JSON.parse(xhtps.responseText); // Parse the entire response
                            // console.log(result);
                        } else {
                            setError('Network Error');
                        }
                    } catch (error) {
                        setError('Server Error');
                    }
                };
                xhtps.send(JSON.stringify(formData));
            };
            sendUsersData();
            setTimeout(() => {
                alert('success : Thanks for signing up.');
                navigate('/');
            }, 2000);

        }


        else {
            setError('Incorrect verification code');
            setOtp(['', '', '', '']);
            setTimeout(() => {
                setError(null);
            }, 3000);
            // setsendAgain(true);
        }
    }



    return (
        <div className='container-S'>

            {isVarifying === false ? (
                <div className="form" >
                    <p className="title">Register </p>
                    <p className="message">
                        {error ? (

                            <span className='error'>Error: {error}</span>
                        ) : (

                            <>
                                Signup now and get full access to our app.
                            </>
                        )}
                    </p>
                    <div className="flex">
                        <label>
                            <input
                                className="input"
                                type="email"
                                placeholder=""
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <span>Email</span>
                        </label>
                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder=""
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <span>name</span>
                        </label>

                    </div>
                    <div className="flex">

                        <label>
                            <input

                                className="input"
                                type="password"
                                placeholder=""
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <span>Password </span>

                        </label>
                        <label>
                            <input

                                className="input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder=""
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <span>Confirm Password<BsEyeFill className={`eye-icon eye ${showPassword ? 'open' : 'closed'}`} onClick={togglePasswordVisibility} /></span>

                        </label>


                    </div>

                    {/* <label>
                        <input
                            className="input"
                            type="text"
                            placeholder=""
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <span>Email</span>
                    </label> */}

                    <div className="flex">
                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder=""
                                name="orgname"
                                value={formData.orgname}
                                onChange={handleChange}
                                required
                            />
                            <span>Organization name</span>
                        </label>
                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder=""
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                            />
                            <span>Number</span>
                        </label>
                    </div>
                    <button onClick={fetchEmails} className="Main_btn">
                        <span className="text"> Submit</span>
                        <span className="svgIcon">
                            <BsArrowBarRight className='Licons' />
                        </span>
                    </button>
                    <p className="signin">
                        Already have an account?<Link to="/Login">Login</Link>
                    </p>
                    <div style={{ display: 'block', alignItems: 'center', margin: 'auto' }}>

                        <input id="consentCheckbox" style={{ height: '20px', width: '20px', marginRight: '10px' }} type="checkbox" onChange={handleChange} />
                        {/* <label style={{ lineHeight: '3px', bottom: '4.5px', textAlign: 'center', fontSize: '16px', fontWeight: '500', fontFamily: 'system-ui' }} >I consent to terms of use <a href="#">Toss</a></label> */}
                    </div>

                </div>

            ) : (
                <div>
                    <div className="Otp">
                        <div className="title-A">Please Verify?</div>
                        <p className="message">We have sent a verification code on your gmail id- <span className='error'> {formData.email} </span> </p>
                        <div className="inputs">
                            {otpInputs.map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (otpInputs[index] = el)}
                                    id={`input${index + 1}`}
                                    type="text"
                                    maxLength="1"
                                    value={otp[index]}
                                    onChange={(e) => handle_Otp_change(index, e.target.value)}
                                />
                            ))}
                        </div>
                        {error ? (
                            <div className='error'>{error}</div>) : (
                            <button className="Main_btn" type="button" onClick={handleVerify}>
                                <span className="text">Sign In</span>
                                <span className="svgIcon">
                                    <BsPatchCheck className="Licons" />
                                </span>
                            </button>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;