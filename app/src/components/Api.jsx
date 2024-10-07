import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useConfig } from '../ConfigContext';
import {
  BsWhatsapp,
  BsSearch,
  BsPlus,
  BsPersonFill,
  BsCheck2Circle,
  BsCloudArrowUpFill,
  BsCloudHailFill,
  BsCloudHaze2Fill
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";

export default function Api() {

  const { userConfig, updateConfig } = useConfig();
  const [accountsList, setAccountList] = useState([{
    name: "Test",
    number: "9938387372"
  },
  {
    name: "Test2",
    number: "9938387372"
  },
  {
    name: "Test3",
    number: "9938387372"
  },]);
  const [apiLink1, setApiLink1] = useState();
  const Hreq = process.env.REACT_APP_Hreq;
  const container_ip = process.env.REACT_APP_container_ip;
  const container_port = process.env.REACT_APP_container_port;
  const send_api1 =
    `Method: POST\n \nApi: \t''\n\nDataType: FormData\n\nHeaders: {
            'Content-Type': 'multipart/form-data',
          },
          \nParameters:\n\t\tnumber :\t7846637738 \n\t\tmessage:\t "hello !"\n\t\tfile:\tdocs.png`



  // const fetchContainerId = (cId, num, name) => {
  //   if (cId) {

  //     const sendApi1 = `${Hreq}://${container_ip}:${container_port}/router/webapp/cluster/api/sendMessage?_subHost=${cId}&_port=${container_port}&_path=`;
  //     const send_api1 =
  //       `Method: POST\n \nApi: \t'${sendApi1}'\n\nDataType: FormData\n\nHeaders: {
  //                 'Content-Type': 'multipart/form-data',
  //               },
  //               \nParameters:\n\t\tnumber :\t7846637738 \n\t\tmessage:\t "hello !"\n\t\tfile:\tdocs.png`

  //     const recvApi2 = userConfig.recvApi;
  //     const recv_api2 = `Method: POST
  //               Api: ${recvApi2}
  //               FormData:
  //               {
  //               "message": "hello How are You",
  //               "number": "9946377362"
  //               }`
  //     setApiLink1(send_api1);
  //     //Logic to set active List-----------------------
  //     updateConfig(prevConfig => {
  //       const newConfig = { ...prevConfig };
  //       if ('ActiveApi' in newConfig) delete newConfig.ActiveApi;
  //       if ('ActiveApiName' in newConfig) delete newConfig.ActiveApiName;
  //       return {
  //         ...newConfig,
  //         ActiveApi: cId,
  //         ActiveApiName: name,
  //       };
  //     });
  //     // console.log(userConfig.ActiveApi)
  //   }
  //   else {
  //     setApiLink1(null);
  //   }
  // }



  // const fetchContainerIdOnReload = () => {
  //   if (userConfig.ActiveApi) {

  //     const sendApi1 = `${Hreq}://${container_ip}:${container_port}/router/webapp/cluster/api/sendMessage?_subHost=${userConfig.ActiveApi}&_port=${container_port}&_path=`;
  //     const send_api1 =
  //       `Method: POST\n \nApi: \t'${sendApi1}'\n\nDataType: FormData\n\nHeaders: {
  //                 'Content-Type': 'multipart/form-data',
  //               },
  //               \nParameters:\n\t\tnumber :\t7846637738 \n\t\tmessage:\t "hello !"\n\t\tfile:\tdocs.png`

  //     const recvApi2 = userConfig.recvApi;
  //     const recv_api2 = `Method: POST
  //               Api: ${recvApi2}
  //               FormData:
  //               {
  //               "message": "hello How are You",
  //               "number": "9946377362"
  //               }`
  //     setApiLink1(send_api1)

  //   }
  //   else {
  //     setApiLink1(null);
  //   }

  // }






  // const fetchHasAccount = async () => {
  //   var data_Ar = {
  //     "reqtype": "getRegisterDetails",
  //     email: userConfig.email,
  //   };
  //   const xhtps = new XMLHttpRequest();
  //   xhtps.open("POST", "access", true);
  //   // xhtps.open("POST", " http://localhost:8080/whatsupapi/access", true);
  //   xhtps.onload = async function () {
  //     try {
  //       if (xhtps.status === 200) {
  //         const result = JSON.parse(xhtps.responseText).details;
  //         const accountList = [];
  //         result.forEach(detail => {
  //           accountList.push({
  //             name: detail.Aname,
  //             number: detail.whatsappNum,
  //             cId: detail.containerId
  //           });

  //         });
  //         setAccountList(accountList);
  //       }
  //     } catch (error) {
  //       console.log('Error parsing response:', error);
  //     }
  //   };
  //   xhtps.send(JSON.stringify(data_Ar));
  // };



  useEffect(() => {
    // fetchHasAccount();
    // fetchContainerIdOnReload();
    setApiLink1(send_api1)
  }, []);
  const isActive = (route) => {
    return window.location.pathname === route;
  };
  return (
    <div className="whatsapp" >
      <div className="list">
        <h3 className='select-I'><BsCheck2Circle className='Licons' />{userConfig.ActiveApiName || "Select Initiative"} </h3>
        <div className="searchbar">
          <BsSearch color="gray" style={{ height: '16px', width: '16px', marginLeft: '7px' }} />
          <input id="search" type="text" />
        </div>

        <div className="title-I" >Select Initiative</div>

        <div className="features">

          {accountsList.map((item, index) => (
            <li className='listI' key={index}>
              <Link className={userConfig.ActiveApi === item.cId ? "active" : ""} >
                <BsPersonFill style={userConfig.ActiveApi === item.cId ? { color: 'rgb(42, 189, 42)' } : ""} className="Licons" />
                <div className="libox">
                  {item.name}
                  <span className="span-text">{item.number}</span>
                </div>
              </Link>
            </li>
          ))}


        </div>
      </div>
      <div className="home">

        < div className="containerApi">
          <h2 className="mb-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', color: '#433e3ef0' }}>
            <span className="me-2" style={{ padding: '3px' }} ><BsCloudHaze2Fill style={{ color: '#25d366', paddingRight: '10px' }} className="Licons" />Api</span>
            <span style={{ paddingLeft: '42px', color: 'gray', fontFamily: 'system-ui', fontSize: '13.5px' }} className="fs-16 fw-6 .text-gray-600 ">Use Following api to send messages</span>
          </h2>
          <hr style={{ width: '70%', marginLeft: '-10px', marginTop: '-13px' }} />
          <div id="ApiXY" >
            <div className='api_box'>
              <label  >Message Sending Api</label>
              <textarea value={apiLink1}></textarea>
            </div>
            {/* 
            <div className='api_box'>
              <label >Message Receiving Api</label>
              <textarea value={'apiLink2'} ></textarea>
            </div> */}
          </div>




        </div>
      </div>
    </div>
  )
};