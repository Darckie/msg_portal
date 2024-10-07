
import React, { useState, useEffect } from 'react';
import { useConfig } from '../ConfigContext';
import {

  BsWhatsapp,
  BsFillPersonPlusFill,
  BsFillCalendar2CheckFill,
  BsSendFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";

import "../css/home.css";

export default function Home() {
  const { userConfig ,updateConfig } = useConfig();
  const [countBalance, setcountBalance] = useState();
  const [usedBalance, setusedBalance] = useState();
  

  //function to update count --------------------------------------------
  const fetchconts = async () => {
    var data_C = {
      "reqtype": "getCounts",
      whatsappNum: userConfig.whatsappNum,
    };

    const xhtps = new XMLHttpRequest();
    xhtps.open("POST", "test", true);
    // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);


    xhtps.onload = async function () {
      try {
        if (xhtps.status === 200) {
          const result = JSON.parse(xhtps.responseText).counts;
          // console.log(result);
          const total = result[0].countBalance;
          const used = result[0].usedBalance;

          setcountBalance(total);
          setusedBalance(used);

          //update count in
          updateConfig(prevConfig => {
            const newConfig = { ...prevConfig };
            if ('usedcount' in newConfig) delete newConfig.whatsappNum;

            return {
              ...newConfig,
              usedcount: used,
            };
          });
     
        } else {
          console.log('No Number found');
        }
      } catch (error) {
        console.log('Error parsing response');
      }
    };
    xhtps.send(JSON.stringify(data_C));
  };
  useEffect(() => {
    fetchconts();
  }, [])

  return (
    <div className="home" >
      <div className="container px-4 py-4">
        <div className="rowx">

          <h2 className="mb-5">
            <span className="me-2"><BsWhatsapp style={{ color: '#2f3133' }} className="icon" /> WhatsApp report</span>
          </h2>
          <div className="row">
            <div className="col-md-6-p">
              <div className="col-md-6">
                <div className="card card-custom card-custom-primary mb-4">

                  <div className="px-3 p-t-18 p-b-18 b-r-10 w-100">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <div className="fs-16 fw-6 text-white">Message by month</div>
                        <div className="fs-12 text-gray-100">Limit messages by month</div>
                      </div>
                      <div className="fs-25 fw-6 text-white">{usedBalance}/{countBalance}</div>
                    </div>
                    <div className="progress mb-2">
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: '0%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-between text-gray-100 fs-12">
                      <div>Percent</div>
                      <div className="text-gray-100 fw-6">0%</div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-6 col-md-6-b">
                <div className="card border b-r-10 mb-4">
                  <div className="card-body">
                    <div className="fw-9 fs-40 text-primary p-icon position-absolute t-10 r-10 opacity-20">< BsFillPersonPlusFill class="Wicons" /></div>
                    <div className="fs-14 text-gray-600">Total message sent</div>
                    <div className="fw-9 fs-30 text-primary d-flex"><span className="me-1">{usedBalance}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* col ----------------2 */}
            <div className="bulk">
              <div className="card border b-r-10 mb-4">

                <div className="card-header">
                  <div className="card-title">
                   Sent messages
                  </div>
                </div>


                <div className="col-md-6-p">
                  <div className="col-md-4 mb-4">
                    <div className="card border b-r-10">
                      <div className="card-body">
                        <div className="fw-9 fs-40 text-primary position-absolute t-10 r-10 opacity-20"><BsFillCalendar2CheckFill class="Wicons" />   </div>
                        <div className="fs-14 text-gray-600">Total</div>
                        <div className="fw-9 fs-30 text-primary d-flex"><span className="me-1">{countBalance}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card border b-r-10">
                      <div className="card-body">
                        <div className="fw-9 fs-40 text-success position-absolute t-10 r-10 opacity-20"> <BsSendFill className="Wicons" /> </div>
                        <div className="fs-14 text-gray-600">Sent</div>
                        <div className="fw-9 fs-30 text-success d-flex"><span className="me-1">{usedBalance}</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card border b-r-10">
                      <div className="card-body">
                        <div className="fw-9 fs-40 text-danger position-absolute t-10 r-10 opacity-20"><BsExclamationTriangleFill color='red' className="Wicons" /></div>
                        <div className="fs-14 text-gray-600">Failed</div>
                        <div className="fw-9 fs-30 text-danger d-flex"><span className="me-1">0</span> <span className="fs-14 fw-4 d-flex align-items-center mt-2">Messages</span></div>
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


            <div className="col-md-12">
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
            </div>

            <div className="col-md-12">
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
