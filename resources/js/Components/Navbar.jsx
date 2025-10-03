import React from "react";
import {Link, usePage} from "@inertiajs/react";

const Navbar = () => {
    const {auth} = usePage().props;

    return (
        <header className="grid gap-3 py-10 lg:grid-cols-3">
            <nav className="flex flex-1 justify-between items-center">
                <div>
                    <Link href="/">
                        Home
                    </Link>
                    <Link
                        href="/posts"
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Posts
                    </Link>
                </div>

                {/* Правая часть (логин/логаут) */}
                <div className="flex items-center space-x-2">
                    {auth.user ? (
                        <>
                            <span className="ml-2">{auth.user.name}</span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Login
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
