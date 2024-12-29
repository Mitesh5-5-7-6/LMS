import React, { useState } from 'react'
import EditPopup from '../pop-up/EditPopUp';
import DeletePopup from '../pop-up/DeletePopup';

const StudentTable = ({ getAllUser, Skeleton }) => {

    const [editStudent, setEditStudent] = useState(false)
    const [deleteStudent, setDeleteStudent] = useState(false)

    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleEditClick = (id) => {
        setEditStudent(true);
        setSelectedStudent(id);
    };

    const handleDeleteClick = (data) => {
        setDeleteStudent(true);
        setSelectedStudent(data);
    };

    const closePopUp = () => {
        setEditStudent(null);
        setDeleteStudent(null);
    };

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className='table-container'>
                        <p className="text-[color:var(--white)] text-[20px]">Student Table</p>
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
                                    .filter((item) => item?.role === "Student")
                                    .map((item, index) => {
                                        const { id, name, email, role, attendance } = item;
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

            <EditPopup state={editStudent} onClose={closePopUp} id={selectedStudent} />
            <DeletePopup state={deleteStudent} onClose={closePopUp} data={selectedStudent} />
        </>
    )
}

export default StudentTable