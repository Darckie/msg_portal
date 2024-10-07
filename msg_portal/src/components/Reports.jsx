import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useConfig } from '../ConfigContext';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


import {
    BsSearch,
    BsPersonFill,
    BsCheck2Circle,
    BsFilterSquareFill,
    BsFileEarmarkZipFill,
    BsCalendar2Check,
    BsLink45Deg,
    BsEyeFill,
    BsDownload
} from "react-icons/bs";
import "../css/home.css";
import "../css/list.css";
import "../css/chatbot.css";
// import { BlindsClosed } from '@mui/icons-material';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



export default function Reports() {
    const { userConfig, updateConfig, setConfig } = useConfig();

    const XState = userConfig.tgglbtn;

    const [accountsList, setAccountList] = useState([  {
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


    const [showfile, setShowfile] = useState(false);

    const [rowX, setrowX] = useState([
        {
          id: 1,
          cid: 'INIT-001',
          customerNum: 'CUST-001',
          time: '2024-10-05 10:30 AM',
          msg: 'Message sent successfully.',
          status: 'sent',
          fileName: 'invoice_001.pdf',
          view: true
        },
        {
          id: 2,
          cid: 'INIT-002',
          customerNum: 'CUST-002',
          time: '2024-10-05 11:00 AM',
          msg: 'Message received from customer.',
          status: 'received',
          fileName: 'report_002.docx',
          view: true
        },
        {
          id: 3,
          cid: 'INIT-003',
          customerNum: 'CUST-003',
          time: '2024-10-05 12:00 PM',
          msg: 'Failed to send message.',
          status: 'failed',
          fileName: '',
          view: false
        },
        {
          id: 4,
          cid: 'INIT-004',
          customerNum: 'CUST-004',
          time: '2024-10-05 01:30 PM',
          msg: 'Message received from customer.',
          status: 'received',
          fileName: 'document_004.txt',
          view: true
        },
        {
          id: 5,
          cid: 'INIT-005',
          customerNum: 'CUST-005',
          time: '2024-10-05 02:00 PM',
          msg: 'Failed to send message.',
          status: 'failed',
          fileName: 'attachment_005.zip',
          view: true
        }
     
      ]);
    const [todayOff, setTodayOff] = useState(true);
    const [imageUrl, setImageUrl] = useState();
    const [fileNameX, setFileName] = useState();




    const columns = [
        { field: 'id', headerName: 's.n', width: 50 },
        { field: 'cid', headerName: 'Initiative Number', width: 150 },
        { field: 'customerNum', headerName: 'Customer Number', width: 150 },
        { field: 'time', headerName: 'Time', width: 150 },
        { field: 'msg', headerName: 'message', width: 290 },
        {
            field: 'status',
            headerName: 'status',
            width: 120,
            cellClassName: (params) => {
                if (params.value === 'sent' || params.value === 'received') {
                    return 'sent-cell';
                } else {
                    return 'failed-cell';
                }
            }
        },
        {
            field: 'fileName',
            headerName: 'Attachment',
            width: 180,
            renderCell: (params) => (
                params.value ? (
                    <button
                        onClick={() => handleDownload(params.value)}
                        style={{
                            cursor: 'pointer',
                            color: 'blue',
                            textDecoration: 'underline',
                            border: 'none',
                            background: 'none'
                        }}
                    > <BsLink45Deg className="icon" style={{ fontSize: '15px', color: 'green', marginRight: '3px' }} />
                        {params.value}
                    </button>
                ) : null
            ),
        },
        {
            field: 'view',
            headerName: 'View',
            width: 130,
            renderCell: (params) => (
                params.value ? (
                    <button
                        onClick={() => handleview(params.value)}
                        style={{ border: 'none', background: 'none', outline: 'none' }}
                    >
                        <BsEyeFill className="icon" style={{ fontSize: '15px', color: 'green' }} />
                    </button>
                ) : null
            ),
        },
    ]






    //show img
    const handleview = (filename) => {

        setFileName(filename);
        try {
            const urlX = `FileDownloadTest?fileName=${filename}`
            setImageUrl(urlX);
            setTimeout(() => {
                setShowfile(true);
            }, 1000);
        } catch (err) {
            console.log(err)
        }

    }

    const fnctoclose = () => {
        setShowfile(false);
    }


    const fetchReports = async (cname, selected_number) => {
        setTodayOff(true);
        updateConfig(prevConfig => {
            const newConfig = { ...prevConfig };
            if ('ActiveReportsPerson' in newConfig) delete newConfig.ActiveReportsPerson;
            if ('ActiveRepoPersonName' in newConfig) delete newConfig.ActiveRepoPersonName;
            return {
                ...newConfig,
                ActiveReportsPerson: selected_number,
                ActiveRepoPersonName: cname
            };
        });

        var report_request = {
            reqtype: "GetReports",
            number: selected_number || userConfig.ActiveReportsPerson,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);

        xhtps.onload = function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    const newRows = result.messages.map((message, index) => ({

                        id: index + 1,
                        cid: selected_number,
                        customerNum: message.user_number,
                        time: message.time_m,
                        msg: message.msg,
                        status: message.msg_status || 'received messages',
                        fileName: message.fileName || '',
                        view: message.fileName || ''
                    }));
                    // console.log(newRows);
                    // Update the reports state with the received messages
                    // setrowX(newRows)
                    setTimeout(() => {
                        functionToChangeColor();
                    }, 1000);
                    // console.log(rows);
                } else {
                    console.log('No data found. Status: ' + xhtps.status);
                }
            } catch (error) {
                console.log('Error parsing response: ' + error);
            }
        };
        xhtps.send(JSON.stringify(report_request));
    };


    //LOGIC TO DOWNLOAD ON CLICK--------------------------------------------------

    const handleDownload = async (fileName) => {
        try {
            const response = await axios({
                url: `FileDownloadTest?fileName=${fileName}`,
                method: 'GET',
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const fetchReportsOnReload = async (cname, selected_number) => {
        setTodayOff(true);
        var report_request = {
            reqtype: "GetReports",
            number: selected_number || userConfig.ActiveReportsPerson,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);

        xhtps.onload = function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    const newRows = result.messages.map((message, index) => ({
                        id: index + 1,
                        cid: selected_number || userConfig.ActiveReportsPerson,
                        customerNum: message.user_number,
                        time: message.time_m,
                        msg: message.msg,
                        status: message.msg_status || 'received messages',
                        fileName: message.fileName || '',
                        view: message.fileName || ''
                    }));
                    // console.log(newRows);
                    // Update the reports state with the received messages
                    // setrowX(newRows)

                    // console.log(rows);
                } else {
                    console.log('No data found. Status: ' + xhtps.status);
                }
            } catch (error) {
                console.log('Error parsing response: ' + error);
            }
        };
        xhtps.send(JSON.stringify(report_request));
    };





    const functionToChangeColor = () => {
        const elem = document.querySelector('.MuiDataGrid-cellContent');
        if (elem) {
            if (elem && elem.textContent != 'sent') {
                elem.style.color = "red";
            }
        }
    }

    const filterDataDateWise = async (num) => {
        setTodayOff(false);
        const startDate = new Date(document.getElementById("startDate").value);
        const endDate = new Date(document.getElementById("endDate").value);

        var report_request = {
            reqtype: "dateWiseReport",
            number: num,
            startDate: startDate,
            endDate: endDate
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);

        xhtps.onload = function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    const newRows = result.messages.map((message, index) => ({
                        id: index + 1,
                        cid: num,
                        customerNum: message.user_number,
                        time: message.time_m,
                        msg: message.msg,
                        status: message.msg_status || 'received messages',
                        fileName: message.fileName || '',
                        view: message.fileName || ''
                    }));

                    // setrowX(newRows)

                    // console.log(rows);
                } else {
                    console.log('No data found. Status: ' + xhtps.status);
                }
            } catch (error) {
                console.log('Error parsing response: ' + error);
            }
        };
        xhtps.send(JSON.stringify(report_request));
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



    useEffect(() => {
        fetchHasAccount();
        fetchReportsOnReload();
        setTimeout(() => {
            functionToChangeColor();
        }, 1000);
    }, []);



    return (
        <div className="whatsapp" >
            <div className="list">
                <h3 className='select-I'><BsCheck2Circle className='Licons' /> {userConfig.ActiveRepoPersonName || 'Select Initiative'}</h3>
                <div className="searchbar">
                    <BsSearch color="gray" style={{ height: '16px', width: '16px', marginLeft: '7px' }} />
                    <input id="search" type="text" />
                </div>

                <div className="title-I" >Select Initiative</div>

                <div className="features">

                    {accountsList.map((item, index) => (
                        <li className='listI' key={index}>
                            <Link className={userConfig.ActiveReportsPerson === item.number ? "active" : ""} onClick={() => fetchReports(item.name, item.number)}>
                                <BsPersonFill style={userConfig.ActiveReportsPerson === item.number ? { color: 'rgb(42, 189, 42)' } : ""} className="Licons" />
                                <div className="libox">
                                    {item.name}
                                    <span className="span-text">{item.number}</span>
                                </div>
                            </Link>
                        </li>
                    ))}


                </div>
            </div>


            <div style={{ paddingBottom: '80px' }} className="home" color='white'>
                <div style={{ width: !XState ? '89%' : '' }} className="containerSend" >

                    {showfile ? (
                        <div className="imgpreview">
                            <div className="opr"> <BsDownload onClick={() => handleDownload(fileNameX)} className='Licons' /> <div onClick={() => fnctoclose()} className='btnclose'>X</div> </div>

                            <img className='previewImg' src={imageUrl} alt="" />


                        </div>
                    ) : (<></>)


                    }
                    <h2 style={{ color: '#4c4c4c', marginBottom: '4px' }}>  <BsFileEarmarkZipFill color='#25d366' /> Reports</h2>

                    <span style={{ color: 'gray', paddingLeft: '28px', fontSize: '13px', fontFamily: 'system-ui' }} className='.fs-16 fw-6'>You can access each initiative report individually...  </span>
                    <hr style={{ width: '95%', marginLeft: '-8px' }} />


                    <div>
                        <div style={{ width: !XState ? '85%' : '' }} className="filter">
                            <button onClick={fetchReportsOnReload} className={`Main_btn ${todayOff ? 'Tactive' : ''} `} >
                                <span className="text">Today</span>
                                <span className="svgIcon">
                                    <BsCalendar2Check className='ac_icon' />
                                </span>
                            </button>
                            <div style={{ marginRight: "20px" }}>
                                <label for="startDate">From</label>
                                <input className="inputX" type="date" id="startDate" />
                                <label for="endDate">To</label>
                                <input className="inputX" type="date" id="endDate" />


                            </div>
                            <BsFilterSquareFill className={`Licons_1 ${!todayOff ? 'Tactive' : ''} `} onClick={() => filterDataDateWise(userConfig.ActiveReportsPerson)} />
                        </div>
                        <div className='reportArea' style={{ height: '60vh', width: !XState ? '75vw' : '67.5vw' }}>
                            <DataGrid


                                className='Datagrid'
                                style={{ transition: ' width .5s ease' }}
                                columns={columns}
                                headerClassName="custom-header"
                                rows={rowX}
                                getRowClassName={(params) => 'custom-row'}
                                slots={{
                                    toolbar: CustomToolbar,
                                }}



                            />
                        </div>
                    </div>


                </div>
            </div>


        </div>

    )



};
