import React from "react";
import {usePage, Link, router} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import CommentDetails from "@/Components/Coments/CommentDetails.jsx";
import CommentAddForm from "@/Components/Coments/CommentAddForm.jsx";

export default function Show({post}) {
    const {auth} = usePage().props;

    function handleDeletePost(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("posts.destroy", post.id));
        }
    }

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{post.title}</h1>

                {auth.user?.id === post.user_id && (
                    <div className="space-x-2">
                        <Link
                            href={route("posts.edit", post.id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDeletePost}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <p className="mb-6">{post.content}</p>
            <p className="mb-6"> Author: {post.user.name}</p>
            <hr/>
            <h2 className="text-xl font-semibold mb-3">Comments</h2>

            <div className="space-y-4">
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <CommentDetails comment={comment} auth={auth} post={post} key={comment.id}/>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>

            <CommentAddForm post={post}/>

        </AppLayout>
    );
}
