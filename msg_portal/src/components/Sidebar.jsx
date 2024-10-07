import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vinsmoke from "../img/metaphor.svg";
import vinsmoke2 from "../img/sampMM2.png";
import { useConfig } from '../ConfigContext';


import {

  BsPersonFillGear,
  BsCloudHaze2Fill,
  BsHouseFill,
  BsFileEarmarkZipFill,
  BsSend,
  BsSendFill,
  BsChatQuoteFill,
  BsFolder,
  BsTools,
  BsPersonAdd,
} from "react-icons/bs";

function Sidebar({ isExpanded }) {
  const { userConfig, updateConfig } = useConfig();
  const XState = userConfig.tgglbtn;

  const navigate = useNavigate();

  const isActive = (route) => {
    return window.location.pathname === route;
  };
  return (
    <div className={`sidebar ${XState ? 'expanded' : 'collapsed'}`}>
      <div className="sidebarHead" >
        <div>
          {XState ? (
            <>
              <p style={{ color:'gray'  ,fontSize: '20px', fontFamily: 'system-ui', fontWeight: '700', width: '100%', textAlign: 'center' }}>Msg portal</p>
              <img
                src={vinsmoke} />
            </>
          ) : (
            <img className="mm2"
              src={vinsmoke}
            />

          )}
        </div>
      </div>
      <ul>
        {/* <li>
          <Link className={isActive("/") ? "active" : ""} to="/">
            <BsBarChartLine
              style={{ color: isActive("/") ? "rgb(0 239 98)" : "rgb(54 179 233)" }}
              className="icon"
            />
            <span className="sidebarText">Dashboard</span>
          </Link>
        </li> */}
        <li>
          <Link className={isActive("/webui/Whatsapp") ? "active" : ""} to="/Whatsapp">
            <BsHouseFill
              style={{ color: isActive("/webui/Whatsapp") ? "rgb(0 185 69)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className={isActive("/webui/SignIn") ? "active" : ""} to="/SignIn">
            <BsPersonFillGear
              style={{ color: isActive("/webui/SignIn") ? "rgb(9 187 75)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Account manager</span>
          </Link>
        </li>
        {/* <li>
          <Link className={isActive("/AgentManager") ? "active" : ""} to="/AgentManager">
            <BsPersonAdd
              style={{
                color: isActive("/AgentManager") ? "rgb(0 239 98)" : "rgb(54 179 233)",
              }}
              className="icon"
            />
            <span className="sidebarText">Agent manager</span>
          </Link>
        </li> */}

        <li>
          <Link className={isActive("/webui/Api") ? "active" : ""} to="/Api">
            <BsCloudHaze2Fill
              style={{ color: isActive("/webui/Api") ? "rgb(9 187 75)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Api</span>
          </Link>
        </li>
        <li>
          <Link className={isActive("/webui/Reports") ? "active" : ""} to="/Reports">
            <BsFileEarmarkZipFill
              style={{ color: isActive("/webui/Reports") ? "rgb(0 185 69)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Reports</span>
          </Link>
        </li>
        {/* <li>
          <Link className={isActive("/Bulk") ? "active" : ""} to="/Bulk">
            <BsChatQuoteFill
              style={{ color: isActive("/Bulk") ? "rgb(0 239 98)" : "rgb(54 179 233)" }}
              className="icon"
            />
            <span className="sidebarText">Bulk messaging</span>
          </Link>
        </li>*/}
        <li>
          <Link className={isActive("/webui/Send") ? "active" : ""} to="/Send">
            <BsSendFill
              style={{ color: isActive("/webui/Send") ? "rgb(0 185 69)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Test Send </span>
          </Link>
        </li>
        <li>
          <Link className={isActive("/webui/Bulk") ? "active" : ""} to="/Bulk">
            <BsChatQuoteFill
              style={{ color: isActive("/webui/Bulk") ? "rgb(0 185 69)" : "rgb(34 161 215 / 91%)" }}
              className="icon"
            />
            <span className="sidebarText" style={{ display: XState ? 'flex' : 'none' }}>Bulk messaging</span>
          </Link>
        </li>
        <li>
          <Link className={isActive("/File") ? "active" : ""} to="/File">
            <BsFolder
              style={{ color: isActive("/File") ? "rgb(0 239 98)" : "rgb(54 179 233)" }}
              className="icon"
            />
            <span className="sidebarText">File manager</span>
          </Link>
        </li>
        <li>
          <Link className={isActive("/Tools") ? "active" : ""} to="/Tools">
            <BsTools
              style={{ color: isActive("/Tools") ? "rgb(0 239 98)" : "rgb(54 179 233)" }}
              className="icon"
            />
            <span className="sidebarText">Tools</span>
          </Link>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;