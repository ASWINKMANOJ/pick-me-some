import { Link } from "react-router-dom";

const MovieItem = ({ movie, isMobile }) => (
  <Link to={`movie/popular/${movie.id}`}>
    <div className="relative w-full h-full bg-neutral-900">
      <img
        src={`https://image.tmdb.org/t/p/original/${
          isMobile ? movie.poster_path : movie.backdrop_path
        }`}
        loading="lazy"
        alt={movie.title}
        className="w-full h-full object-cover brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {movie.title}
          </h2>
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium text-white">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <p className="text-gray-200 text-sm md:text-lg max-w-2xl line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default MovieItem;
