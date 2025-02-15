import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";

export default function Header() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await auth.signoutRedirect({
      extraQueryParams: {
        client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
        logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
      },
    });
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 items-center px-4 py-2">
        <Link to="/" className="text-xl text-gray-900">
          Skill Typing
        </Link>
        <div
          ref={containerRef}
          className="relative inline-block justify-self-end"
        >
          <button
            type="button"
            onClick={toggleMenu}
            className="grid grid-rows-3 gap-2 p-2"
          >
            <div className="h-0.5 w-8 bg-gray-900" />
            <div className="h-0.5 w-8 bg-gray-900" />
            <div className="h-0.5 w-8 bg-gray-900" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-4 w-32 rounded border border-blue-600 bg-white shadow-lg">
              <Link
                to="/management"
                className="block w-full px-4 py-2 text-center text-gray-900 hover:text-gray-400"
              >
                問題管理
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-center text-gray-900 hover:text-gray-400"
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
