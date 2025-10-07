import React, { useContext } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { AppContext } from '../../../StoreContext/StoreContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';

const UserCarousel = () => {
  const { BASE_URL } = useContext(AppContext);
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/slider/view-sliders`);
        setCarousel(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCarousel();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: carousel.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: carousel.length > 1,
    speed: 1000,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i) => (
      <div className="w-12 h-1 bg-white/50 hover:bg-white transition-all duration-300 rounded-full"></div>
    ),
  };

  return (
    <>
      <style jsx>{`
        .custom-dots {
          bottom: 30px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .custom-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        .custom-dots li.slick-active div {
          background-color: white;
          width: 48px;
        }
      `}</style>

      {isLoading || carousel.length === 0 ? (
        <div className="col-span-2 flex justify-center items-center h-[50vh]">
          <AppLoader />
        </div>
      ) : (
        <Slider {...settings}>
          {carousel.map((slider) => (
            <div
              key={slider._id}
              className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={slider.image}
                alt={`Image showcasing ${slider.title}`}
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = '/banner-no-image.jpg'}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-16"> 
                  
                  <div className="max-w-2xl">
                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-white font-black uppercase leading-tight mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '0.02em' }}

                    >
                      {slider.title}
                    </motion.h1>

                    {/* Description (was h2 before) */}
                    {slider.label && (
                      <motion.p
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/90 text-base md:text-lg mb-8 max-w-xl leading-relaxed"
                      >
                        {slider.label}
                      </motion.p>
                    )}

                    {/* Button */}
                    <Link to={{
                      pathname: "/all-category",
                    }}
                      state={{
                        category: {
                          id: slider?.category,
                          name: slider?.title,
                        },
                      }}>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-white text-black font-semibold capitalize tracking-wide
                        py-3 px-8 md:py-4 md:px-10 rounded-full shadow-xl 
                        hover:bg-gray-100 transition-all duration-300 
                        hover:scale-105 hover:shadow-2xl text-sm md:text-base"
                      >
                        Explore Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default UserCarousel;
