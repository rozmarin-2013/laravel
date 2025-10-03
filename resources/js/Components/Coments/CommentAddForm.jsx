import React from "react";
import {router, useForm} from "@inertiajs/react";

export default function CommentAddForm({post}) {
    const {data, setData, post: postComment, reset, errors} = useForm({
        comment: "",
    });


    function handleSubmit(e) {
        e.preventDefault();
        postComment(route("comments.Store", post.id), {
            onSuccess: () => reset("comment"),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 border-t pt-4 space-y-3"
        >
                    <textarea
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        className="w-full border rounded p-2"
                        rows="3"
                        placeholder="Write a comment..."
                    />
            {errors.comment && (
                <div className="text-red-600">{errors.comment}</div>
            )}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Comment
            </button>
        </form>
    );
}
