import React from "react";
import Navbar from "@/Components/Navbar";


const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6 relative">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
