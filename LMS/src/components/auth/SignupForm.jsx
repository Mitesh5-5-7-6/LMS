import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../FirebaseFile/firebase";

import myContext from "../../context/myContext";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});


const SignupForm = () => {
    const navigate = useNavigate();
    const { setLoading } = useContext(myContext);

    const userSignupFunction = async (values, { resetForm }) => {
        setLoading(true);

        try {
            const users = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = {
                name: values.name,
                email: users.user.email,
                uid: users.user.uid,
                role: "Student",
                attendance: "0",
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userReference = collection(fireDB, "users");
            await addDoc(userReference, user);
            resetForm();
            toast.success("User Signup Successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-10 w-3/4 form">
                <div className="text-center">
                    <p className="form-title">SignUp</p>
                    <p className="form-sub">Welcome! Please enter your credentials.</p>
                </div>

                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={userSignupFunction}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="field">
                                <label htmlFor="name" className="field-label">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter name"
                                    className="text-field"
                                />
                                <ErrorMessage name="name" component="div" className="form-error-state" />

                                <label htmlFor="email" className="field-label">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="text-field"
                                />
                                <ErrorMessage name="email" component="div" className="form-error-state" />

                                <label htmlFor="password" className="field-label">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className="text-field"
                                />
                                <ErrorMessage name="password" component="div" className="form-error-state" />
                            </div>

                            <p className="text-end pt-1">
                                <NavLink className="link" to="/login">Login</NavLink>
                            </p>

                            <button
                                type="submit"
                                className="text-center mt-4 btn bg-[var(--color-2)]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "SignUp..." : "SignUp"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignupForm
