import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ShopByCategory = () => {
  const { BASE_URL } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/category/get`);
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        console.log("Category data could not be fetched.");
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  return (
    <div className='py-8 md:py-12'>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Header Section */}
      <div className='mb-8 md:mb-12'>
        <h1 className='text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-3'>
          Shop by Category
        </h1>

        <p className='text-gray-600 text-base md:text-lg max-w-2xl'>
          Discover our curated categories, designed to suit every style and preference
        </p>
      </div>

      {isLoading || categories.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <AppLoader />
        </div>
      ) : (
        <div className='flex gap-6 overflow-x-auto hide-scrollbar pb-4'>
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={{
                pathname: "/all-category",
              }}
              state={{ category }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex-shrink-0 w-[320px] md:w-[380px]"
            >
              {/* Category Image */}
              <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                <img
                  src={category?.imageUrl}
                  alt={category.name || 'Category Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => (e.target.src = '/no-image.jpg')}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                <div></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-end justify-between gap-4"
                >
                  {/* Left side (title + description stacked) */}
                  <div className="flex flex-col justify-end">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 capitalize">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-xs md:text-sm line-clamp-2 max-w-[220px]">
                      {category.description ||
                        `Explore fashion picks crafted to keep you stylish, confident, and ahead of the trend`}
                    </p>
                  </div>

                  {/* Right side (Shop Now button) */}
                  <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 flex-shrink-0">
                    <span className="text-sm font-medium">Shop Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* View All Link - Only show if there are more than 3 categories */}
      {categories.length > 3 && (
        <div className='text-right mt-6'>
          <Link
            to='/view-all-category'
            className='inline-flex items-center gap-2 text-black text-sm md:text-base font-semibold hover:gap-3 transition-all duration-300 underline underline-offset-2'
          >
            View All Categories
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShopByCategory