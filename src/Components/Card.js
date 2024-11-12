import { useState } from "react";
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
              transition-opacity duration-300 
              ${
                isHovered || window.innerWidth < 640
                  ? "opacity-100"
                  : "opacity-0"
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

export default Card;
