import React, { useEffect, useState, useRef } from 'react';
import {
    useNavigate
} from 'react-router-dom';
import { useConfig } from '../ConfigContext';
// import axios from 'axios';

import '../css/list.css';
import '../css/register.css';
import userX from "../svg/acc_dp.svg";
import userY from "../svg/agent.png";
import { BsArrowDownLeft, BsArrowUpRightCircleFill, BsExclamationTriangleFill, BsFloppy2Fill, BsLink45Deg, BsPencilSquare, BsPeopleFill, BsPersonFill, BsPersonXFill, BsQrCodeScan, BsRSquareFill, BsTrashFill, BsX, BsXSquare, BsXSquareFill } from 'react-icons/bs';
import WhatsApp from '../components/Whatsapp';

export default function SignIn() {
    const loaderRef = useRef(null);
    const { clearConfig } = useConfig();
    const { userConfig, setConfig, updateConfig } = useConfig();
    const [isTesting, setIsTesting] = useState(false);
    const [sign_in_entry, setsign_in_entry] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showList, setShowList] = useState(false);
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
    const [confirmRemove, setconfirmRemove] = useState(false);

    const navigate = useNavigate();
    const userEmail = userConfig?.email;
    // const userName = userConfig?.name;
    const [showlogout, setshowlogout] = useState(false);
    const [RgSuccessfull, setRgSuccessfull] = useState();
    const [alreadyRegister, setalreadyRegister] = useState(false);
    const [activeAcc, setActiveAcc] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editState, setEditState] = useState(null);
    const [changedName, setChangedName] = useState("");
    const [showMsgbox, setShoMsgBox] = useState(false);
    const [removeCid, setRemovedCid] = useState();
    const [cidStatusList, setCidStatusList] = useState([]);
    const [sppinOn, setSpinOn] = useState(false);
    let isScanned = false;
    const [LoaderRun, setLoaderRun] = useState(false);
    const [msg1, setmsg1] = useState(false);
    const [msg2, setmsg2] = useState(false);
    const [msg3, setmsg3] = useState(false);
    const [msg4, setmsg4] = useState(false);
    const [InputWhatsAppNum, setInputWhatsAppNum] = useState();
    //config files----------------------------------------
    const doc_ip = process.env.REACT_APP_dockerIP;
    const doc_port = process.env.REACT_APP_dockerPort;
    const Hreq = process.env.REACT_APP_Hreq;
    const container_ip = process.env.REACT_APP_container_ip;
    const container_port = process.env.REACT_APP_container_port;

    // console.log(doc_ip, doc_port, container_port, container_ip, Hreq);



    const fncAskedNum = (event) => {
        setInputWhatsAppNum(event.target.value);
        // console.log(InputWhatsAppNum);
    };

    //Logic to get register usersDetails -------------------------------------------------------------------------------------

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
                    // console.log("this is result ", result)
                    result.forEach(detail => {
                        // const containerIdSplit = detail.containerId.split('');
                        // const dname = containerIdSplit.slice(0, 3).join('');

                        accountList.push({
                            number: detail.whatsappNum,
                            status: detail.status,
                            Aname: detail.Aname,
                            cid: detail.containerId,
                        });
                    });

                    await ContainerExist(accountList);
                    // Update account list and registration status
                    setAccountList(accountList);
                    if (result.length > 0) {
                        setalreadyRegister(true);
                        setRgSuccessfull(false);
                    } else {
                        // Remove properties from userConfig

                        updateConfig(prevConfig => {
                            const newConfig = { ...prevConfig };
                            if ('whatsappNum' in newConfig) delete newConfig.whatsappNum;
                            if ('containerID' in newConfig) delete newConfig.containerID;
                            if ('sendApi' in newConfig) delete newConfig.sendApi;
                            if ('recvApi' in newConfig) delete newConfig.recvApi;
                            return {
                                ...newConfig,
                                whatsappNum: null,
                                containerID: null,
                                sendApi: null,
                                recvApi: null,
                            };
                        })
                        // console.log("config after removing file", userConfig);
                        setalreadyRegister(false);
                        setRgSuccessfull(false);
                    }
                } else {
                    console.log("No Number found, user is not registered");
                }
            } catch (error) {
                console.log('Error parsing response:', error);
            }
        };
        xhtps.send(JSON.stringify(data_Ar));
    };

    //LOGIC TO LOGOUT THE WHATSAPP ACCC-------------------------------------------

    const LogoutTheSession = async (RemoveagentCid) => {

        try {
            const response = await fetch(`${Hreq}://${container_ip}:${container_port}/router/webapp/cluster/LogoutWhatsappSession?_subHost=${RemoveagentCid}&_port=${container_port}&_path=`);
            if (response.ok) {
                return "success";
            } else {
                throw new Error("Network error");
            }
        } catch (error) {
            console.error("Error:", error.message);
            return "failed";
        }
    }
    //LOGIC TO CHECK WHEATHER THE CONTAINER EXIST OR NOT ---------------------------
    const ContainerExist = async (accountsListX) => {
        // console.log("acc list is inside the container exist function ----", accountsListX);
        const promises = accountsListX.map(async (acc) => {
            // console.log("inside the container exist function");
            var response = await fetch(Hreq + '://' + doc_ip + ':' + doc_port + '/dock/docker?type=state&container=' + acc.cid);
            var dataCid = await response.text();
            var exists = !!dataCid && dataCid === acc.cid
            if (!exists) {
                const responseX = await fetch(Hreq + '://' + doc_ip + ':' + doc_port + '/dock/docker?type=start&container=' + acc.cid);
                response = await fetch(Hreq + '://' + doc_ip + ':' + doc_port + '/dock/docker?type=state&container=' + acc.cid);
                dataCid = await response.text();
                exists = !!dataCid && dataCid === acc.cid

            }
            // console.log(acc.cid + "exists:" + exists);
            return { cid: acc.cid, exists };

        })
        const resultsCid = await Promise.all(promises);
        setCidStatusList(resultsCid);

    }
    // console.log(cidStatusList);

    // api-http://192.168.1.254:8080/dock/docker?type=state&container=router
    useEffect(() => {
        fetchHasAccount();
    }, []);


    //Agent List change 
    const handleNameChange = (event) => {
        setChangedName(event.target.value);

    };

    const sendListUpdate = async (num) => {
        // console.log(num, changedName);
        // create detailsData object---------------
        const userDetails = {
            reqtype: 'UpdateAgent',
            whatsappNumber: num,
            agentName: changedName,
        }

        // console.log(userDetails);
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        // xhtps.open("POST", "http://localhost:8080/whatsupapi/access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    // console.log(result);
                    // setRgSuccessfull(true);
                    setChangedName("");
                    // alert("updated");
                    reloadPage();
                } else {
                    console.log('Network Error ');
                }
            } catch (error) {
                // alert('server issue ')
                console.log('Server Error ' + error);
            }
        };
        xhtps.send(JSON.stringify(userDetails));
    };


    const hidemsgbox = () => {
        setShoMsgBox(false);
    }

    // Function to handle account activation




    var flag = '';

    const reloadPage = async () => {
        window.location.href = '/msg_portal/SignIn';
    }


    // var container_Id = "puppet1";
    var container_Id = InputWhatsAppNum;
    // var container_Id = "id" + Math.random().toString(16).slice(2);
    const GenerateScreenshot = async () => {
        if (container_Id && container_Id.length === 10) {
            setIsTesting(true);
            try {
                const re2 = fetch(Hreq + '://' + doc_ip + ':' + doc_port + '/dock/docker?type=reg&container=' + container_Id, {
                    mode: 'no-cors'
                });

                await new Promise(resolve => setTimeout(resolve, 5000));
                var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        const urlResponse = this.response;
                        const imageUrl = URL.createObjectURL(urlResponse);
                        setImageUrl(imageUrl);

                        setIsTesting(false);
                        setTimeout(() => {
                            if (isScanned) {
                                console.log("qr has been scanned")
                            } else {
                                clearInterval(flag);
                                stopAndRemoveContainer(container_Id);
                                alert("Qr code expired");
                                reloadPage();
                            }
                        }, 120000);
                        flag = setInterval(Login_success, 2000, container_Id);

                        // Return from the function after successful execution
                        return;
                    } else if (this.status == 500 || this.status == 404) {
                        stopAndRemoveContainer(container_Id);
                        console.error('Failed to execute code');
                        setTimeout(() => {
                            alert("Please try again: " + this.status);
                            reloadPage();
                            return;
                        }, 2000);
                        return;
                    }
                };
                xhttp.open("GET", Hreq + "://" + container_ip + ":" + container_port + "/router/webapp/cluster/generate-screenshot?_subHost=" + container_Id + "&_port=" + container_port + "&_path=", true);
                xhttp.setRequestHeader("X-Container-ip", container_ip);
                xhttp.setRequestHeader("X-Container-Port", container_port);
                xhttp.setRequestHeader("X-Docker-Port", doc_port);
                xhttp.setRequestHeader("X-Req", Hreq);
                xhttp.responseType = 'blob';
                xhttp.send();
            } catch (error) {
                // alert("Please try again");
                console.error('Network connection error:', error);
            }
        } else {
            alert("number length should be equal to 10 digit");
        }
    };

    //handle Agent edit
    const handleEdit = async (num) => {
        setEditState(num);
        // console.log(num)
        setEdit(true);

    }

    //send usersDetails to the sever when successfully register to th whatsapp----------------


    const sendUserDetails = async (num) => {
        // create detailsData object---------------
        const userDetails = {
            reqtype: 'UserRegisterDetails',
            email: userConfig.email,
            countBalance: 15,
            whatsappNumber: num,
            usedBalance: 0,
            status: "active",
            containerId: container_Id
        }

        // console.log(userDetails);
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    // console.log(result);
                    // setRgSuccessfull(true);
                    setsign_in_entry(false);
                    LoaderOn();

                } else {
                    console.log('Network Error ');
                }
            } catch (error) {
                alert('server issue ')
                console.log('Server Error ' + error);
            }
        };
        xhtps.send(JSON.stringify(userDetails));
    };



    //Login success check---------------------------
    const Login_success = async (container_id) => {
        try {

            const response = await fetch(Hreq + "://" + container_ip + ":" + container_port + "/router/webapp/cluster/Login-success?_subHost=" + container_id + "&_port=" + container_port + "&_path=", {

                method: 'GET', mode: 'cors'
            });
            if (response.ok) {
                // console.log(response);
                clearInterval(flag);
                isScanned = true;
                console.log("qr is scanned " + isScanned);
                //  function to fetch users number 
                await getuserNumber(container_id);

            } else {
                // console.log(counter + "is counter scan code before 12");
                // console.error('scan code ...............');

            }
        } catch (error) {
            stopAndRemoveContainer(container_id);
            reloadPage()
            console.error('Error during button click:', error);
        }
    };



    //Loader demo



    const LoaderOn = () => {

        setLoaderRun(true);
        setmsg1(true);

        setTimeout(() => {
            setmsg1(false);
            setmsg2(true);
        }, 20000);

        setTimeout(() => {
            setmsg2(false);
            setmsg3(true);
        }, 50000);

        setTimeout(() => {
            setmsg3(false);
            setmsg4(true);
        }, 80000);

        setTimeout(() => {
            setmsg4(false);
            setLoaderRun(false);
            setShoMsgBox(true);
            fetchHasAccount();
        }, 110000);


    };
    //fetch users number logic here----------------------------
    const getuserNumber = async (container_id) => {
        // console.log(container_Id);
        try {
            const response = await fetch(Hreq + "://" + container_ip + ":" + container_port + "/router/webapp/cluster/getuserNumber?_subHost=" + container_id + "&_port=" + container_port + "&_path=", {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user number');
            }
            const data = await response.json();
            const numU = data.userNumber;
            console.log(data);

            if (!numU) {
                alert("Did not found : not a valid whatsapp business number");
                setsign_in_entry(false);
                // await LogoutTheSession(container_id);
                await stopAndRemoveContainer(container_id);
                throw new Error('Received empty user number or not a whatsapp business number');
            }

            if (numU !== container_id) {
                setsign_in_entry(false);
                alert("You have entered the wrong WhatsApp business number. Please check your input field and try again.");
                await LogoutTheSession(container_id);
                await stopAndRemoveContainer(container_id);
                return;
            }
            const numIsAlreadyThere = accountsList.some(account => account.number === container_id);

            if (numIsAlreadyThere) {
                setsign_in_entry(false);
                functionActiveAgain(numU);
                alert("Re-registration has been performed.");
                reloadPage();
                return;
            }

            setConfig(prevConfig => ({
                ...prevConfig,
                whatsappNum: numU,
                isRegistered: true,
            }));
            setsign_in_entry(false);
            await sendUserDetails(numU);
        } catch (error) {
            setsign_in_entry(false);
            // console.error('Error during fetchUserNumber:', error);
            alert("Network Connection Error or Invalid WhatsApp Business Number.");

            // await LogoutTheSession(container_id);
            await stopAndRemoveContainer(container_id);
            reloadPage();

        }
    };


    const stopAndRemoveContainer = async (containerId) => {
        try {
            const removeResponse = await fetch(`${Hreq}://${doc_ip}:${doc_port}/dock/docker?type=remove&container=${containerId}`);
        } catch (error) {
            console.error('Error during stopAndRemoveContainer:', error);
            // alert("An error occurred while removing the container. Please try again later.");
        }
    };

    // console.log(accountsList[0])
    //function to display qr code page
    const Scan_Qr = async (num) => {
        setInputWhatsAppNum(num || '')
        setsign_in_entry(true);
        // console.log(sign_in_entry);
    };


    //function to generate acc list---------------------------
    const showAccLists = async () => {

        // setAccountList(result)
        setShowList(true);
        setconfirmRemove(false);
        setshowlogout(false);

    };
    const handleconfirmRemove = async (number, cid) => {
        setRemovedCid(cid);
        setconfirmRemove(true);
        setshowlogout(false);
        setShowList(false);

    };
    //back btn
    const CancelBack = async () => {
        setEdit(false)
        setconfirmRemove(false);
        setshowlogout(false);
        setShowList(false);
    }
    //remove agents account ---------------------------

    async function confirmRemoveagentacc() {
        const agentCid = removeCid;
        try {
            setSpinOn(true);
            //logic to show wait status ..............................
            const isRemoved = await LogoutTheSession(agentCid);
            if (isRemoved == "success") {

                // /logic to remove acc form the database______________________
                const deleteActiveaccount = async () => {
                    var deleteNum = {
                        "reqtype": "deleteActiveAccount",
                        cid: agentCid,
                    };
                    const xhtps = new XMLHttpRequest();
                    xhtps.open("POST", "access", true);

                    xhtps.onload = async function () {
                        try {
                            if (xhtps.status === 200) {
                                const result = JSON.parse(xhtps.responseText);

                                await stopAndRemoveContainer(agentCid);
                                alert('Account removed successfully');
                                setSpinOn(false);
                                reloadPage();

                            } else {
                                console.log("account deletion failed");
                            }
                        } catch (error) {
                            console.log('Error parsing response');
                        }
                    };
                    xhtps.send(JSON.stringify(deleteNum));
                };

                deleteActiveaccount();
            } else {
                alert("Initiative removal failed. Please try again later.");
                setSpinOn(false);
            }
        } catch (error) {
            console.error('Error removing account:', error);
            setSpinOn(false);
        }


    }


    //LOGIC TO DELETE ACC FORM THE DATABASE ----------------------------------- AFTER CONFIRM DELETE

    const handleDeleteOnPress = (onPressId) => {
        const deleteNumX = {
            "reqtype": "deleteActiveAccountConfirm",
            cid: onPressId,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    reloadPage();
                } else {
                    console.log("account deletion failed");
                }
            } catch (error) {
                console.log('Error parsing response');
            }
        };
        xhtps.send(JSON.stringify(deleteNumX));
    }

    //re login --------------------------------------------


    const functionActiveAgain = (onPressId) => {
        const deleteNumX = {
            "reqtype": "reRegisterNumber",
            cid: onPressId,
        };
        const xhtps = new XMLHttpRequest();
        xhtps.open("POST", "access", true);
        xhtps.onload = async function () {
            try {
                if (xhtps.status === 200) {
                    const result = JSON.parse(xhtps.responseText);
                    reloadPage();
                } else {
                    console.log("account deletion failed");
                }
            } catch (error) {
                console.log('Error parsing response');
            }
        };
        xhtps.send(JSON.stringify(deleteNumX));
    }


    const logoutAcc = async () => {
        setshowlogout(true);
        setShowList(false);
        setconfirmRemove(false);
        // alert('site is on progress please wait')


    };


    // useEffect(() => {
    //     api_on();

    // }, [0]);
    // const api_on = async () => {
    //     const sendApi1 = userConfig.sendApi;
    //     const send_api1 =
    //         `Method: POST\n \nApi: \t'${sendApi1}'\n\nDataType: FormData\n\nHeaders: {
    //         'Content-Type': 'multipart/form-data',
    //       },`

    //     const recvApi2 = userConfig.recvApi;
    //     const recv_api2 = `Method: POST
    //      Api: ${recvApi2}

    //      FormData:
    //      {
    //        "message": "hello How are You",
    //        "number": "9946377362"
    //      }`

    //     setShowList(false);
    //     setconfirmRemove(false);
    //     setshowlogout(false);
    //     setApiLink1(send_api1);
    //     setApiLink2(recv_api2);

    // }



    const logoutAccount = async () => {
        clearConfig();
        alert('Logout successfully');
        navigate("/");


    }

    return (
        <div className="Signin">
            {sign_in_entry == true ? (
                <div className="containerSI">

                    {isTesting ? (
                        <div className={'testing cp1'}>
                            <p>Please wait while we are fetching QR to scan... </p>
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div>
                            {imageUrl ? null : (
                                <div className='cp1'>
                                    <input placeholder='Whatsapp business number' className='AskedNumber' onChange={fncAskedNum} value={InputWhatsAppNum} type="number" />
                                    <button id="scanQR" onClick={GenerateScreenshot} className="Main_btn">
                                        <span className="text">Scan Q-R Code</span>
                                        <span className="svgIcon">
                                            <BsQrCodeScan className='ac_icon' />
                                        </span>
                                    </button>

                                </div>
                            )}
                        </div>
                    )}

                    {imageUrl && !isTesting && (
                        <div className="screen">
                            <div className='QRcontainer'>

                                <p>Scan Whatsapp QR Code</p>



                                {/* <img className='qrcode' src={imageUrl} alt="Q-R Code" /> */}
                                <img style={{
                                    backgroundImage: `url(${imageUrl})`, backgroundSize: '221%',
                                    backgroundPosition: '95%',
                                    backgroundPositionY: '11%',
                                    backgroundRepeat: 'no-repeat'
                                }} className='qrcode' />
                            </div>
                            <div style={{ marginTop: "60px" }} className="bouncing-loader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    )}
                </div>

            ) : (

                <div className='container'>
                    <div className="signInAccount">
                        {showMsgbox ? (
                            <div className="p successRegistration">
                                Your registration is a success! Enjoy your account with <span style={{ color: '#0db7e1', fontSize: '24px' }}> 15 </span> test messages. Upgrade now for unlimited messaging.
                                <button onClick={hidemsgbox}>Ok</button>
                            </div>) :
                            (<div></div>)
                        }

                        {LoaderRun ? (
                            <div ref={loaderRef} className='loaderX' tabIndex={0}>
                                <div className="bouncing-loader">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {msg1 ?
                                    (<span className='Loader-msg'>Activation of your account is in progress  ...</span>
                                    ) : msg2 ?
                                        (<div className='Loader-msg'>Please don't refresh ...</div>) : msg3 ? (<div className='Loader-msg'>This process won't take long  ...</div>) : msg4 ? (<div className='Loader-msg'>Almost there  ...</div>) : (<div></div>)
                                }

                            </div>

                        ) : (<div> </div>)
                        }

                        {LoaderRun && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, .1)',
                                    zIndex: 9998,
                                }}
                            />
                        )}

                        <div id={showMsgbox ? 'visibleLess' : ''} className='left_Acc' >

                            {RgSuccessfull ? (
                                <div className='p'>

                                    <div className="title">
                                        Account Actions..
                                    </div>
                                    <ul>
                                        <li>Click the "Remove Account" button to remove your account.</li>
                                        <li>Click on the "Active Accounts" button to view your active accounts.</li>
                                        <li>Click the "Register" button to re-register your account.</li>
                                        <li>In case of any account issues, you can re-register your account.</li>
                                    </ul>



                                    <span style={{ color: '#0e8501', fontSize: '19px', marginLeft: '12px' }}>Congratulations !  </span>
                                    <br />
                                    <p className='p tp' style={{ fontSize: '12px', color: '#0bad81' }} >
                                        Your registration is a success! Enjoy your account with <span style={{ color: '#0db7e1', fontSize: '24px' }}> 15 </span> test messages. Upgrade now for unlimited messaging. Visit your dashboard to explore our plans and choose the best fit for you.
                                    </p>
                                    <button onClick={Scan_Qr} style={{ width: '130px' }} className="Main_btn">
                                        <span className="text">Re register</span>
                                        <span className="svgIcon">
                                            <BsPersonFill className='ac_icon' />
                                        </span>
                                    </button>
                                </div>
                            ) :
                                alreadyRegister ? (
                                    <div className='p'>
                                        <div className="title">
                                            Account Actions..
                                        </div>
                                        <ul>
                                            <li>Click the "Remove Account" button to remove your account.</li>
                                            <li>Click on the "Active Accounts" button to view your active accounts.</li>
                                            <li>Click the "Register" button to re-register your account.</li>
                                            <li>In case of any account issues, you can re-register your account.</li>
                                        </ul>
                                        <p className='p tp' style={{ fontSize: '12px', color: '#0bad81', marginTop: '45px' }} >
                                            registered account !
                                        </p>
                                        <button style={{ width: '190px' }} onClick={Scan_Qr} className="Main_btn">
                                            <span className="text">Register New Account</span>
                                            <span style={{ width: '26%' }} className="svgIcon">
                                                <BsPersonFill className='ac_icon' />
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className='p'>
                                        <div className="title">
                                            Account Actions..
                                        </div>
                                        <ul>
                                            <li>Click the "Remove Account" button to remove your account.</li>
                                            <li>Click on the "Active Accounts" button to view your active accounts.</li>
                                            <li>Click the "Register" button to re-register your account.</li>
                                            <li>In case of any account issues, you can re-register your account.</li>
                                        </ul>
                                        <p className='p tp' style={{ fontSize: '12px', color: '#0bad81', marginTop: '45px' }} >
                                            It looks like you haven't registered your Whatsapp account yet!
                                        </p>
                                        <button style={{ width: '130px' }} onClick={Scan_Qr} className="Main_btn">
                                            <span className="text">Register</span>
                                            <span className="svgIcon">
                                                <BsPersonFill className='ac_icon' />
                                            </span>
                                        </button>
                                    </div>

                                )


                            }


                        </div>

                        <div id={showMsgbox ? 'visibleLess2' : ''} className="right_Acc">
                            <img className='img-profile' src={userX} alt="img" />
                            {/* <span className='message'  >{userName}  </span> */}
                            <span className='message m-e em'><BsLink45Deg className='eIcon' />{userEmail}</span>

                            <div className="sign_Profile">
                                <div className='profile-section'>
                                    <button onClick={showAccLists} className="Main_btn">
                                        <span className="text">Accounts</span>
                                        <span className="svgIcon">
                                            <BsPeopleFill className='ac_icon' />
                                        </span>
                                    </button>



                                    {/* <button onClick={api_on} className="Main_btn">
                                        <span className="text">Api</span>
                                        <span className="svgIcon">
                                            <BsCloudFog2Fill className='ac_icon' />
                                        </span>
                                    </button> */}
                                    <button onClick={logoutAcc} className="Main_btn">
                                        <span className="text">Logout</span>
                                        <span className="svgIcon">
                                            <BsArrowDownLeft className='ac_icon' />
                                        </span>
                                    </button>



                                </div>

                                {
                                    showlogout ? (
                                        <div className='hidden_box'>
                                            <div className="confirmWindow YesC">
                                                <span className='m-e'>Are You sure you want to logout? </span>
                                                <div style={{ display: 'flex' }}>
                                                    <button onClick={logoutAccount} className="Main_btn">
                                                        <span className="text">Yes</span>
                                                        <span className="svgIcon">
                                                            <BsArrowUpRightCircleFill className='ac_icon' />
                                                        </span>
                                                    </button>
                                                    <button onClick={CancelBack} className="Main_btn">
                                                        <span className="text">No</span>
                                                        <span className="svgIcon">
                                                            <BsX className='ac_icon' />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>



                                    ) : confirmRemove ? (
                                        <div className='hidden_box'>
                                            <div className="confirmWindow">
                                                <span className='m-e'>Are You sure you want to remove account? </span>
                                                <div style={{ display: 'flex' }}>

                                                    <button onClick={confirmRemoveagentacc} className="Main_btn">
                                                        <span className="text">Confirm</span>
                                                        <span className="svgIcon">
                                                            <BsArrowUpRightCircleFill className='ac_icon' />
                                                        </span>
                                                    </button>
                                                    <button onClick={CancelBack} className="Main_btn">
                                                        <span className="text">Back</span>
                                                        <span className="svgIcon">
                                                            <BsX className='ac_icon' />
                                                        </span>
                                                    </button>

                                                </div>
                                                {
                                                    sppinOn ? (<div className="spinner"></div>) : (<div>

                                                    </div>)
                                                }

                                            </div>

                                        </div>) :

                                        (
                                            <div className='hidden_box1'>
                                                <div id="wwe">
                                                    {accountsList.map((acc, index) => {
                                                        const isCtrExist = cidStatusList.find(status => status.cid === acc.cid && status.exists);

                                                        const logoutStatus = acc.status == "active" ? true : false;

                                                        return (
                                                            <div className={`acclist ${activeAcc && activeAcc.cid === acc.cid && 'activeAcccls'}`} key={index}>
                                                                {
                                                                    isCtrExist && logoutStatus ? (
                                                                        <>
                                                                            {/* {userConfig.ActiveInitiativeNum === acc.number ? <div class="revolvingElement"></div> : <div></div>} */}

                                                                            <span className='indexList'>{index + 1}</span>
                                                                            {!edit || editState !== acc.number ? (
                                                                                <>
                                                                                    <div className='L-details'>
                                                                                        <div className='L-det'>
                                                                                            <span className='acc_Num'>{acc.number} !</span>
                                                                                            <span className='acc_Name'>{acc.Aname || 'Initiative name'}</span>
                                                                                        </div>
                                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                                            <img src={userY} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="btnEditAgent">
                                                                                        <button onClick={() => handleconfirmRemove(acc.number, acc.cid)} className="Main_btn">
                                                                                            <span className="text">Remove</span>
                                                                                            <span className="svgIcon">
                                                                                                <BsPersonXFill className='ac_icon' />
                                                                                            </span>
                                                                                        </button>

                                                                                        <button onClick={() => handleEdit(acc.number)} className="Main_btn">
                                                                                            <span className="text">Edit</span>
                                                                                            <span className="svgIcon">
                                                                                                <BsPencilSquare className='ac_icon' />
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <div>
                                                                                    <label className="labul" htmlFor="">Initiative title</label>
                                                                                    <div className='editorX'>
                                                                                        <input
                                                                                            className="nameInput"
                                                                                            placeholder="Enter name"
                                                                                            type="text"
                                                                                            value={changedName}
                                                                                            onChange={handleNameChange}
                                                                                        />
                                                                                        <button onClick={() => sendListUpdate(acc.number)}>
                                                                                            <BsFloppy2Fill className='Licons' />
                                                                                        </button>
                                                                                        <button onClick={CancelBack}>
                                                                                            <BsXSquareFill className='Licons' />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    ) :
                                                                        !logoutStatus ? (
                                                                            <>
                                                                                {/* Render elements when container does not exist */}
                                                                                {/* <div class="revolvingElement"></div> */}
                                                                                <span className='indexList'>{index + 1}</span>
                                                                                <div className='L-details'>
                                                                                    <div className='L-det'>
                                                                                        <span className='errorCid'>Initiative has been logged out. Press Delete or Re-register</span>
                                                                                        <span className='acc_Num'>{acc.number} !</span>
                                                                                        <span className='acc_Name'>{acc.Aname || 'Initiative name'}</span>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                                        <BsExclamationTriangleFill className='Wicons' />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="btnEditAgent">
                                                                                    <button style={{ width: "40px" }} onClick={() => handleDeleteOnPress(acc.cid)} className="Main_btn">
                                                                                        <span className="svgIcon">
                                                                                            <BsTrashFill className='ac_icon' />
                                                                                        </span>
                                                                                    </button>
                                                                                    <button style={{ width: "40px" }} onClick={() => Scan_Qr(acc.cid)} className="Main_btn">

                                                                                        <span className="svgIcon">
                                                                                            <BsRSquareFill className='ac_icon' />
                                                                                        </span>
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                            : (
                                                                                <>
                                                                                    {/* Render elements when container does not exist */}
                                                                                    {/* <div class="revolvingElement"></div> */}
                                                                                    <span className='indexList'>{index + 1}</span>
                                                                                    <div className='L-details'>
                                                                                        <div className='L-det'>
                                                                                            <span className='errorCid'>Initiative Connection Lost! Server Error..</span>
                                                                                            <span className='acc_Num'>{acc.number} !</span>
                                                                                            <span className='acc_Name'>{acc.Aname || 'Initiative name'}</span>
                                                                                        </div>
                                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                                            <BsExclamationTriangleFill className='Wicons' />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="btnEditAgent">
                                                                                        <button onClick={() => handleconfirmRemove(acc.number, acc.cid)} className="Main_btn">
                                                                                            <span className="text">Remove</span>
                                                                                            <span className="svgIcon">
                                                                                                <BsPersonXFill className='ac_icon' />
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                }
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>)




                                }


                            </div>



                        </div>


                    </div>




                </div >


            )
            }

        </div >
    );

}


