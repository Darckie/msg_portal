import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useConfig } from '../ConfigContext';
import "../css/fileupload.css";

import {
    BsSearch,
    BsPersonFill,
    BsCheck2Circle,
    BsCloudUpload,
    BsChevronBarRight,
    BsNodeMinusFill,
    Bs1CircleFill,
    Bs2CircleFill,
    BsArrowUp,
    BsFillCloudUploadFill,
    Bs3CircleFill
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";

export default function Bulk({ placeholder = "Type your message here...", rows = 10, disabled = false }) {
    const { userConfig, updateConfig } = useConfig();
    const [accountsList, setAccountList] = useState([]);
    const Hreq = process.env.REACT_APP_Hreq;
    const [agentNumber, setagentNum] = useState();
    const [InitiativeNumber, setInitiativeNumber] = useState();
    const [agentCid, setagentCid] = useState();
    const [step2, setstep2] = useState(false);
    const [uploader, setuploader] = useState(false);
    const [message, setMessage] = useState();
    const [isSending, setIssending] = useState(false);

    const Sent = 23;
    const Total = 1000;
    //file upload logic
    const [fileInfo, setFileInfo] = useState('No file chosen');
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileInfo(`File: ${file.name}`);
            setFile(file);
        } else {
            setFileInfo('No file chosen');
            setFile(null);
        }
    };

    const handleUpload = () => {
        // const { file, message, agentNumber } = state;
        setInitiativeNumber(agentNumber);
        if (!file || !message || !agentNumber) {
            alert("Input fields missing!");
            return;
        }

        setuploader(true);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("Inumber", agentNumber);
        formData.append("message", message);

        fetch("Uploadbulk", {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to upload file. Server responded with " + response.status);
                }
                return response.json();
            })
            .then(data => {

                if (data && data.response === 'success') {
                    alert(`File uploaded successfully! Data count: ${data.count}`);
                    setFile(null);
                    setMessage('');
                    setagentNum('');
                    setFileInfo('No file chosen');
                } else {
                    throw new Error("Server returned an error: " + data.cause);
                }
            })
            .catch(error => {
                console.error(error);
                alert("Failed to upload file. Please try again.");
            })
            .finally(() => {
                setuploader(false);
                setIsUploading(false);
            });
    };



    const fetchHasAccount = async () => {
        var data_Ar = {
            "reqtype": "getRegisterDetails",
            email: userConfig.email,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        // xhtps.open("POST", " http://localhost:8080/webui/access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText).details;
                    const accountList = [];
                    result.forEach(detail => {
                        accountList.push({
                            name: detail.Aname,
                            number: detail.whatsappNum,
                            cId: detail.containerId
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
    const fetchDetails = (cId, number) => {


        if (cId) {
            //Logic to set active List-----------------------
            updateConfig(prevConfig => {
                const newConfig = { ...prevConfig };
                if ('ActiveSendNumber' in newConfig) delete newConfig.ActiveSendNumber;
                return {
                    ...newConfig,
                    ActiveSendNumber: number
                };
            });
            // console.log(userConfig.ActiveApi)

            setagentCid(cId);
            setagentNum(number);
        }
        else {
            // setApiLink1(null);
        }


        // setApiLink2(recv_api2);

        // if (item) {
        //   updateConfig(prevConfig => {
        //     const newConfig = { ...prevConfig };

        //     if ('ActiveInitiativeNum' in newConfig) delete newConfig.ActiveInitiativeNum;
        //     return {
        //       ...newConfig,
        //       ActiveInitiativeNum: item
        //     };
        //   });
        // }
    }


    useEffect(() => {
        fetchHasAccount();

    }, []);
    const isActive = (route) => {
        return window.location.pathname === route;
    };
    return (
        <div className="whatsapp" >
            <div className="list">
                <h3 className='select-I'><BsCheck2Circle className='Licons' /> {agentNumber || 'Select Initiative'} </h3>
                <div className="searchbar">
                    <BsSearch color="gray" style={{ height: '16px', width: '16px', marginLeft: '7px' }} />
                    <input id="search" type="text" />
                </div>
                <div className="title-I" >Select Initiative</div>
                <div className="features">
                    {accountsList.map((item, index) => (
                        <li className='listI' key={index}>
                            <Link className={agentNumber === item.number ? "active" : ""} onClick={() => fetchDetails(item.cId, item.number)}>
                                <BsPersonFill style={agentNumber === item.number ? { color: 'rgb(42, 189, 42)' } : ""} className="Licons" />
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
                < div className="containerApi containerF">
                    {uploader ?
                        (<div className='Upcontainer'>
                            <div className={`loader-container ${uploader ? 'visible' : ''}`}>
                                <div className="loader"></div>
                            </div>
                            <span style={{ marginTop: "25px", marginLeft: "-40px", display: "flex" }}> <BsFillCloudUploadFill className='icon' />Please wait while uploading Excel data... </span>
                        </div>) :
                        isSending ? (

                            <span style={{ marginTop: "25px", fontSize: "19px", marginLeft: "-40px", width: "37%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}> <BsFillCloudUploadFill style={{ fontSize: "27px" }} className='icon' /> Bulk Sending Status  <span className='BulkStatus'> {Sent}/<span className='s2'> {Total} </span> </span> </span>


                        ) :
                            (

                                <div className='uploadContainer'>
                                    <div className='Upcontainer'>
                                        <div className='reminder'><BsNodeMinusFill className='icon' /> <span>Step <Bs1CircleFill className='icon2' /></span></div>
                                        <div className="upload-box">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                onChange={handleFileChange}
                                                hidden
                                            />
                                            <label htmlFor="file-upload" className="upload-label">
                                                <BsCloudUpload size={24} />
                                                <span>Upload<span className="inx">Supports only .csv format</span></span>
                                            </label>
                                            <div id="file-info">{fileInfo}</div>


                                            <div className="input-container">
                                                <div className="error">**Please select Initiative number - Top right <BsArrowUp /></div>
                                                <input
                                                    type="number"
                                                    value={agentNumber} onChange={(e) => setInitiativeNumber(e.target.value)}
                                                    className="InitiativeNum"
                                                    placeholder="Initiative number"
                                                    disabled={true}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='Upcontainer'>
                                        <div className='reminder'><BsNodeMinusFill className='icon' /> <span>Step <Bs2CircleFill className='icon2' /></span></div>
                                        <textarea
                                            className="interactive-textarea"
                                            placeholder={placeholder}
                                            value={message} onChange={(e) => setMessage(e.target.value)}
                                            rows={rows}
                                            disabled={disabled}
                                        ></textarea>

                                        {/* <button style={{ marginRight: "98px", alignSelf: "flex-end" }}
                                        id="upload-button"
                                        onClick={handleUpload}
                                    >
                                        Submit{<BsChevronBarRight className='icon' />}
                                    </button> */}
                                        <div style={{ marginRight: "12px", marginTop: "14px", marginBottom: "-12px", alignSelf: "flex-end" }} className='reminder'><BsNodeMinusFill className='icon' /> <span>Step <Bs3CircleFill className='icon2' /></span></div>
                                        <button style={{ marginRight: "12px", alignSelf: "flex-end" }}
                                            id="upload-button"
                                            onClick={handleUpload}
                                            disabled={!file || isUploading || !message || !agentNumber}
                                        >
                                            {isUploading ? "Uploading..." : "Upload"}{<BsChevronBarRight className='icon' />}
                                        </button>

                                    </div>

                                </div>

                            )
                    }


                </div>
            </div>
        </div>
    )
};