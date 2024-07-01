import React, {useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Cards from './OverviewCards';
import axios from 'axios';
import  "./AdminDashboard.css";

const AdminDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div>
  <Header OpenSidebar={OpenSidebar}/>
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
  <Cards />
     </div>
  )
}

export default AdminDashboard;
