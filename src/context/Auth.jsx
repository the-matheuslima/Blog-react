import React from "react";
import { auth, provider } from "../firebase-config";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") ? true : false);
    console.log(isAuth);
    let navigate = useNavigate();

    const signUserOutWithGoogle = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            navigate("/login")
        });
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/")
        }).catch(error => console.log(error))
    };

    const handleDeleteUser = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            alert("User deleted")
            localStorage.clear();
            window.location.pathname = "/"

        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <AuthContext.Provider value={{ signInWithGoogle, signUserOutWithGoogle, handleDeleteUser, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


