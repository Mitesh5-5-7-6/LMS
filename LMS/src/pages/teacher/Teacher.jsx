import React, { lazy, Suspense, useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";
import Loader from '../../components/loader/Loader';

const UserInfo = lazy(() => import("../../components/userInfo/UserInfo"));
const TeacherTable = lazy(() => import("../../components/userInfoTable/TeacherTable"));

const Teacher = () => {

    const user = JSON.parse(localStorage.getItem("users"));

    const { getAllUser } = useContext(MyContext);
    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Teacher Info</p>
            </div>
            <div className='display-mid'>
                <Suspense fallback={<Loader />}>
                    {user?.role === 'Teacher' &&
                        <UserInfo data={user} />
                    }
                </Suspense>
            </div>
            <Suspense fallback={<Loader />}>
                {user?.role === 'Admin' &&
                    <TeacherTable getAllUser={getAllUser} Skeleton={Skeleton} />
                }
            </Suspense>
        </>
    )
}

export default Teacher
