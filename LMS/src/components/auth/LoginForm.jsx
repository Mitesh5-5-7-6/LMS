import React, { useContext } from 'react';
import toast from "react-hot-toast";
import { useNavigate, NavLink } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { auth, fireDB } from "../../FirebaseFile/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, collection, where, getDocs } from "firebase/firestore";

import myContext from '../../context/myContext';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { setLoading } = context;

    const handleLogin = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, values.email, values.password);

            const q = query(collection(fireDB, "users"), where("uid", "==", users.user.uid));
            const querySnapshot = await getDocs(q);
            let user = querySnapshot.docs.map(doc => doc.data())[0];
            if (user) {
                localStorage.setItem("users", JSON.stringify(user));
                if (user?.role === 'Admin') navigate('/home/dashboard');
                else if (user?.role === 'Student') navigate('/home/student');
                else if (user?.role === 'Teacher') navigate('/home/teacher');
                else navigate('/login');
                toast.success("User Logged in Successfully!");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };


    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-10 w-3/4 form">
                <div className="text-center">
                    <p className="form-title">Login</p>
                    <p className="form-sub">Welcome! Please enter your credentials.</p>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="field">
                                <label htmlFor="email" className="field-label">Email</label><br />
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="text-field"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="form-error-state"
                                />
                                <label htmlFor="password" className="field-label">Password</label><br />
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className="text-field"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="form-error-state"
                                />
                            </div>

                            <p className='text-end pt-1 link'>
                                <NavLink to='/register'>Signup</NavLink>
                            </p>

                            <button
                                type="submit"
                                className="text-center mt-4 btn bg-[var(--color-2)]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;