import React, { lazy, Suspense, useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";
import Loader from '../../components/loader/Loader';

const AdminTable = lazy(() => import('../../components/userInfoTable/AdminTable'));

const Dashboard = () => {

    const { getAllUser } = useContext(MyContext);

    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Dashboard</p>
            </div>

            <div className='display-mid'>
                <Suspense fallback={<Loader />}>
                    <AdminTable getAllUser={getAllUser} Skeleton={Skeleton} />
                </Suspense>
            </div >

        </>
    )
}

export default Dashboard
