import { useState, lazy, useEffect, Suspense } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { movies } from "../Data/MovieData";

const MovieItem = lazy(() => import("../Components/MovieItem"));

const MovieCarousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 540);
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 540);
      if (width < 540) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 540 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full sm:h-[80vh] h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full bg-neutral-800 animate-pulse" />
        }
      >
        <Carousel
          responsive={responsive}
          deviceType={device}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          infinite
          autoPlaySpeed={3000}
          keyBoardControl
          pauseOnHover
          draggable
          swipeable
          className="h-[70vh] sm:h-screen w-full rounded-lg overflow-hidden"
          containerClass="h-[70vh] sm:h-screen"
          itemClass="h-[70vh] sm:h-screen"
          shouldResetAutoplay
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} isMobile={isMobile} />
          ))}
        </Carousel>
      </Suspense>
    </div>
  );
};

export default MovieCarousel;
