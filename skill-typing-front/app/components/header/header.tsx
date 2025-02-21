import React, { useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";
import MenuButton from "./menuButton";
import DropdownMenu from "./dropdownMenu";

export default function Header() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(containerRef, setIsOpen);

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
          <MenuButton onClick={toggleMenu} />
          {isOpen && <DropdownMenu handleLogout={handleLogout} />}
        </div>
      </div>
    </header>
  );
}
