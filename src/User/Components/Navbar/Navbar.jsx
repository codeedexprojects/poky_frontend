import React, { useContext, useState } from 'react'
import {
    Navbar,
    Typography,
    Button,
} from "@material-tailwind/react";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import BottomBar from '../BottomBar/BottomBar';
import { AppContext } from '../../../StoreContext/StoreContext';
import MobileSidebar from './MobileSidebar';
import { CategoryMenu } from './CategoryMenu';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { useEffect } from 'react';
import { SearchDesktopDrawer } from './SearchDesktopDrawer';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import MyWhatsapp from '../Whatsapp/Whatsapp';


const NavList = () => {
    const location = useLocation();
    const [navActive, setNavActive] = useState(() => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path == '/orders-tracking') return 'trackOrder'
        if (path == '/categories') return 'categories'
        if (path == '/contact') return 'contact'
    })

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setNavActive("home");
        if (path === '/orders-tracking') setNavActive("trackOrder");
        if (path === '/categories') setNavActive("categories");
        if (path === '/contact') setNavActive("contact");
    }, [location]);

    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            <Typography
                as="li"
                onClick={() => setNavActive("home")}
                className={`p-1 text-base font-medium font-custom transition-all duration-300 ease-in-out 
                    hover:text-black cursor-pointer ${navActive === "home" ? "text-black font-semibold" : "text-gray-700"}`}
            >
                <Link to="/" >
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                onClick={() => setNavActive("categories")}
                className={`p-1 text-base font-medium cursor-pointer font-custom transition-all duration-300 ease-in-out 
                    hover:text-black ${navActive === "categories" ? "text-black font-semibold" : "text-gray-700"}`}
            >
                <CategoryMenu />
            </Typography>
            <Typography
                as="li"
                onClick={() => setNavActive("trackOrder")}
                className={`p-1 text-base font-medium font-custom transition-all duration-300 ease-in-out 
                    hover:text-black cursor-pointer ${navActive === "trackOrder" ? "text-black font-semibold" : "text-gray-700"}`}
            >
                <Link to='/orders-tracking' >
                    Order / Track Order
                </Link>
            </Typography>
            <Typography
                as="li"
                onClick={() => setNavActive("contact")}
                className={`p-1 text-base font-medium font-custom transition-all duration-300 ease-in-out 
                    hover:text-black cursor-pointer ${navActive === "contact" ? "text-black font-semibold" : "text-gray-700"}`}
            >
                <Link to='/contact' >
                    Contact
                </Link>
            </Typography>
        </ul>
    );
}

const UserNavbar = () => {
    const { openDrawer, handleOpenDrawer, handleCloseDrawer, wishlist, cartItems } = useContext(AppContext)
    const location = useLocation();
    const isFavouritePage = location.pathname === "/favourite";
    const isCartPage = location.pathname === "/user-cart";
    const isSearch = location.pathname === '/user-search'
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
    const [openUserNotLogin, setOpenUserNotLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const cartView = cartItems?.length || 0;
    const favView = wishlist?.length || 0;

    const handleOpenUserNotLogin = () => {
        setOpenUserNotLogin(!openUserNotLogin);
    };

    const handleOpenSearchDrawer = () => setOpenSearchDrawer(true);
    const closeSearchDrawer = () => setOpenSearchDrawer(false);

    const token = localStorage.getItem("userToken")

    // pages where navbar don't visible
    const noNavbar = ["/customer-reviews", "/write-review", "/add-delivery-address", "/edit-delivery-address", "/select-delivery-address",
        "/select-tracking", "/order", '/forget-password', '/reset-otp', '/new-password', '/terms-conditions', '/privacy-policy']

    if (noNavbar.includes(location.pathname)) {
        return null
    }

    return (
        <>
            {/* 🔝 Top Strip */}
            <div className="w-full bg-black text-white text-center text-xs py-1" >
                Premium Quality Guaranteed
            </div>

            {/* Desktop Navbar */}
            <div className='hidden sticky top-0 w-full z-50 xl:block lg:block bg-white shadow-sm border-b'>
                <Navbar className="mx-auto max-w-screen-xl py-4 px-6 shadow-none rounded-none">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        {/* Logo */}
                        <div className="!w-32">
                            <Link to='/'>
                                <img src="/logo.png" alt="POKY" className='w-full object-contain' />
                            </Link>
                        </div>

                        {/* Navigation Menu */}
                        <div className="hidden lg:block">
                            <NavList />
                        </div>

                        {/* Right Side - Search + Icons */}
                        <div className="flex items-center gap-6">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search an item"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={handleOpenSearchDrawer}
                                    className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition-colors cursor-pointer"
                                />
                                <button
                                    onClick={handleOpenSearchDrawer}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-1.5 hover:bg-gray-800 transition-colors">
                                    <RiSearch2Line className="text-sm" />
                                </button>
                            </div>

                            {/* Icons */}
                            <div className="flex items-center gap-4">
                                {/* Wishlist */}
                                <Link to='/favourite' className="relative hover:text-black transition-colors">
                                    <FiHeart className="text-2xl text-gray-700 hover:text-black" />
                                    {favView > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {favView}
                                        </span>
                                    )}
                                </Link>

                                {/* Cart */}
                                <Link to='/user-cart' className="relative hover:text-black transition-colors">
                                    <FiShoppingCart className="text-2xl text-gray-700 hover:text-black" />
                                    {cartView > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartView}
                                        </span>
                                    )}
                                </Link>

                                {/* User */}
                                {token ? (
                                    <UserProfile />
                                ) : (
                                    <Link to='/login-user'>
                                        <FiUser className="text-2xl text-gray-700 hover:text-black transition-colors" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Navbar>
                <MyWhatsapp />
            </div>

            {/* Mobile Navbar */}
            <div className='xl:hidden lg:hidden sticky top-0 z-10 flex justify-between items-center bg-white shadow-md py-4 px-4'>
                <ul className='flex items-center gap-5'>
                    <li onClick={handleOpenDrawer} className='text-2xl text-black hover:text-black/70'><IoMenu /></li>
                    <Link to='/'><li className="w-24 cursor-pointer">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </li></Link>
                </ul>
                <ul className='flex items-center gap-3'>
                    <Link to='/user-search'>
                        <li className='text-2xl text-black hover:text-black/70'>
                            {isSearch ?
                                <RiSearch2Fill className='text-black' /> :
                                <RiSearch2Line />
                            }
                        </li>
                    </Link>
                </ul>
            </div>
            <MyWhatsapp />

            <BottomBar />
            <MobileSidebar openDrawer={openDrawer} handleCloseDrawer={handleCloseDrawer} />
            <SearchDesktopDrawer open={openSearchDrawer} closeSearchDrawer={closeSearchDrawer} />
            <UserNotLoginPopup open={openUserNotLogin} handleOpen={handleOpenUserNotLogin} />
        </>
    )
}


export default UserNavbar