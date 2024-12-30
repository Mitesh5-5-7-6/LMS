import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import './Sidebar.css';

import ShrinkIcon from '../../assets/icons/shrink_icon.svg'
import DashboardIcon from '../../assets/icons/dashboard_icon.svg'
import LogoutIcon from '../../assets/icons/logout_icon.svg'

const Sidebar = () => {

    const navigate = useNavigate()

    const role = JSON.parse(localStorage.getItem("users"));

    const roleBasedRoutes = {
        Admin: [
            { path: "/home/dashboard", name: "Dashboard", icon: DashboardIcon },
            { path: "/home/student", name: "Student", icon: DashboardIcon },
            { path: "/home/teacher", name: "Teacher", icon: DashboardIcon },
        ],
        Student: [
            { path: "/home/student", name: "Student", icon: DashboardIcon },
        ],
        Teacher: [
            { path: "/home/student", name: "Student", icon: DashboardIcon },
            { path: "/home/teacher", name: "Teacher", icon: DashboardIcon },
        ],
    };

    const sidebarBtns = role?.role ? roleBasedRoutes[role.role] || [] : [];

    // Used to shrink the side bar
    const [toggleShrink, setTooggleShrink] = useState(false)
    const handleShrink = () => {
        setTooggleShrink(!toggleShrink)
    }

    const handleLogOut = () => {
        sessionStorage.clear()
        navigate('/login')
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

            <div className='sidebar-button cursor-pointer' onClick={handleLogOut}>
                <div className='flex center-v'>
                    <img src={LogoutIcon} alt="Icon" className='sidebar-button-logo' />
                    {!toggleShrink && <p className='sidebar-button-label'>Logout</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
