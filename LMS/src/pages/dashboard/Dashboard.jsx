import { useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";

import AdminTable from '../../components/userInfoTable/AdminTable';

const Dashboard = () => {

    const { getAllUser } = useContext(MyContext);

    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Dashboard</p>
            </div>

            <div className='display-mid'>
                <AdminTable getAllUser={getAllUser} Skeleton={Skeleton} />
            </div >

        </>
    )
}

export default Dashboard
