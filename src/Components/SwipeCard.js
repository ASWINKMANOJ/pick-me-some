import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import TinderCard from "react-tinder-card";

function SwipeCard({ data }) {
  const initialVisibleCards = 3;
  const [topIndex, setTopIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(
    data.slice(0, initialVisibleCards)
  );

  const handleSwipe = (dir, movieId) => {
    console.log(`Swiped ${dir} on ${movieId}`);
  };

  const handleCardLeftScreen = () => {
    setTopIndex((prevTopIndex) => {
      const newIndex = prevTopIndex + 1;
      if (newIndex + initialVisibleCards <= data.length) {
        setVisibleCards(data.slice(newIndex, newIndex + initialVisibleCards));
      }
      return newIndex;
    });
  };

  useEffect(() => {
    setTopIndex(0);
    setVisibleCards(data.slice(0, initialVisibleCards));
  }, [data]);

  return (
    <div>
      {visibleCards
        .slice()
        .reverse()
        .map((movie, index) => (
          <TinderCard
            key={movie.id}
            preventSwipe={["up", "down"]}
            className="absolute top-0 left-0 transition-transform duration-500 ease-out"
            swipeRequirementType="position"
            onSwipe={(dir) => handleSwipe(dir, movie.id)}
            onCardLeftScreen={handleCardLeftScreen}
            style={{
              zIndex: visibleCards.length - index,
              transform: `translateX(${index * 10}px) translateY(${
                index * 10
              }px)`,
            }}
          >
            <div className="relative w-[300px] h-[500px] bg-neutral-500 rounded-xl cursor-grab overflow-hidden">
              {/* Placeholder while image loads */}
              <div className="absolute inset-0 bg-neutral-600 animate-pulse rounded-xl" />

              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                loading={index < 3 ? "eager" : "lazy"}
                alt={movie.title}
                className="w-full h-full object-cover absolute rounded-xl transition-opacity duration-300"
                onLoad={(e) => {
                  e.target.previousSibling.style.display = "none";
                  e.target.style.opacity = "1";
                }}
                style={{ opacity: 0 }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-3">
                  {movie.name || movie.title}
                </h2>
              </div>
            </div>
          </TinderCard>
        ))}

      {/* Preload the next two images */}
      <div className="hidden">
        {data
          .slice(
            topIndex + initialVisibleCards,
            topIndex + initialVisibleCards + 2
          )
          .map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt=""
            />
          ))}
      </div>
    </div>
  );
}

export default SwipeCard;
