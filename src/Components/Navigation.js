import { useState } from "react";
import { XIcon, LogOut, User } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { TvIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext"; // Adjust the import path as needed

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="relative">
      <div className="h-24 bg-gray-900 w-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TvIcon className="h-8 w-8 text-white" />
          <h1 className="font-bold capitalize text-gray-200 text-xl">
            Pick me Some
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          <Link to={"movie/pick"}>
            <button className="text-white hover:text-gray-300 transition-colors font-medium">
              Pick a Movie
            </button>
          </Link>
          <Link to={"tv/pick"}>
            <button className="text-white hover:text-gray-300 transition-colors font-medium">
              Pick a Show
            </button>
          </Link>

          {/* Account Button - Desktop */}
          <div className="relative">
            <button
              onClick={toggleAccountMenu}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-medium p-2 rounded-full hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
              <span className="max-w-[100px] truncate">
                {user?.email || "Account"}
              </span>
            </button>

            {/* Account Dropdown - Desktop */}
            <AnimatePresence>
              {showAccountMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="absolute top-24 left-0 right-0 z-10 bg-gray-900 border-t border-gray-800 sm:hidden origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link to={"movie/pick"}>
                <button
                  className="text-white hover:text-gray-300 transition-colors text-left px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Pick a Movie
                </button>
              </Link>
              <Link to={"tv/pick"}>
                <button
                  className="text-white hover:text-gray-300 transition-colors text-left px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Pick a Show
                </button>
              </Link>

              {/* Account Section - Mobile */}
              <div className="border-t border-gray-700 pt-4">
                <div className="px-4 py-2 text-sm text-gray-400">
                  {user?.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-left px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
