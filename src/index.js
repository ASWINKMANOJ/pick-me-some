import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading";

// Convert regular imports to lazy imports
const App = lazy(() => import("./App"));
const MovieDetail = lazy(() => import("./pages/MovieDetails"));
const TvDetails = lazy(() => import("./pages/TvDetails"));
const PickMovie = lazy(() => import("./pages/PickMovie"));
const PickTv = lazy(() => import("./pages/PickTvShow"));

// Create a loading component
const LoadingFallback = () => <Loading />;

// Wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
  },
  {
    path: "movie/popular/:id",
    element: withSuspense(MovieDetail),
  },
  {
    path: "movie/top/:id",
    element: withSuspense(MovieDetail),
  },
  {
    path: "tv/top/:id",
    element: withSuspense(TvDetails),
  },
  {
    path: "movie/pick",
    element: withSuspense(PickMovie),
  },
  {
    path: "tv/pick",
    element: withSuspense(PickTv),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AnimatePresence mode="wait">
    <RouterProvider router={router} />
  </AnimatePresence>
);
