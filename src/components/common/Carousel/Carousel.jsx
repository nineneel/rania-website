import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const Carousel = ({ children, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  const carouselRef = useRef(null);

  const itemsCount = children.length;

  // Minimum swipe/drag distance (in px)
  const minSwipeDistance = 50;

  // Touch handlers
  const handleTouchStart = (e) => {
    // Don't interfere with clicks on interactive elements (buttons, links)
    if (e.target.closest('button, a')) {
      return;
    }

    setTouchEnd(0); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < itemsCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    // Don't interfere with clicks on interactive elements (buttons, links)
    if (e.target.closest('button, a')) {
      return;
    }

    setIsDragging(true);
    setDragStart(e.clientX);
    setDragEnd(0);
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!dragStart || !dragEnd) return;

    const distance = dragStart - dragEnd;
    const isLeftDrag = distance > minSwipeDistance;
    const isRightDrag = distance < -minSwipeDistance;

    if (isLeftDrag && currentIndex < itemsCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (isRightDrag && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setDragStart(0);
    setDragEnd(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(0);
      setDragEnd(0);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemsCount - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemsCount - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={`carousel ${className}`}>
      <div
        className={`carousel-wrapper ${isDragging ? 'dragging' : ''}`}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="carousel-item">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="carousel-indicators">
        {children.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (optional, hidden on mobile by default) */}
      {/* <button
        className="carousel-button prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="carousel-button next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        ›
      </button> */}
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string
};

export default Carousel;
