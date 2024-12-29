import { Outlet } from 'react-router-dom'
import './Home.css'

import WelcomeImageBG from '../../assets/images/WelcomeImage.png'

import Navbar from '../../components/navbar/Navbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'

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
