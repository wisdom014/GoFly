import { useState } from "react";
import Destination from "./destination";
import "../styles/destination-page.css";

function DestinationPage({ slug }) {
  const destinationCatalog = Destination.catalog;
  const destination =
    destinationCatalog.find((item) => item.slug === slug) ||
    destinationCatalog.find(
      (item) => item.name.toLowerCase().replaceAll(" ", "-") === slug,
    ) ||
    destinationCatalog[0];
  const [selectedTour, setSelectedTour] = useState(null);
  return (
    <main className="destination-page">
      <div
        className="destination-page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.48)), url(${destination.image})`,
        }}
      >
        <h1>{destination.name}</h1>
        <p>
          {destination.region} · {destination.tours}
        </p>
      </div>
      <section className="destination-tours">
        <h2>Tours in {destination.name}</h2>
        <div className="tour-list">
          {destination.tourLocations.map((tour) => (
            <button
              type="button"
              className={`tour-detail ${selectedTour === tour ? "selected" : ""}`}
              key={tour}
              onClick={() => setSelectedTour(tour)}
            >
              <strong>{tour}</strong>
              <span>
                {selectedTour === tour
                  ? `Explore the ${tour} experience in ${destination.name}.`
                  : "View tour details ↗"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DestinationPage;
