import { useState } from "react";
import "./Team.scss";

const SLIDER_IMAGES = [
  "https://picsum.photos/seed/team1/800/400",
  "https://picsum.photos/seed/team2/800/400",
  "https://picsum.photos/seed/team3/800/400",
  "https://picsum.photos/seed/team4/800/400",
];

export const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === SLIDER_IMAGES.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? SLIDER_IMAGES.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="widget-card team-slider" id="team">
      <h2 className="widget-card__title">Our Team</h2>

      <div className="team-slider__container">
        <button
          className="slider-btn prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDER_IMAGES.map((imgSrc, index) => (
            <div className="slide" key={index}>
              <img
                src={imgSrc}
                alt={`Team member ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button
          className="slider-btn next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>

      <div className="team-slider__dots">
        {SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
