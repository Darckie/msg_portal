import React from 'react'
import '../css/pricing.css';
import "../css/startpage.css";
import "../css/agent.css";
import logo from '../img/test_Logo.png'
import metaL from '../img/logoback1.jpg'
import sm_1 from '../img/logo-small.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { BsBoxArrowInRight, BsBoxArrowInUpRight, BsBuildingDash, BsPerson, BsPersonFill } from 'react-icons/bs';

import { useConfig } from '../ConfigContext';


export default function Pricing() {
    const { userConfig } = useConfig();
    const email = userConfig?.email;
    // console.log(email);
    const isActiveBar = (route) => {
        return window.location.pathname === route;
    };
    return (
        <div id='containerY'>




            <div className="navbar">
                <img
                    src={logo}
                    height={78}
                    width={180}
                />

                <ul>

                    <li className='atags'>
                        <Link to="/" >
                            Home
                            <hr style={{ color: '#72cef3', marginTop: '2px', width: '50%', marginLeft: '1px' }} className={!isActiveBar("/") ? 'hrX' : ''} />
                        </Link>
                    </li>
                    <li className='atags'><Link to='/Features'>Features  <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/msg_portal/Features') ? 'hrX' : ''} /></Link></li>
                    <li className='atags'> <Link to='/Pricing'> Pricing   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/msg_portal/Pricing') ? 'hrX' : ''} /></Link></li>
                    <li className='atags'> <Link to='/F_Q'> FAQs   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/msg_portal/F&Q') ? 'hrX' : ''} /></Link></li>
                </ul>
                {!email ? (
                    <div class="dashShow" style={{ display: 'flex', justifyContent: 'center' }} >
                        <li> <Link to="/SignUp" style={{ fontSize: '13.7px', fontWeight: 600 }} className='ax'  ><BsBoxArrowInUpRight className='iconH' />Sign Up</Link></li>
                        <li> <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='ax' to="/Login" ><BsBoxArrowInRight className='iconH' />  Log in</Link></li>
                        {/* <li >  <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='ax' to="/Agentlogin"><BsPerson className='iconH' /> Agent Login</Link> </li> */}
                    </div>
                ) : (
                    <div class="dashShow" style={{ display: 'flex', justifyContent: 'center' }} >
                        <li >  <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='ax' to="/Whatsapp"><BsBuildingDash className='iconH' /> Dashboard</Link> </li>
                    </div>
                )
                }


            </div>
            <div> <h1> Pricing List </h1></div>
            <hr />
            <div className="pricing-table">
                <div className="pricing-card">
                    <h2>Basic</h2>
                    <p className="price">$10/month</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                    <button className='P-btn'>Buy Now</button>
                </div>
                <div className="pricing-card">
                    <div className="elmX">Popular</div>
                    <div className='tagX'>
                        <h2>Pro</h2>
                        <p className="price">$20/month</p>
                    </div>

                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>Feature 4</li>
                    </ul>
                    <button className='P-btn'>Buy Now</button>
                </div>
                <div className="pricing-card">
                    <h2>Premium</h2>
                    <p className="price">$30/month</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>Feature 4</li>
                        <li>Feature 5</li>
                    </ul>
                    <button className='P-btn'>Buy Now</button>
                </div>
            </div>
        </div>
    );
}
