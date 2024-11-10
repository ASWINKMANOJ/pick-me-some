import { lazy, Suspense } from "react";

// Lazy load components
const Navigation = lazy(() => import("../Components/Navigation"));
const Main = lazy(() => import("../Components/Main"));
const Discover = lazy(() => import("../Components/Discover"));
const Footer = lazy(() => import("../Components/Footer"));

function Home() {
  return (
    <div className="bg-gray-900">
      <Suspense fallback={<div className="h-20 bg-gray-800" />}>
        <Navigation />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-gray-800" />}>
        <Main />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-gray-800" />}>
        <Discover />
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-gray-800" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;
