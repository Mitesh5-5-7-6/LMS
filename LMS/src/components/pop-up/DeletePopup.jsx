import React, { useContext } from 'react'
import toast from "react-hot-toast";
import './popup.css'

import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from '../../FirebaseFile/firebase'
import myContext from '../../context/myContext';

const DeletePopup = ({ state, onClose, data }) => {

    const context = useContext(myContext);
    const { loading, setLoading, getAllUserFunction } = context;

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'users', data?.id))
            toast.success('Deleted successfully')
            getAllUserFunction();
            setLoading(false)
            onClose();
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            {state && (
                <div className='popup-container'>
                    <div className="popup-inner-container">
                        <div className="popup">
                            <div className="popup-form-container">

                                <p className="popup-delete-text">Ary you sure delete {data?.name}</p>

                                <div className='popup-button-container flex'>
                                    <button className='popup-btn popup-cancel-btn' onClick={onClose}>Cancel</button>
                                    <button className='popup-btn popup-edit-btn' onClick={handleDelete}>
                                        {loading ? "Delete..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeletePopup
