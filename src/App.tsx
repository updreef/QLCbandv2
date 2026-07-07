import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SchemaMarkup from "./components/SchemaMarkup";

// Import pages
import Home from "./components/pages/Home";
import Optredens from "./components/pages/Optredens";
import OptredensDetail from "./components/pages/OptredensDetail";
import BoekOns from "./components/pages/BoekOns";
import OverOns from "./components/pages/OverOns";
import Mannen from "./components/pages/Mannen";
import Muziek from "./components/pages/Muziek";
import Blog from "./components/pages/Blog";
import BlogDetail from "./components/pages/BlogDetail";

export default function App() {
  const [route, setRoute] = useState<string>("home");
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      
      if (hash.startsWith("#/optredens/")) {
        setRoute("optredens-detail");
        setSlug(hash.replace("#/optredens/", ""));
      } else if (hash.startsWith("#/blog/")) {
        setRoute("blog-detail");
        setSlug(hash.replace("#/blog/", ""));
      } else {
        const parsed = hash.replace("#/", "") || "home";
        setRoute(parsed);
        setSlug("");
      }
      
      // Scroll to top smoothly on route change
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case "home":
        return <Home />;
      case "optredens":
        return <Optredens />;
      case "optredens-detail":
        return <OptredensDetail slug={slug} />;
      case "boek-ons":
        return <BoekOns />;
      case "over-ons":
        return <OverOns />;
      case "mannen":
        return <Mannen />;
      case "muziek":
        return <Muziek />;
      case "blog":
        return <Blog />;
      case "blog-detail":
        return <BlogDetail slug={slug} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen flex flex-col justify-between selection:bg-brand-neon selection:text-brand-bg font-sans overflow-x-hidden">
      {/* 1. SEO Dynamic Schema Markup */}
      <SchemaMarkup route={route} slug={slug} />

      {/* 2. Global Header Navigation */}
      <Header currentRoute={route} />

      {/* 3. Main Page Body with Motion Transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={route + slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Global Footer block */}
      <Footer />
    </div>
  );
}
