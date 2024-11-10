import { useParams, useNavigate } from "react-router-dom";
import { topRatedTv } from "../Data/MovieData";
import pageTransition from "../Animations/PageTransition";

const TvDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = topRatedTv.find((movie) => movie.id === parseInt(id));

  if (!movie)
    return <div className="text-center text-white">Movie not found</div>;

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-md"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt=""
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between py-12 px-4 lg:px-8 space-y-8 lg:space-y-0">
        {/* Poster Card */}
        <div className="w-48 h-72 sm:w-56 sm:h-80 lg:w-64 lg:h-96 overflow-hidden shadow-2xl rounded-lg transform transition-transform duration-300 hover:scale-105">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Movie Details */}
        <div className="flex flex-col w-full max-w-lg px-4 lg:px-8">
          {/* Movie Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left text-shadow-lg">
            {movie.title}
          </h1>

          {/* Rating and Release Year */}
          <div className="flex flex-wrap items-center space-x-4 text-sm sm:text-lg mt-4">
            <span className="bg-green-600 px-4 py-1 rounded-full font-semibold text-black">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">
              {new Date(movie.first_air_date).getFullYear()}
            </span>
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
            {movie.overview}
          </p>

          {/* Detailed Information */}
          <div className="mt-8">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Detailed Information
            </h3>
            <ul className="list-disc space-y-2 text-gray-300 text-sm sm:text-base">
              <li>Director: {movie.director}</li>
              <li>Aired: {movie.first_air_date}</li>
              <li>Genres: {movie.genres.join(", ")}</li>
              <li>Cast: {movie.cast.join(", ")}</li>
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-4 sm:px-6 py-2 bg-gray-800 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-200 shadow-lg absolute left-4 sm:left-8 bottom-4 lg:bottom-0"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default pageTransition(TvDetails);
