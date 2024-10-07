
import React, { useState, useEffect } from 'react';

import Chart from 'react-apexcharts';

import { useConfig } from '../ConfigContext';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Export from "./Chat";
import Home from "./Home";
import Profile from "./Profile";
import Autoresponder from "./AutoResponder"
import {
  BsSearch,
  BsWhatsapp,
  BsCheck2Circle,
  BsPersonFill,
  BsChatDots,
  BsFillSendCheckFill,
  BsSendExclamationFill,
  BsEnvelopeFill,
  BsHouseDash,
  BsHouse,
  BsHouseFill,
} from "react-icons/bs";
// import "../css/home.css";
import "../css/list.css";

export default function WhatsApp({ isExpanded }) {
  const { userConfig, updateConfig } = useConfig();
  const [countBalance, setcountBalance] = useState();
  const [usedBalance, setusedBalance] = useState();
  const [accountsList, setAccountList] = useState([


    {
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
    },
  ]);
  // const [Initiative, setInitiative] = useState();
  const [CountFailed, setCountFailed] = useState();
  const XState = userConfig.tgglbtn;

  // console.log("previous state is :" + useConfig.tgglbtn)
  // console.log(XState);

  // const []

  //function to update count --------------------------------------------
  const fetchCounts = async (Inname, item) => {

    updateConfig(prevConfig => {
      const newConfig = { ...prevConfig };

      if ('ActiveInitiativeNum' in newConfig) delete newConfig.ActiveInitiativeNum;
      if ('ActiveInitiativeName' in newConfig) delete newConfig.ActiveInitiativeName;
      return {
        ...newConfig,
        ActiveInitiativeNum: item,
        ActiveInitiativeName: Inname,
      };
    });


    const data_C = {
      "reqtype": "getCounts",
      whatsappNum: item,
    };
    // setInitiative(item);
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);
    // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);

    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText).counts;
          const failedCount = JSON.parse(xhtps.responseText).failedCount;
          const total = result[0].countBalance;
          const used = result[0].usedBalance;
          //update userconfig



          setcountBalance(total);
          setCountFailed(failedCount);
          setusedBalance(used);
          CacuFnc(total, used);
        } else {
          console.log('No Number found');
        }
      } catch (error) {
        console.log('Error parsing response');
      }
    };
    xhtps.send(JSON.stringify(data_C));
  };

  //fetch data as per its initiative




  //first time render 
  const fetchCountsOnReload = async () => {

    const itemTOSend = userConfig.ActiveInitiativeNum;
    const data_C = {
      "reqtype": "getCounts",
      whatsappNum: itemTOSend,
    };
    // setInitiative(item);
    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "access", true);
    // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);

    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText).counts;
          const failedCount = JSON.parse(xhtps.responseText).failedCount;
          const total = result[0].countBalance;
          const used = result[0].usedBalance;

          //update userconfig
          setcountBalance(total);
          setCountFailed(failedCount);
          setusedBalance(used);
          CacuFnc(total, used);
        } else {
          console.log('No Number found');
        }
      } catch (error) {
        console.log('Error parsing response');
      }
    };
    xhtps.send(JSON.stringify(data_C));
  };



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
              number: detail.whatsappNum
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


  const CacuFnc = (total, used) => {
    const percentage = (used / total) * 100;
    const roundedPercentage = percentage.toFixed(2);

    setOptions5(prevOptions => ({
      ...prevOptions,
      series: [100, roundedPercentage]
    }));
  }

  useEffect(() => {
    fetchHasAccount();
    fetchCountsOnReload();
  }, []);


  // useEffect(() => {


  //   const refreshInterval = setInterval(fetchCountsOnReload, 5 * 1000);

  //   return () => clearInterval(refreshInterval);
  // }, []);



  //function to render charts------------------

  const [options5, setOptions5] = useState({
    series: [100, 0], // Initial series values
    chart: {

      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '32%',
        },
        fill: {
          colors: ['white']
        }
      },
    },
    labels: {
      style: {
        colors: ['white'],
      }
    },
    labels: ['Total', 'Sent'],
  });


  return (
    <div id="whatsapp" className="whatsapp" >

      {/* //home section ------------------------------------ */}
      <div id="home" className="home" >

        <div className="list">
          <h3 className='select-I'><BsCheck2Circle className='Licons' />{userConfig.ActiveInitiativeName || 'Select Initiative'} </h3>
          <div className="searchbar">
            <BsSearch color="gray" style={{ height: '16px', width: '16px', marginLeft: '7px' }} />
            <input id="search" type="text" />
          </div>

          <div className="title-I" >Select Initiative</div>

          <div className="features">

            {accountsList.map((item, index) => (
              <li className='listI' key={index}>
                <Link className={userConfig.ActiveInitiativeNum === item.number ? "active" : ""} onClick={() => fetchCounts(item.name, item.number)}>
                  <BsPersonFill style={userConfig.ActiveInitiativeNum === item.number ? { color: 'rgb(42, 189, 42)' } : ""} className="iconL" />
                  <div className="libox">
                    {item.name}
                    <span className="span-text">{item.number}</span>
                  </div>
                </Link>
              </li>
            ))}


          </div>
        </div>
        <div id="container" style={{ width: !XState ? '95%' : '' }} className="container px-4 py-4">
          <div id="rowX_" className="rowx">
            <h2 style={{ color: '#4c4c4c', marginBottom: '-9px' }}><BsHouseFill className='icon' MessageDotsFill style={{ color: '#25d366', marginRight: '1px' }} />Dashboard</h2>
            <span style={{ color: 'gray', paddingLeft: '28px', fontFamily: 'system-ui' }} className='spanH'>You can access each initiative report individually... </span>
            <hr className='hr0' style={{ width: '100%', marginLeft: '-8px', marginTop: '7px' }} />
            {/* <h2 className="mb-5">
              <span className="me-2"><BsWhatsapp style={{ color: '#25d366' }} className="icon" /> WhatsApp report</span>
            </h2> */}



            {/* <div id="Loadingchart2">
              <Chart options={options6} series={options6.series} type="radialBar" height={200} />
            </div> */}
            <div id="smRows" className="row">
              <div className="col-md-6-p">
                <div className="col-md-6">
                  <div id="box-Dn" style={{ display: 'flex', flexDirection: 'row' }} className="card card-custom card-custom-primary mb-4">

                    <div id="Loadingchart1">
                      <Chart class="chr-R" options={options5} series={options5.series} type="radialBar" />
                    </div>
                    <div className='box_show' style={{ border: '1px solid white', width: '100%', padding: '20px', margin: '0px' }}>
                      <div className="fs-16 fw-6 text-white">Message by month</div>
                      <div className="fs-12 text-gray-100">Limit messages by month</div>
                      <div id="outofAll" className="fs-25 fw-6 text-white"><span className='GreenText'>{usedBalance || 1230}</span>/<span className='totalB' style={{ color: '#009ef7' }}>{countBalance || 1000000}</span></div>
                    </div>

                  </div>
                </div>

                <div className="col-md-6 col-md-6-b">
                  <div className="card border b-r-10 mb-4">
                    <div className="card-body">
                      <div className="fw-9 fs-40 text-primary p-icon position-absolute t-10 r-10 opacity-20">< BsChatDots style={{ width: '69px', height: '69px' }} class="Wicons" /></div>
                      <div className="fs-14 text-gray-600">Total sent messages</div>
                      <div className="fw-9 fs-30 text-primary d-flex"><span className="X_text me-1 GreenText">{usedBalance || 88340}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* col ----------------2 */}
              <div className="bulk">
                <div className="card border b-r-10 mb-4">

                  <div className="card-header">
                    <div className="card-title">
                      Sent History
                    </div>
                  </div>


                  <div className="col-md-6-p">
                    <div style={{ display: 'flex', flexDirection: 'column' }} className="col-md-4 mb-4">
                      <div className="card border b-r-10">
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="card-body">
                          <div className="fw-9 fs-40 text-primary position-absolute t-10 r-10 opacity-20"><BsEnvelopeFill class="Wicons" />   </div>
                          <div className="fs-14 text-gray-600">Total</div>
                          <div className="fw-9 fs-30 text-primary d-flex"><span className="me-1">{countBalance || 34856440}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }} className="col-md-4 mb-4">
                      <div className="card border b-r-10">
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="card-body">
                          <div className="fw-9 fs-40 text-success position-absolute t-10 r-10 opacity-20"> <BsFillSendCheckFill className="Wicons" /> </div>
                          <div className="fs-14 text-gray-600">Sent</div>
                          <div className="fw-9 fs-30 text-success d-flex"><span className="me-1">{usedBalance || 5660}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }} className="col-md-4 mb-4">
                      <div className="card border b-r-10">
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="card-body">
                          <div className="fw-9 fs-40 text-danger position-absolute t-10 r-10 opacity-20"><BsSendExclamationFill color='red' className="Wicons" /></div>
                          <div className="fs-14 text-gray-600">Failed <span style={{ fontSize: "11px", color: "#0bb60b" }}>this month</span></div>
                          <div className="fw-9 fs-30 text-danger d-flex"><span className="me-1">{CountFailed || 440}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    {/* <table className="table align-middle table-striped table-bordered">
                      <thead>
                        <tr>
                          <th className="p-15 b-r-10 h">Campaign name</th>
                          <th className="p-15 w-150 text-success">Sent</th>
                          <th className="p-15 w-150 text-danger">Failed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-15 d">test</td>
                          <td className="p-15 d">3</td>
                          <td className="p-15 d">0</td>
                        </tr>
                        <tr>
                          <td className="p-15 d">Atish Test</td>
                          <td className="p-15 d">3</td>
                          <td className="p-15 d">0</td>
                        </tr>
                        <tr>
                          <td className="p-15 d">xyz</td>
                          <td className="p-15 d">2</td>
                          <td className="p-15 d">0</td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                </div>

              </div>


              {/* <div className="col-md-12">
                <div className="card border b-r-10 mb-4">
                  <div className="card-header">
                    <div className="card-title">
                      Autoresponder
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="row1">
                      <div className="col-md-12 mb-4">
                        <div className="card border b-r-10">
                          <div className="card-body">
                            <div className="fw-9 fs-40 text-success position-absolute t-10 r-10 opacity-20"> <BsSendFill className="Wicons" /> </div>
                            <div className="fs-14 text-gray-600">Sent</div>
                            <div className="fw-9 fs-30 text-success d-flex"><span className="me-1">0</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="col-md-12">
                <div className="card border b-r-10 mb-4">
                  <div className="card-header">
                    <div className="card-title">
                      Chatbot
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="row">
                      <div className="col-md-12 mb-4">
                        <div className="card border b-r-10">
                          <div className="card-body">
                            <div className="fw-9 fs-40 text-success position-absolute t-10 r-10 opacity-20">  <BsSendFill className="Wicons" /> </div>
                            <div className="fs-14 text-gray-600">Sent</div>
                            <div className="fw-9 fs-30 text-success d-flex"><span className="me-1">0</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );



}
