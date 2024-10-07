import React, { useEffect } from 'react'
import "../css/startpage.css";
import "../css/agent.css";
import logo from '../img/metaphor.svg'
import metaL from '../img/logoback1.jpg'
import sm_1 from '../img/logo-small.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { BsBoxArrowInRight, BsBoxArrowInUpRight, BsBuildingDash, BsPerson, BsPersonFill } from 'react-icons/bs';

import { useConfig } from '../ConfigContext';
import { heIL } from '@mui/x-data-grid';


export default function StartPage() {

  const navigate = useNavigate();
  const { userConfig, updateConfig } = useConfig();
  const email = userConfig?.email;
  // console.log(email);
  const isActiveBar = (route) => {
    return window.location.pathname === route;
  };



  const GotoLoginPage = () => {
    navigate("/SignUp")
  }
  useEffect(() => {
    // if (userConfig) {
    //   updateConfig(prevConfig => {
    //     const newConfig = { ...prevConfig };
    //     if ('tgglbtn' in newConfig) {
    //       newConfig.tgglbtn = true;
    //     } else {
    //       newConfig.tgglbtn = true;
    //     }
    //     return newConfig;
    //   });
    // }
  }, [userConfig, updateConfig]);


  return (
    <div id='containerY'>
      <div className="navbar">
        <img
        style={{marginTop:'20px'}}
          src={logo}
          height={78}
          width={170}
        />

        <ul>

          <li className='atags'>
            <Link to='/' >
              Home
              <hr style={{ color: '#72cef3', marginTop: '2px', width: '50%', marginLeft: '1px' }} className={!isActiveBar("/webui/") ? 'hrX' : ''} />
            </Link>
          </li>
          <li className='atags'><Link to='/'>Features  <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/Features') ? 'hrX' : ''} /></Link></li>
          <li className='atags'> <Link to='/'> Pricing   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/Pricing') ? 'hrX' : ''} /></Link></li>
          <li className='atags'> <Link to='/'> FAQs   <hr style={{ color: '#72cef3', marginTop: '2px' }} className={!isActiveBar('/webui/F&Q') ? 'hrX' : ''} /></Link></li>
        </ul>
        {/* {!email ? ( */}
         
        {/* ) : ( */}
          <div class="headbtn" style={{ height: '37px' }} >
            <li >  <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='btnH Hk' to="/Whatsapp"><BsBuildingDash className='iconH' /> Dashboard</Link> </li>
          </div>


          <div class="headbtn" style={{ height: '37px' }} >
            <li> <Link to="/SignUp" style={{ fontSize: '13.7px', fontWeight: 600 }} className='btnH'  ><BsBoxArrowInUpRight className='iconH' />Sign Up</Link></li>
            <li> <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='btnH Hk' to="/Login" ><BsBoxArrowInRight className='iconH' />  Log in</Link></li>
            {/* <li >  <Link style={{ fontSize: '13.7px', fontWeight: 600 }} className='ax' to="/Agentlogin"><BsPerson className='iconH' /> Agent Login</Link> </li> */}


          </div>
        {/* )
        } */}


      </div>
      <div className="container-Z">
        <div className="box-1">
          <div className="left">
            <h5>The best Solution...</h5>
            <h2> Whether you’re managing customer relationships, processing payments, or handling vital data, our solution ensure a smooth exchange of information, making your WhatsApp chat an even more powerful tool for your business.</h2>
            <div style={{ display: 'flex' }}>
              <button onClick={GotoLoginPage} style={{ color: 'white', borderRadius: '0px' }} className='ax'> Start a Free Trial</button>
              <button style={{ color: 'white', borderRadius: '0px' }} className='ax'> Discover More</button>
            </div>
          </div>
          <div className="right-1">
            <img className='img-x'
              src={metaL} />
          </div>
        </div>

        {/* <div className=" box-2"><h5>All in one social media posting and scheduling tool</h5>
          <h2>Features</h2>
          <div className="smbox">

            <div className="b1">
              <img className='img-s'
                src={sm_1} />
              <h5>lorem ipsun 1234 d</h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Auamus officia cumque suscipit ut dolorem modi deepturi sapiente quaerat tenetur.</p>
            </div>
            <div className="b1">
              <img className='img-s'
                src={sm_1} />
              <h5>lorem ipsun 1234 d</h5>
              <p>Lue enim dolores eum excepturi sasdf ghd fgsdfg a sdgad sgas gdfasda sdpiente quaerat tenetur.</p>


            </div>
            <div className="b1">
              <img className='img-s'
                src={sm_1} />
              <h5>lorem ipsun 1234 d</h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem veexa sdfasdfasdfadfsadfsa fsadr xcxcv sadfcepturi sapiente quaerat tenetur.</p>


            </div>
            <div className="b1">
              <img className='img-s'
                src={sm_1} />
              <h5>lorem ipsun 1234 d</h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem vel nam accusamus atque enim dolores eum excepturi sapiente quaerat tenetur.</p>


            </div>

          </div>
        </div> */}
      </div>
    </div >
  )
}
