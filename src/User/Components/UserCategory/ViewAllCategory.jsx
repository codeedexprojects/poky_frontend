import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { motion } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';

const ViewAllCategories = () => {
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
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  return (
    <div className='min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8'>
      {/* Breadcrumb */}
      <div className='max-w-7xl mx-auto mb-8'>
        <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
          <Link to='/' className='hover:text-gray-900 transition-colors'>
            <Home className='w-4 h-4' />
          </Link>
          <span className='text-gray-400'>/</span>
          <Link to='/' className='hover:text-gray-900 transition-colors'>
            Home
          </Link>
          <span className='text-gray-400'>/</span>
          <span className='text-gray-900 font-medium'>All Categories</span>
        </nav>

        {/* Header */}
       
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <AppLoader />
        </div>
      ) : (
        <div className='max-w-7xl mx-auto'>
          {/* Categories Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link
                  to={{ pathname: "/all-category" }}
                  state={{ category }}
                  className="block"
                >
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={category?.imageUrl}
                      alt={category.name || 'Category Image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => (e.target.src = '/no-image.jpg')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div></div>
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex flex-col justify-end">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2 capitalize">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2">
                          {category.description ||
                            `Explore fashion picks crafted to keep you stylish, confident, and ahead of the trend`}
                        </p>
                      </div>
                      <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 flex-shrink-0">
                        <span className="text-sm font-medium">Shop</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Available</h3>
              <p className="text-gray-600 mb-6">We're working on adding new categories soon.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Back to Home */}
      <div className='max-w-7xl mx-auto mt-12 text-center'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-black text-lg font-semibold hover:gap-3 transition-all duration-300 underline underline-offset-4'
        >
          <ArrowRight className='w-5 h-5 rotate-180' />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ViewAllCategories;