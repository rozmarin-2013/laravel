import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import PostForm from "@/Components/Posts/PostForm.jsx";

export default function Edit() {
    return (
        <AppLayout>
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            <PostForm/>
        </AppLayout>
    );
}
