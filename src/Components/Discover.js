import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topMovies, topRatedTv } from "../Data/MovieData";
import { Link } from "react-router-dom";

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
          <ChevronRight size={24} className="hidden sm:block" />
        </button>

        {/* Movie Container */}
        <div
          id="movie-container"
          className="flex overflow-x-scroll scroll-smooth p-2 sm:p-4 
                     [&::-webkit-scrollbar]:h-1
                     [&::-webkit-scrollbar-track]:bg-gray-800/40
                     [&::-webkit-scrollbar-thumb]:bg-gray-500
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                     [scrollbar-width]:thin
                     [scrollbar-color]:gray-500_transparent"
        >
          {topMovies.map((data) => (
            <Link to={`/movie/top/${data.id}`} key={data.id}>
              <Card
                imgSrc={data.poster_path}
                title={data.title}
                rating={data.vote_average}
                id={data.id}
              />
            </Link>
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
          className="flex overflow-x-scroll scroll-smooth  p-2 sm:p-4 
                     [&::-webkit-scrollbar]:h-1
                     [&::-webkit-scrollbar-track]:bg-gray-800/40
                     [&::-webkit-scrollbar-thumb]:bg-gray-500
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                     [scrollbar-width]:thin
                     [scrollbar-color]:gray-500_transparent"
        >
          {topRatedTv.map((data) => (
            <Link to={`/tv/top/${data.id}`} key={data.id}>
              <Card
                imgSrc={data.poster_path}
                title={data.name}
                rating={data.vote_average}
                id={data.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = ({ imgSrc, title, rating, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-none relative transition-transform duration-300 ease-out transform
                 hover:scale-110 hover:z-10 mx-2"
      style={{ width: "200px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${imgSrc}`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent
                      transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="text-white font-bold text-lg line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-semibold">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
