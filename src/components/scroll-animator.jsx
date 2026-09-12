import { useEffect } from "react";

function ScrollAnimator() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    sections.forEach((el) => {
      el.classList.add("scroll-section");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            entry.target.classList.remove("scroll-hidden");
          } else {
            entry.target.classList.add("scroll-hidden");
            entry.target.classList.remove("scroll-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

export default ScrollAnimator;
