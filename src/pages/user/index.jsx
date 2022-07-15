import React from "react";
import "./style.scss";

import { getAuth, updateProfile } from "firebase/auth";
import { MdDoneAll, MdEditNote } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function User() {
    const { signUserOutWithGoogle, isAuth } = useContext(AuthContext);
    const navigator = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState({ displayName: user && user.displayName, bol: false });

    const handleChangeDisplayName = () => {
        updateProfile(user, {
            displayName: displayName.displayName
        }).then(() => {
            alert("Profile Update")
            setDisplayName({ ...displayName, bol: !displayName.bol })
        }).catch((error) => {
            alert("An error occurred")
            console.log(error)
        });
    }

    useEffect(() => {
        if (!isAuth) {
            navigator("/")
            console.log(isAuth);
        }
    }, [])

    return (
        <section className="user">
            <div className="user__img">
                <img src={user && user.photoURL} alt="img photo" />
            </div>
            <div className="user__info">
                {!displayName.bol ? (
                    <h3>{user ? user.displayName : "Null"} <MdEditNote onClick={() => setDisplayName({ ...displayName, bol: !displayName.bol })} /></h3>
                ) : (
                    <>
                        <input type="text" value={displayName.displayName} onChange={(e) => setDisplayName({ ...displayName, displayName: e.target.value })} />
                        <MdDoneAll onClick={handleChangeDisplayName} />
                    </>
                )
                }
                <p>{user && user.email}</p>
            </div>

            <div className="user__btns">
                <button className="button" onClick={signUserOutWithGoogle}>Log Out</button>
            </div>
        </section>
    );
};

export default User;
