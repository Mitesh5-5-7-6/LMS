import React, { lazy, Suspense, useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";

const UserInfo = lazy(() => import("../../components/userInfo/UserInfo"));
const StudentTable = lazy(() => import("../../components/userInfoTable/StudentTable"));

const Student = () => {
    const user = JSON.parse(localStorage.getItem("users"));

    const { getAllUser } = useContext(MyContext);

    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Student Info</p>
            </div>
            <div className='display-mid'>
                <Suspense fallback={<div>Loading...</div>}>
                    {user?.role === 'Student' &&
                        <UserInfo data={user} />
                    }
                </Suspense>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {(user?.role === 'Teacher' || user?.role === 'Admin') &&
                    <StudentTable getAllUser={getAllUser} Skeleton={Skeleton} />
                }
            </Suspense>
        </>
    )
}

export default Student
