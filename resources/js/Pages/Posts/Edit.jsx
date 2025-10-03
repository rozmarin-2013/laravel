import React from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PostForm from "@/Components/Posts/PostForm.jsx";

export default function Edit() {
    const { post } = usePage().props;

    return (
        <AppLayout>
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <PostForm post={post}/>
        </AppLayout>
    );
}
