import { useState } from "react";
import { XIcon } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { TvIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        </div>
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
                  className="text-white hover:text-gray-300 transition-colors text-left px-4 py-2 rounded-lg hover:bg-gray-800"
                  // onClick={() => setIsOpen(false)}
                >
                  Pick a Movie
                </button>
              </Link>
              <Link to={"tv/pick"}>
                <button
                  className="text-white hover:text-gray-300 transition-colors text-left px-4 py-2 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Pick a Show
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
