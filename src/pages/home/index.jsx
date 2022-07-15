import React, { useEffect, useState } from "react";
import "./style.scss";

import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Card from "../../components/card";

function Home() {
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        return await deleteDoc(postDoc);
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, [deletePost]);

    return (
        <ul className="posts-list">
            {postList.map((post) => (
                <Card key={post.id} authName={post.author.name} title={post.title} postText={post.postText} authorId={post.author.id} postId={post.id} deletePost={deletePost} datePost={post.datePost} />
            ))}
        </ul>
    );
};

export default Home;
