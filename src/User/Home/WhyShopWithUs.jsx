import React from 'react';
import { Leaf, Shield, Headphones, Star, ArrowRight } from 'lucide-react';

export default function WhyShopWithUs() {
  const features = [
    {
      icon: Leaf,
      title: 'Sustainable Design',
      description: 'Eco-friendly materials for mindful, lasting fashion',
      theme: 'light'
    },
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Crafted with the finest materials and attention to detail',
      theme: 'dark'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for your needs',
      theme: 'dark'
    },
    {
      icon: Star,
      title: 'Satisfaction Guaranteed',
      description: '30-day return policy for your peace of mind',
      theme: 'light'
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Shop With Us
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
              Experience the POKY difference with our commitment to quality, service, and satisfaction which he poky is making a good product with amazing budget pricing so that they can wear in all climate range
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
              Learn More
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${
                    feature.theme === 'dark' 
                      ? 'bg-black border border-white/20' 
                      : 'bg-white text-black'
                  } rounded-2xl p-6 transition-transform hover:scale-105 duration-300`}
                >
                  <div className={`${
                    feature.theme === 'dark' ? 'bg-white' : 'bg-black'
                  } w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <Icon 
                      size={24} 
                      className={feature.theme === 'dark' ? 'text-black' : 'text-white'} 
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${
                    feature.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}