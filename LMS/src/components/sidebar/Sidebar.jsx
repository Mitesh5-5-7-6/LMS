import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.css';

import ShrinkIcon from '../../assets/icons/shrink_icon.svg'
import DashboardIcon from '../../assets/icons/dashboard_icon.svg'

const Sidebar = () => {

    const role = JSON.parse(localStorage.getItem("users"));

    const roleBasedRoutes = {
        Admin: [
            { path: "/dashboard", name: "Dashboard", icon: DashboardIcon },
            { path: "/student", name: "Student", icon: DashboardIcon },
            { path: "/teacher", name: "Teacher", icon: DashboardIcon },
        ],
        Student: [
            { path: "/student", name: "Student", icon: DashboardIcon },
        ],
        Teacher: [
            { path: "/student", name: "Student", icon: DashboardIcon },
            { path: "/teacher", name: "Teacher", icon: DashboardIcon },
        ],
    };

    const sidebarBtns = role?.role ? roleBasedRoutes[role.role] || [] : [];



    // Used to shrink the side bar
    const [toggleShrink, setTooggleShrink] = useState(false)
    const handleShrink = () => {
        setTooggleShrink(!toggleShrink)
    }

    return (
        <div className='sidebar-container' id={toggleShrink ? '' : 'shrink-false'}>

            <div className='flex head-container text-center'>
                {!toggleShrink && <p className='side-head'>Home</p>}
                <img src={ShrinkIcon} alt="" id={toggleShrink ? 'shrink-btn-true' : ''} onClick={handleShrink} />
            </div>

            <div className='side-scroll'>
                {
                    sidebarBtns.map((btn, index) => (
                        <NavLink to={btn.path} className='navlink' key={index}>
                            <div className='sidebar-button'>
                                <div className='flex align-center'>
                                    <img src={btn.icon} alt="Icon" className='sidebar-button-logo' />
                                    {!toggleShrink && <p className='sidebar-button-label'>{btn.name}</p>}
                                </div>
                            </div>
                        </NavLink>
                    ))
                }
            </div>

        </div>
    )
}

export default Sidebar
