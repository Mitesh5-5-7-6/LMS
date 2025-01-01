import React, { useContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import './popup.css';

import { Formik, Field, Form } from 'formik';

import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore"; // Updated with updateDoc
import { fireDB } from '../../FirebaseFile/firebase';
import myContext from '../../context/myContext';

const EditPopup = ({ state, onClose, id }) => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllUserFunction } = context;

    const [update, setUpdate] = useState({
        name: "",
        email: "",
        role: "",
        attendance: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const getSingleUserFunction = async () => {
        setLoading(true);
        try {
            const userTemp = await getDoc(doc(fireDB, "users", id));
            const user = userTemp.data();
            if (user) {
                setUpdate({
                    name: user.name || "",
                    email: user.email || "",
                    role: user.role || "",
                    attendance: user.attendance || "",
                    time: user.time || Timestamp.now(),
                    date: user.date || "",
                });
            }
        } catch (error) {
            toast.error(error.message || "Error fetching user data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const userRef = doc(fireDB, "users", id);
            await updateDoc(userRef, {
                name: update.name,
                email: update.email,
                role: update.role,
                attendance: update.attendance,
                time: update.time,
                date: update.date,
            });

            toast.success("Updated successfully");
            getAllUserFunction();
            onClose();
        } catch (error) {
            toast.error(error.message || "Error updating user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state && id) {
            getSingleUserFunction();
        }
    }, [state, id]);

    return (
        <>
            {state && (
                <div className="popup-container">
                    <div className="popup-inner-container">
                        <div className="popup">
                            <div className="popup-form-container">
                                <Formik
                                    initialValues={update}
                                    enableReinitialize={true} // Allow Formik to reinitialize
                                    onSubmit={handleUpdate}
                                >
                                    {({ isSubmitting, values, handleChange }) => (
                                        <Form>
                                            <div className="field">
                                                <label htmlFor="name" className="field-label">Name</label><br />
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Enter name"
                                                    className="text-field border mb-3"
                                                    value={values.name}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setUpdate({ ...update, name: e.target.value });
                                                    }}
                                                />
                                                <label htmlFor="email" className="field-label">Email</label><br />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter email"
                                                    className="text-field border mb-3"
                                                    value={values.email}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setUpdate({ ...update, email: e.target.value });
                                                    }}
                                                />
                                                <label htmlFor="attendance" className="field-label">Attendance</label><br />
                                                <Field
                                                    type="text"
                                                    name="attendance"
                                                    id="attendance"
                                                    placeholder="Enter attendance"
                                                    className="text-field border mb-4"
                                                    value={values.attendance}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setUpdate({ ...update, attendance: e.target.value });
                                                    }}
                                                />
                                            </div>
                                            <div className="radio-field-container">
                                                <label className='pointer radio-field-label'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        value="Student"
                                                        onChange={(e) => setUpdate({ ...update, role: e.target.value })}
                                                    />
                                                    Student
                                                </label>
                                                <label className='radio-field pointer radio-field-label'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        value="Teacher"
                                                        onChange={(e) => setUpdate({ ...update, role: e.target.value })}
                                                    />
                                                    Teacher
                                                </label>
                                                <label className='radio-field pointer radio-field-label'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        value="Admin"
                                                        onChange={(e) => setUpdate({ ...update, role: e.target.value })}
                                                    />
                                                    Admin
                                                </label>
                                            </div>
                                            <div className="popup-button-container flex">
                                                <button
                                                    type="button"
                                                    className="popup-btn popup-cancel-btn"
                                                    onClick={onClose}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="popup-btn popup-edit-btn"
                                                    disabled={isSubmitting || loading}
                                                >
                                                    {isSubmitting || loading ? "Updating..." : "Update"}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPopup;
