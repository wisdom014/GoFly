import { useEffect, useMemo, useRef, useState } from "react";
import fallbackImage from "../assets/hero.png";
import temporaryInspirations from "../data/inspirations";
import "../styles/inspiration.css";

function InspirationCard({ item }) {
  return (
    <article className="inspiration-card">
      <a className="inspiration-image-link" href={`/inspiration/${item.slug}`}>
        <img
          src={item.image}
          alt={item.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </a>
      <div className="inspiration-copy">
        <a className="inspiration-location" href={`/inspiration/${item.slug}`}>
          ⌾ {item.location}
        </a>
        <a className="inspiration-title" href={`/inspiration/${item.slug}`}>
          {item.title}
        </a>
        <p className="inspiration-date">▣ {item.date}</p>
        <div className="inspiration-rule" />
        <p className="inspiration-description">{item.description}</p>
      </div>
    </article>
  );
}

function Inspiration({ items = temporaryInspirations }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const swipeStart = useRef(null);
  const orderedItems = useMemo(
    () => [...items].sort((a, b) => b.visits - a.visits),
    [items],
  );
  const maxIndex = Math.max(0, orderedItems.length - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () =>
      setVisibleCount(window.innerWidth >= 1024 ? 2 : 1);
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (orderedItems.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActiveIndex((current) => Math.min(current + 1, maxIndex)),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [maxIndex, orderedItems.length]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  function moveBy(amount) {
    setActiveIndex((current) =>
      Math.max(0, Math.min(current + amount, maxIndex)),
    );
  }

  function handlePointerDown(event) {
    swipeStart.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event) {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    if (Math.abs(distance) > 45) moveBy(distance < 0 ? 1 : -1);
    swipeStart.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }

  return (
    <section
      className="inspiration-section"
      aria-labelledby="inspiration-title"
    >
      <div className="inspiration-heading">
        <h2 id="inspiration-title">Travel Inspirations</h2>
        <p>
          A curated list of inspiration the most tour &amp; travel based on
          different destinations.
        </p>
      </div>
      <div
        className="inspiration-carousel"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <div
          className="inspiration-track"
          style={{
            transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`,
          }}
        >
          {orderedItems.map((item) => (
            <div
              className="inspiration-slide"
              style={{ flex: `0 0 ${100 / visibleCount}%` }}
              key={item.slug}
            >
              <InspirationCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="inspiration-controls">
        <button
          type="button"
          aria-label="Previous inspiration"
          onClick={() => moveBy(-1)}
        >
          ←
        </button>
        <div
          className="inspiration-dots"
          role="status"
          aria-label={`Showing inspiration ${activeIndex + 1} of ${orderedItems.length}`}
        >
          {orderedItems.slice(0, maxIndex + 1).map((item, index) => (
            <span
              className={index === activeIndex ? "active" : ""}
              key={item.slug}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next inspiration"
          onClick={() => moveBy(1)}
        >
          →
        </button>
      </div>
      <a className="view-inspirations" href="/inspirations">
        View All Inspiration ↗
      </a>
    </section>
  );
}

export default Inspiration;
