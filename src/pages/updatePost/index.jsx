import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";

function UpdatePost() {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState();
    const [postText, setPostText] = useState("");
    const { id } = useParams();
    let navigate = useNavigate();

    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                .filter(post => post.id === id && (setPostText(post.postText), setTitle(post.title))));
        };
        getPosts();
    }, [id]);

    const updatePost = async () => {
        const UpdateRef = doc(db, "posts", id);
        await updateDoc(UpdateRef, { "title": title, "postText": postText });
        navigate("/");
    };

    return (
        <div className="formPost">
            <div className="formPost__container">
                <h1>Create a Post</h1>

                <div className="formPost__inputBox">
                    <label className="formPost__inputBox-label" htmlFor="title">
                        Title:
                    </label>
                    <input className="formPost__inputBox-input" type=" text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="formPost__inputBox">
                    <label className="formPost__inputBox-label" htmlFor="Post">
                        Post:
                    </label>
                    <textarea className="formPost__inputBox-textArea" placeholder="Post..." value={postText} onChange={(e) => setPostText(e.target.value)} />
                </div>

                <button className="formPost__button" onClick={updatePost}>Submit Post</button>
            </div>
        </div>
    );
};

export default UpdatePost;
