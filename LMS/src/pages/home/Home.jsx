import React, { lazy } from 'react'

import { Outlet } from 'react-router-dom'
import './Home.css'

import WelcomeImageBG from '../../assets/images/WelcomeImage.png'

const Navbar = lazy(() => import("../../components/navbar/Navbar"));
const Sidebar = lazy(() => import("../../components/sidebar/Sidebar"))

const Home = () => {
    return (
        <>
            <div className="h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${WelcomeImageBG})` }}>
                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <div className='display-container'>
                        <Outlet />
                    </div>
                </div >
            </div>
        </>
    )
}

export default Home
