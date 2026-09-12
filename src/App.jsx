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
import ScrollAnimator from "./components/scroll-animator";
import "./App.css";

function App() {
  const destinationMatch = window.location.pathname.match(
    /^\/destination\/([^/]+)/,
  );
  const inspirationMatch = window.location.pathname.match(
    /^\/inspiration\/([^/]+)/,
  );

  if (destinationMatch) {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <DestinationPage slug={destinationMatch[1]} />
        <Companies />
        <Footer />
      </>
    );
  }

  if (inspirationMatch) {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <InspirationsPage slug={inspirationMatch[1]} />
        <Companies />
        <Footer />
      </>
    );
  }

  if (window.location.pathname === "/inspirations") {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <InspirationsPage />
        <Companies />
        <Footer />
      </>
    );
  }

  if (window.location.pathname === "/login") {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <Login />
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <Hero />
      <Discount />
      <Destination />
      <Service />
      <Popular />
      <Happiness />
      <Deals />
      <Customize />
      <Companies />
      <DayTrips />
      <Inspiration />
      <Reviews />
      <Faq />
      <Stats />
      <Footer />
    </>
  );
}

export default App;
