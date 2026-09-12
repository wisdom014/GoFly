import { useEffect } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Discount from "./components/discount";
import Destination from "./components/destination";
import Popular from "./components/popular";
import Service from "./components/service";
import Happiness from "./components/happiness";
import Deals from "./components/deals";
import DayTrips from "./components/day-trips";
import Customize from "./components/customize";
import Companies from "./components/companies";
import DestinationPage from "./components/destination-page";
import Inspiration from "./components/inspiration";
import InspirationsPage from "./components/inspirations-page";
import Reviews from "./components/reviews";
import Faq from "./components/faq";
import Stats from "./components/stats";
import Footer from "./components/footer";
import Login from "./components/login";
import "./App.css";

function useFadeOnScroll() {
  useEffect(() => {
    const run = () => {
      const targets = document.querySelectorAll("[data-fade]");
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
            } else {
              entry.target.classList.remove("fade-in");
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      targets.forEach((el) => observer.observe(el));
      return observer;
    };

    const observer = run();
    return () => observer && observer.disconnect();
  }, []);
}

function App() {
  useFadeOnScroll();

  const destinationMatch = window.location.pathname.match(/^\/destination\/([^/]+)/);
  const inspirationMatch = window.location.pathname.match(/^\/inspiration\/([^/]+)/);

  if (destinationMatch) {
    return (
      <>
        <Navbar />
        <div data-fade><DestinationPage slug={destinationMatch[1]} /></div>
        <div data-fade><Companies /></div>
        <Footer />
      </>
    );
  }

  if (inspirationMatch) {
    return (
      <>
        <Navbar />
        <div data-fade><InspirationsPage slug={inspirationMatch[1]} /></div>
        <div data-fade><Companies /></div>
        <Footer />
      </>
    );
  }

  if (window.location.pathname === "/inspirations") {
    return (
      <>
        <Navbar />
        <div data-fade><InspirationsPage /></div>
        <div data-fade><Companies /></div>
        <Footer />
      </>
    );
  }

  if (window.location.pathname === "/login") {
    return (
      <>
        <Navbar />
        <div data-fade><Login /></div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <div data-fade><Discount /></div>
      <div data-fade><Destination /></div>
      <div data-fade><Service /></div>
      <div data-fade><Popular /></div>
      <div data-fade><Happiness /></div>
      <div data-fade><Deals /></div>
      <div data-fade><Customize /></div>
      <div data-fade><Companies /></div>
      <div data-fade><DayTrips /></div>
      <div data-fade><Inspiration /></div>
      <div data-fade><Reviews /></div>
      <div data-fade><Faq /></div>
      <div data-fade><Stats /></div>
      <Footer />
    </>
  );
}

export default App;
