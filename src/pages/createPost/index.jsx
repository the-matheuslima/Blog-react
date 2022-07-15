import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom"
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

function CreatePost() {
    const { isAuth } = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const newDate = new Date();
    const datePost = newDate.getHours() + ":" + newDate.getMinutes();
    let navigate = useNavigate();

    const postsCollectionRef = collection(db, "posts");

    const createPost = async (event) => {
        event.preventDefault();
        if (title !== "" && postText !== "") {
            await addDoc(postsCollectionRef, {
                title,
                postText,
                datePost,
                idPost: Math.floor(Math.random() * 100000),
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            });
            navigate("/");
        } else {
            alert("preencha os campos necessários")
        }
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/")
        }
    }, [])

    return (
        <section className="formPost">
            <form onSubmit={(event) => createPost(event)} className="formPost__container">
                <h1>Create a Post</h1>

                <div className="formPost__inputBox">
                    <label className="formPost__inputBox-label" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="formPost__inputBox-input"
                        type=" text"
                        placeholder="Title..."
                        onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="formPost__inputBox">
                    <label className="formPost__inputBox-label" htmlFor="Post">
                        Post:
                    </label>
                    <textarea
                        className="formPost__inputBox-textArea" placeholder="Post..."
                        onChange={(e) => setPostText(e.target.value)} required />
                </div>
                <input type="submit" className="formPost__button" value="Submit Post" />

                {/* <button type="submit" className="formPost__button" onClick={createPost}>Submit Post</button> */}
            </form>
        </section>
    )
}

export default CreatePost;
