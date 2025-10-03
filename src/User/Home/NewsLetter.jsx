import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      // Add your subscription logic here
      setEmail('');
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Small Label */}
        <p className="text-gray-600 text-sm mb-3">Our Newsletter</p>
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
          Subscribe to Our Newsletter to<br />
          Get Updates on Our Latest Offers
        </h2>
        
        {/* Subtext */}
        <p className="text-gray-600 text-base md:text-lg mb-8">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        
        {/* Email Input Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-6 py-3.5 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-gray-700 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
}