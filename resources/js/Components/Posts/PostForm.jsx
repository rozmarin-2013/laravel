import React from "react";
import {useForm} from "@inertiajs/react";
import {useDispatch} from "react-redux";

export default function PostForm({post = null}) {
    const {data, setData, put, post: store, errors} = useForm({
        title: post?.title || "",
        content: post?.content || "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post?.id
            ? put(route("posts.update", post.id))
            : store(route("posts.Store"));
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Title</label>
                <input
                    type="text"
                    value={data?.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="border p-2 w-full"
                />
                {errors.title && <div className="text-red-600">{errors.title}</div>}
            </div>

            <div>
                <label className="block">Content</label>
                <textarea
                    value={data?.content}
                    onChange={(e) => setData("content", e.target.value)}
                    className="border p-2 w-full"
                    rows="6"
                />
                {errors.content && <div className="text-red-600">{errors.content}</div>}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save
            </button>
        </form>
    );
}
