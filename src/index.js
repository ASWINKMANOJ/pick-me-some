import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading";
import { AuthProvider } from "./Authentication/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoute";

// Lazy imports
const App = lazy(() => import("./App"));
const MovieDetail = lazy(() => import("./pages/MovieDetails"));
const TvDetails = lazy(() => import("./pages/TvDetails"));
const PickMovie = lazy(() => import("./pages/PickMovie"));
const PickTv = lazy(() => import("./pages/PickTvShow"));
const Login = lazy(() => import("./pages/Login"));

const LoadingFallback = () => <Loading />;

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const withProtection = (Component) => (
  <ProtectedRoute>{withSuspense(Component)}</ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/",
    element: withProtection(App),
  },
  {
    path: "movie/popular/:id",
    element: withProtection(MovieDetail),
  },
  {
    path: "movie/top/:id",
    element: withProtection(MovieDetail),
  },
  {
    path: "tv/top/:id",
    element: withProtection(TvDetails),
  },
  {
    path: "movie/pick",
    element: withProtection(PickMovie),
  },
  {
    path: "tv/pick",
    element: withProtection(PickTv),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  </AuthProvider>
);
