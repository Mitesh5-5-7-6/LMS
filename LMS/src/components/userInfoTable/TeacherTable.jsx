import React, { useState } from 'react'
import EditPopup from '../pop-up/EditPopUp';
import DeletePopup from '../pop-up/DeletePopup';

const TeacherTable = ({ getAllUser, Skeleton }) => {

    const [editTeacher, setEditTeacher] = useState(false)
    const [deleteTeacher, setDeleteTeacher] = useState(false)

    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleEditClick = (id) => {
        setEditTeacher(true);
        setSelectedTeacher(id);
    };

    const handleDeleteClick = (data) => {
        setDeleteTeacher(true);
        setSelectedTeacher(data);
    };

    const closePopUp = () => {
        setEditTeacher(null);
        setDeleteTeacher(null);
    };

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className='table-container'>
                        <p className="text-[color:var(--white)] text-[20px]">Teacher Table</p>
                        <table className='table' cellSpacing={0} >
                            <thead>
                                <tr className='table-head'>
                                    <th className='table-col-25'>S.No</th>
                                    <th className='table-col-50'>Name</th>
                                    <th className='table-col-50'>Email</th>
                                    <th>Role</th>
                                    <th>Attendance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUser
                                    .filter((item) => item?.role === "Teacher")
                                    .map((item, index) => {
                                        const { name, email, role, attendance } = item;
                                        return (
                                            <tr key={index}>
                                                <td className='table-col-25'>{index + 1}</td>
                                                <td className='table-col-50'>{name || <Skeleton />}</td>
                                                <td className='table-col-50'>{email || <Skeleton />}</td>
                                                <td>{role || <Skeleton />}</td>
                                                <td>{attendance}%</td>
                                                <td>
                                                    <div className='flex float-right'>
                                                        <button
                                                            className="table-edit-btn bg-[var(--color-2)]"
                                                            onClick={() => handleEditClick(item?.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="table-delete-btn bg-[var(--color-2)]"
                                                            onClick={() => handleDeleteClick(item)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <EditPopup state={editTeacher} onClose={closePopUp} id={selectedTeacher} />
            <DeletePopup state={deleteTeacher} onClose={closePopUp} data={selectedTeacher} />
        </>
    )
}

export default TeacherTable
