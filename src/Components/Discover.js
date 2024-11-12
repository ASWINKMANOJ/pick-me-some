import { ChevronLeft, ChevronRight } from "lucide-react";
import { topMovies, topRatedTv } from "../Data/MovieData";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

// Correctly import the Card component with lazy loading
const Card = lazy(() => import("../Components/Card"));

function Discover() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="py-8 px-1 sm:px-4 relative group">
        <h2 className="text-2xl font-bold text-white mb-4 px-4">
          Top Rated Movies
        </h2>

        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 z-40 bg-black/50 p-2 rounded-full 
                     text-white opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-black/80 -translate-y-1/2 hidden sm:block"
          onClick={() => {
            const container = document.getElementById("movie-container");
            container.scrollBy({ left: -500, behavior: "smooth" });
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="absolute right-0 top-1/2 z-40 bg-black/50 p-2 rounded-full 
                     text-white opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-black/80 -translate-y-1/2 hidden sm:block"
          onClick={() => {
            const container = document.getElementById("movie-container");
            container.scrollBy({ left: 500, behavior: "smooth" });
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Movie Container */}
        <div
          id="movie-container"
          className="flex overflow-x-scroll overflow-y-hidden scroll-smooth p-2 sm:p-4 
                     [&::-webkit-scrollbar]:h-1
                     [&::-webkit-scrollbar-track]:bg-gray-800/40
                     [&::-webkit-scrollbar-thumb]:bg-gray-500
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                     [scrollbar-width]:thin
                     [scrollbar-color]:gray-500_transparent"
        >
          {topMovies.map((data) => (
            <Suspense key={data.id} fallback={<CardLoader />}>
              <Link to={`/movie/top/${data.id}`}>
                <Card
                  imgSrc={data.poster_path}
                  title={data.title}
                  rating={data.vote_average}
                  id={data.id}
                />
              </Link>
            </Suspense>
          ))}
        </div>
      </div>

      <div className="py-8 px-1 sm:px-4 relative group">
        <h2 className="text-2xl font-bold text-white mb-4 px-4">
          Top Rated Shows
        </h2>

        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 z-40 bg-black/50 p-2 rounded-full 
                     text-white opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-black/80 -translate-y-1/2 hidden sm:block"
          onClick={() => {
            const container = document.getElementById("tv-container");
            container.scrollBy({ left: -500, behavior: "smooth" });
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="absolute right-0 top-1/2 z-40 bg-black/50 p-2 rounded-full 
                     text-white opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-black/80 -translate-y-1/2 hidden sm:block"
          onClick={() => {
            const container = document.getElementById("tv-container");
            container.scrollBy({ left: 500, behavior: "smooth" });
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* TV Container */}
        <div
          id="tv-container"
          className="flex overflow-x-scroll overflow-y-hidden  scroll-smooth p-2 sm:p-4 
                     [&::-webkit-scrollbar]:h-1
                     [&::-webkit-scrollbar-track]:bg-gray-800/40
                     [&::-webkit-scrollbar-thumb]:bg-gray-500
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                     [scrollbar-width]:thin
                     [scrollbar-color]:gray-500_transparent"
        >
          {topRatedTv.map((data) => (
            <Suspense key={data.id} fallback={<CardLoader />}>
              <Link to={`/tv/top/${data.id}`}>
                <Card
                  imgSrc={data.poster_path}
                  title={data.original_name}
                  rating={data.vote_average}
                  id={data.id}
                />
              </Link>
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

// CardLoader for the skeleton loading effect
const CardLoader = () => {
  return (
    <div className="w-40 sm:w-48 h-64 bg-gray-800 rounded-lg animate-pulse flex-shrink-0 m-2">
      {/* Poster Placeholder */}
      <div className="w-full h-48 bg-gray-700 rounded-t-lg"></div>
      {/* Title and Rating Placeholder */}
      <div className="p-2">
        <div className="h-4 bg-gray-600 rounded my-2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default Discover;
