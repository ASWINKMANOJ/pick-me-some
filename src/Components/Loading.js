import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900">
      <div className="h-2/3 sm:h-3/4 sm:w-1/4 w-3/4 p-2">
        <div className="h-full w-full mb-2">
          <Skeleton
            height={"100%"}
            baseColor="#1F2937"
            highlightColor="#374151"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
