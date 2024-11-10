import { Link } from "react-router-dom";
const MovieItem = ({ movie, isMobile }) => (
  <Link to={`movie/popular/${movie.id}`}>
    <div className="relative w-full h-full bg-neutral-800">
      <img
        src={`https://image.tmdb.org/t/p/original/${
          isMobile ? movie.poster_path : movie.backdrop_path
        }`}
        loading="lazy"
        alt={movie.title}
        className="w-full h-full object-cover brightness-75"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
        <h2 className="text-3xl font-bold text-white mb-2 text-shadow-sm">
          {movie.title}
        </h2>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-4 text-white">
            <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
        <p className="mt-2 text-gray-300 text-sm sm:text-lg w-full sm:w-2/3 text-wrap text-shadow-sm">
          {movie.overview}
        </p>
      </div>
    </div>
  </Link>
);

export default MovieItem;
