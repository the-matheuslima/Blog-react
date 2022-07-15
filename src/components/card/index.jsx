import React from "react";
import { auth } from "../../firebase-config";
import { MdModeEditOutline, MdRestoreFromTrash } from "react-icons/md"
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { Link } from "react-router-dom";
import "./style.scss"

function Card({ title, authorId, postText, authName, postId, deletePost, datePost }) {
    const { isAuth } = useContext(AuthContext);

    return (
        <li className="post">
            <div className="post__header">
                <div className="title">
                    <h1>{title}</h1>
                </div>
                {auth.currentUser !== null &&
                    <div className="post__buttons">
                        <div className="post__delete">
                            {isAuth && authorId === auth.currentUser.uid && (
                                <button
                                    onClick={() => {
                                        deletePost(postId);
                                    }}
                                >
                                    <MdRestoreFromTrash />
                                </button>

                            )}
                        </div>

                        <div className="post__edit">
                            {isAuth && authorId === auth.currentUser.uid && (
                                <Link to={`update/${postId}`}>
                                    {/* {" "} */}
                                    <MdModeEditOutline />
                                </Link>

                            )}
                        </div>
                    </div>
                }
            </div>

            <div className="post__body">
                <p>{postText}</p>
            </div>

            <div className="post__bottom">
                <h3>@{authName}</h3>
                <span>{datePost}</span>
            </div>
        </li>
    );
};

export default Card;
