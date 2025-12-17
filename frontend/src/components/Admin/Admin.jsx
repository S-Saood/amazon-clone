import React from 'react'
import './Admin.css'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import GridViewIcon from '@mui/icons-material/GridView';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';

function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-sub-container">
        <div className="admin-left">
          <div className="admin-left-top">Amazon admin</div>
          <div className="admin-left-middle">
            <span><OtherHousesIcon/><p>Dashboard</p></span>
            <span> <GridViewIcon/><p>Orders</p></span>
            <span><PaymentsIcon/><p>Payments</p></span>
            <span><SupportAgentIcon/><p>Customers</p></span>
            <span><ReportOffIcon/><p>Report</p></span>
            <span><EqualizerIcon/><p>Statistic</p></span>
            <span><NotificationsIcon/><p>Notification</p></span>
            <span><HelpIcon/><p>Help</p></span>
            <span><SettingsIcon/><p>Settings</p></span>
          </div>
          <div className="admin-left-bottom">
            Documentation
          </div>
        </div>
        <div className="admin-right">
          
          <div className="admin-right-top">
          <h3>Admin controls and guardrails</h3>
          <p>Use admin controls and guardrails to configure application wide settings to manages and user conversation</p>          </div>

          <div className="admin-right-middle"></div>
          <div className="admin-right-bottom"></div>
        </div>
      </div>
    </div>
  )
}

export default Admin