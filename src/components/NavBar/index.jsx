import { getAuth } from "firebase/auth";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import defaultUser from "../../assets/defaultUser.png"
import "./style.scss";

function NavBar() {
    const { isAuth, signUserOutWithGoogle } = useContext(AuthContext)
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <nav className="navBar">
            <div className="navBar__links">
                <Link className="navBar__link" to={"/"}>Home</Link>
                {isAuth &&
                    <Link className="navBar__link" to={"/createpost"}>Create Post</Link>
                }
            </div>

            <div className="navBar__links">
                {!isAuth ? (
                    <Link className="navBar__link" to={"/login"}>Login</Link>
                ) : (

                    <div className="navBar__auth">
                        <div className="navBar__auth__user">
                            <Link className="navBar__link" to="/user">User</Link>
                            <img className="navBar__user" src={user && user.photoURL} alt="" />
                        </div>

                        <button className="navBar__link-button__logOut" onClick={signUserOutWithGoogle}>Log Out</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
