import React from "react";
import {Link, usePage} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Pagination from "@/Components/Pagination.jsx";

export default function Index() {
    const {posts, auth} = usePage().props;

    return (
        <AppLayout>
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>
            {auth.user && (
                <div className="mb-4">
                    <Link
                        href={route("posts.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
                    >
                        Create Post
                    </Link>
                </div>
            )}
            < div className="space-y-4">
                {posts.data.map((post) => (
                        <div key={post.id} className="p-4 bg-white shadow rounded mb-4">
                            <p className="text-xl font-semibold">{post.title}</p>
                            <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
                            <p className="text-sm text-gray-500">By {post.user.name}</p>
                            <Link
                                href={route("posts.show", post.id)}
                                className="text-blue-600 hover:underline"
                            >
                                Read more
                            </Link>
                        </div>
                    )
                )
                }
            </div>

            <Pagination links={posts.links}/>
        </AppLayout>
    )
        ;
}
