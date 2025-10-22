import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

const Carousel = ({
  children,
  className = '',
  slidesPerView = 1,
  spaceBetween = 20,
  navigation = false,
  pagination = true,
  autoplay = false,
  breakpoints = null
}) => {
  const defaultBreakpoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  };

  return (
    <div className={`carousel ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        breakpoints={breakpoints || defaultBreakpoints}
        className="carousel-swiper"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  slidesPerView: PropTypes.number,
  spaceBetween: PropTypes.number,
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  autoplay: PropTypes.bool,
  breakpoints: PropTypes.object
};

export default Carousel;
