import React from 'react'
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrLocation } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='bg-black text-white pt-16 pb-8 px-6 xl:px-16 lg:px-16'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-12 xl:gap-16 lg:gap-16">
          
          {/* Brand Section */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                <span className='text-black font-bold text-xl'>P</span>
              </div>
              <h1 className='text-2xl font-bold tracking-wider'>POKY</h1>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
              Premium clothing brand offering the finest quality apparel with modern design and comfort.
            </p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className='inline-block hover:text-gray-300 transition-colors'
            >
              <FaInstagram className='text-2xl' />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className='text-lg font-semibold mb-6'>Quick Links</h2>
            <ul className='space-y-3'>
              <li>
                <Link to='/' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/view-all-category' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Categories
                </Link>
              </li>
              <li>
                <Link to='/orders-tracking' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Order / Track Order
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className='text-lg font-semibold mb-6'>Customer Service</h2>
            <ul className='space-y-3'>
              <li>
                <Link to='/privacy-policy' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms-conditions' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to='/shipping-policy' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to='/refund-policy' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to='/refund-policy' className='text-gray-400 text-sm hover:text-white transition-colors'>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className='text-lg font-semibold mb-6'>Contact Info</h2>
            <ul className='space-y-4'>
              <li>
                <a
                  href="mailto:pokyonline@gmail.com"
                  className='flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group'
                >
                  <FaRegEnvelope className='text-lg mt-0.5 flex-shrink-0' />
                  <span>pokyonline@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919794237901"
                  className='flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group'
                >
                  <FiPhone className='text-lg mt-0.5 flex-shrink-0' />
                  <span>+91 79942 37901</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=Poky+Store+-+Adam+square,+Angamaly+-+680308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group'
                >
                  <GrLocation className='text-lg mt-0.5 flex-shrink-0' />
                  <span>Poky Store - Adam square, Angamaly - 680308</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-gray-400 text-sm'>
            © 2025 POKY. All rights reserved.
          </p>
          {/* <p className='text-gray-400 text-sm'>
            Created By KaZudo Graphics
          </p> */}
        </div>
      </div>
    </>
  )
}

export default Footer