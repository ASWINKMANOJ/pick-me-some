import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { movies } from "../Data/MovieData";

const MovieItem = lazy(() => import("../Components/MovieItem"));

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 540);

  // Get adjacent indices (with wrap-around)
  const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
  const nextIndex = (currentIndex + 1) % movies.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 7000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePaginate = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + movies.length) % movies.length
    );
  };

  // Preload component for adjacent slides
  const preloadAdjacentSlides = () => {
    return (
      <div className="hidden">
        <Suspense fallback={null}>
          <MovieItem movie={movies[prevIndex]} isMobile={isMobile} />
          <MovieItem movie={movies[nextIndex]} isMobile={isMobile} />
        </Suspense>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-neutral-400 rounded-md sm:rounded-3xl overflow-hidden">
      {/* Preload adjacent slides */}
      {preloadAdjacentSlides()}

      {/* Current slide */}
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: { zIndex: 1, x: 0, opacity: 1 },
              exit: (direction) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.6 },
            }}
            className="absolute w-full h-full"
          >
            <MovieItem movie={movies[currentIndex]} isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>
      </Suspense>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full text-white hover:bg-black/90 transition-colors z-10 shadow-md"
        onClick={() => handlePaginate(-1)}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full text-white hover:bg-black/90 transition-colors z-10 shadow-md"
        onClick={() => handlePaginate(1)}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
