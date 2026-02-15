import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Don't show on Home page
    if (pathnames.length === 0) return null;

    // Don't show on Admin pages if preferred, or keep them
    // if (location.pathname.startsWith("/admin")) return null;

    return (
        <nav className="bg-gray-50 py-3 px-4 sm:px-8 border-b border-gray-200">
            <ul className="flex items-center text-sm text-gray-600">
                <li>
                    <Link to="/" className="flex items-center hover:text-blue-600 transition">
                        <Home size={16} className="mr-1" />
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const formattedValue = value.replace(/-/g, " ").toUpperCase();

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight size={16} className="mx-2 text-gray-400" />
                            {isLast ? (
                                <span className="font-semibold text-blue-600 truncate max-w-[150px] sm:max-w-none">
                                    {formattedValue}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-blue-600 transition truncate max-w-[100px] sm:max-w-none">
                                    {formattedValue}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
