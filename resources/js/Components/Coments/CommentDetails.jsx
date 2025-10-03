import React from "react";
import {router} from "@inertiajs/react";

export default function CommentDetails({comment, auth, post}) {
    function handleDeleteComment(e) {
        e.preventDefault();
        router.delete(
            route("comments.destroy", comment.id)
        );
    }

    return (
        <div
            key={comment.id}
            className="border rounded p-3 bg-white shadow"
        >
            <p>{comment.comment}</p>
            <small className="text-gray-600">
                by {comment.user?.name || "Unknown"}
            </small>

            {(auth.user?.id === comment.user_id ||
                auth.user?.id === post.user_id) && (
                <form
                    onSubmit={handleDeleteComment}
                    className="inline ml-2"
                >
                    <button
                        type="submit"
                        className="text-red-500 text-sm"
                    >
                        Delete
                    </button>
                </form>
            )}
        </div>
    );
}
