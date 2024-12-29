import './Navbar.css'

import SchoolLogo from '../../assets/images/SchoolLogo.png'


const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("users"));

    return (
        <div className='px-5 h-19 w-full fixed flex justify-between flex align-center nav-container'>
            <div className='flex align-center'>
                <img src={SchoolLogo} alt="" className='pr-3 w-12 h-12' />
            </div>

            <div className='pt-1.5'>
                <p className='user'>{user?.role} - {user?.name}</p>
            </div>

        </div>
    )
}

export default Navbar
