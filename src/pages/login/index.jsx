import React from "react";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

function Login() {
    const { signInWithGoogle } = useContext(AuthContext);

    return (
        <div className="auth">
            <div className="auth__google">
                <p>Sing In with Google to Continue</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}
                >Sign in with Google</button>
            </div>
        </div >
    );
};

export default Login;
