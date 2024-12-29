import React from 'react'
import './userInfo.css'

const UserInfo = ({ data }) => {

    return (
        <div className="container">
            <div className="inner-container">
                <div className='flex'>
                    <span className='info'>Name:</span><p className='inner-info'>{data?.name}</p>
                </div>
                <div className='flex'>
                    <span className='info'>Email:</span><p className='inner-info'>{data?.email}</p>
                </div>
                <div className='flex'>
                    <span className='info'>Attendance:</span><p className='inner-info'>{data?.attendance}%</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
