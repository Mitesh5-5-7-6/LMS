import React, { useState } from 'react'
import EditPopup from '../pop-up/EditPopUp';
import DeletePopup from '../pop-up/DeletePopup';

const AdminTable = ({ getAllUser, Skeleton }) => {

    const [editAdmin, setEditAdmin] = useState(false)
    const [deleteAdmin, setDeleteAdmin] = useState(false)

    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleEditClick = (id) => {
        setEditAdmin(true);
        setSelectedAdmin(id);
    };

    const handleDeleteClick = (data) => {
        setDeleteAdmin(true);
        setSelectedAdmin(data);
    };

    const closePopUp = () => {
        setEditAdmin(null);
        setDeleteAdmin(null);
    };

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className='table-container'>
                        <p className="text-[color:var(--white)] text-[20px]">Admin Table</p>
                        <table className='table' cellSpacing={0} >
                            <thead>
                                <tr className='table-head'>
                                    <th className='table-col-25'>S.No</th>
                                    <th className='table-col-50'>Name</th>
                                    <th className='table-col-50'>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUser
                                    .filter((item) => item?.role === "Admin")
                                    .map((item, index) => {
                                        const { id, name, email, role } = item;
                                        return (
                                            <tr key={index}>
                                                <td className='table-col-25'>{index + 1}</td>
                                                <td className='table-col-50'>{name || <Skeleton />}</td>
                                                <td className='table-col-50'>{email || <Skeleton />}</td>
                                                <td>{role || <Skeleton />}</td>
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
            <EditPopup state={editAdmin} onClose={closePopUp} id={selectedAdmin} />
            <DeletePopup state={deleteAdmin} onClose={closePopUp} data={selectedAdmin} />
        </>
    )
}

export default AdminTable
