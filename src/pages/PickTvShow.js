import React, { useEffect, useState } from "react";
import axios from "axios";
import SwipeCard from "../Components/SwipeCard";
import { topRatedTv } from "../Data/MovieData";
import Loading from "../Components/Loading";

const PickTvShow = () => {
  const apiToken = process.env.REACT_APP_TOKEN;
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDataWithAxios = async () => {
      try {
        const rNumber = Math.floor(Math.random() * 50) + 1;
        const response = await axios({
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${rNumber}`,
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        });

        setMovieData(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    // fetchMovieDataWithAxios();
    setMovieData(topRatedTv);
  }, [apiToken]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="h-2/3 sm:h-3/4 sm:w-1/4 w-3/4 p-2 relative">
        <SwipeCard data={movieData} />
      </div>
    </div>
  );
};

export default PickTvShow;
