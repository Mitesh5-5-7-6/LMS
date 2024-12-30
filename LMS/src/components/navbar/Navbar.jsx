import React from 'react'
import './Navbar.css'

import SchoolLogo from '../../assets/images/SchoolLogo.png'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("users"));

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className='px-5 h-19 w-full fixed flex justify-between flex align-center nav-container'>
            <div className='flex align-center'>
                <img src={SchoolLogo} alt="" className='pr-3 w-12 h-12' />
            </div>

            <div className="pt-1.5">
                {user ? (
                    <p className="user">{user.role}</p>
                ) : (
                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>

        </div>
    )
}

export default Navbar
