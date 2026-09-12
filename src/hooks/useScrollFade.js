import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to every [data-fade] element.
 * Elements slide + fade in when they enter the viewport and fade out
 * when they leave (scroll back out).
 */
export default function useScrollFade() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-fade]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
            entry.target.classList.remove('fade-hidden');
          } else {
            entry.target.classList.remove('fade-visible');
            entry.target.classList.add('fade-hidden');
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

