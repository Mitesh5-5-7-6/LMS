import { useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";

import UserInfo from '../../components/userInfo/UserInfo';
import TeacherTable from '../../components/userInfoTable/TeacherTable';

const Teacher = () => {

    const user = JSON.parse(localStorage.getItem("users"));

    const { getAllUser } = useContext(MyContext);
    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Teacher Info</p>
            </div>
            <div className='display-mid'>
                {user?.role === 'Teacher' &&
                    <UserInfo data={user} />
                }
            </div>
            {user?.role === 'Admin' &&
                <TeacherTable getAllUser={getAllUser} Skeleton={Skeleton} />
            }
        </>
    )
}

export default Teacher
