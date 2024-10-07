import React from 'react'
import { BsBugFill } from 'react-icons/bs'
import logo from '../img/test_Logo.png'
import "../css/startpage.css";
import "../css/pricing.css";
import F_Qimg from '../img/f_q.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { BsBoxArrowInRight, BsBoxArrowInUpRight, BsBuildingDash, BsPerson, BsPersonFill } from 'react-icons/bs';
import { useConfig } from '../ConfigContext';

export default function F_Q() {
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
            <Link to='/' >
              Home
              <hr style={{ color: '#72cef3', marginTop: '2px', width: '50%', marginLeft: '1px' }} className={!isActiveBar("/webui/") ? 'hrX' : ''} />
            </Link>
          </li>
          <li className='atags'><Link to='/Features'>Features  <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/Features') ? 'hrX' : ''} /></Link></li>
          <li className='atags'> <Link to='/Pricing'> Pricing   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/Pricing') ? 'hrX' : ''} /></Link></li>
          <li className='atags'> <Link to='/F_Q'> FAQs   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/F&Q') ? 'hrX' : ''} /></Link></li>
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


      {/* <div className="f_q_box">
        <div className="right-box-fq">
          <img src={F_Qimg} alt="" />
          <a className='attriB' href="https://www.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_22896759.htm#fromView=search&page=1&position=1&uuid=b62ccfda-51e9-42ab-88c2-e1b7f7404d1d">Image by freepik</a>
        </div>

    

        <div className="left-box-fq">
        <ul><li>how to see failed messages?</li>
          <li>How Counts works</li>
          <li>Explain SWS?</li>
          <li>Process of resgistering whatsapp business number</li>
          <li></li>

        </ul>

      </div>
     </div> */}



    </div>

  )
}
