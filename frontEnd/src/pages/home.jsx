import Taskbar from "../components/taskbar";
import HeroHeader from "../components/heroHeader";
import AboutUs from "../components/AboutUs";
import CategoryCarousel from "../components/Categories";
import Reason from "../components/ChoosingUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const aboutUsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "about" && aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="max-h-fit max-w-full">
      <Taskbar />
      <HeroHeader />
      <AboutUs aboutUsRef={aboutUsRef} />
      <CategoryCarousel />
      <Reason />
      <Testimonials />
      <Footer />
    </div>
  );
}
