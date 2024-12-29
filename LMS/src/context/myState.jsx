import { useEffect, useState } from 'react';
import MyContext from './myContext';

import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { fireDB } from "../FirebaseFile/firebase";

const MyState = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const usersCollection = collection(fireDB, "users");
            const usersQuery = query(usersCollection, orderBy("time"));
            const querySnapshot = await getDocs(usersQuery);

            // Parse the data
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setGetAllUser(users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        getAllUserFunction();
    }, []);

    return (
        <MyContext.Provider value={{ loading, setLoading, getAllUser, getAllUserFunction }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState
