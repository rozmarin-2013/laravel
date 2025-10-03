import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex space-x-2 mt-6">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    className={`px-3 py-1 border rounded ${
                        link.active ? "bg-blue-600 text-white" : "bg-white"
                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
