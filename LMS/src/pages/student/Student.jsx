import { useContext } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyContext from "../../context/myContext";

import StudentTable from '../../components/userInfoTable/StudentTable';
import UserInfo from '../../components/userInfo/UserInfo';

const Student = () => {
    const user = JSON.parse(localStorage.getItem("users"));

    const { getAllUser } = useContext(MyContext);

    return (
        <>
            <div className='display-title-container'>
                <p className='display-title-head'>Student Info</p>
            </div>
            <div className='display-mid'>
                {user?.role === 'Student' &&
                    <UserInfo data={user} />
                }
            </div>
            {(user?.role === 'Teacher' || user?.role === 'Admin') &&
                <StudentTable getAllUser={getAllUser} Skeleton={Skeleton} />
            }
        </>
    )
}

export default Student
