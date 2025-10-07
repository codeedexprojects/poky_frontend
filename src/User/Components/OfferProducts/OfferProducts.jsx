import React, { useContext, useState, useEffect } from 'react';
import { RxHeart } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdZoomOutMap } from 'react-icons/md';
import { ImageZoomModal } from '../ImageZoomModal/ImageZoomModal';

const OfferProducts = () => {
    const { BASE_URL, fetchWishlistProducts, setWishlist } = useContext(AppContext);
    const [offerProducts, setOfferProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [heartIcons, setHeartIcons] = useState({});
    const [showAllOffer, setShowAllOffer] = useState(false);
    const [openImageModal, setOpenImageModal] = React.useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const [openUserNotLogin, setOpenUserNotLogin] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
    
        // Cleanup function
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const userId = localStorage.getItem('userId');

    // handle non logged users modal
    const handleOpenUserNotLogin = () => {
        setOpenUserNotLogin(!openUserNotLogin);
    };

    // handle image zoom
    const handleOpenImageZoom = (productImages, index) => {
        setOpenImageModal(!openImageModal);
        setZoomImage({ images: productImages, currentIndex: index });
    }

    // fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/category/get`);
                setCategories(response.data);
                setCategoriesLoading(false);
            } catch (error) {
                console.error(error);
                console.log("Category data could not be fetched.");
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, [BASE_URL]);

    // fetch offer products
    const fetchOfferProducts = async () => {
        try {
            const params = userId ? { userId } : {}; // Only include userId if it exists
            const response = await axios.get(`${BASE_URL}/user/products/view-products`, { params });
            const filteredProducts = response.data.filter(product => product.isOfferProduct);
            setOfferProducts(filteredProducts);
            setFilteredProducts(filteredProducts); // Initialize filtered products with all offer products
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching offer products:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOfferProducts();
    }, []);

    // Filter products by category
    const filterProductsByCategory = (categoryName) => {
        setSelectedCategory(categoryName);
        
        if (categoryName === 'All') {
            setFilteredProducts(offerProducts);
        } else {
            const filtered = offerProducts.filter(product => 
                product.category && product.category.name === categoryName
            );
            setFilteredProducts(filtered);
        }
        setShowAllOffer(false); // Reset view all when filter changes
    };

    const handleWishlist = async (productId, productTitle) => {
        try {
            if (!userId) {
                handleOpenUserNotLogin();
                return;
            }
            const payload = { userId, productId };

            const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload);
            console.log(response.data);

            if (response.data.isInWishlist) {
                toast.success(`${productTitle} added to wishlist`);
                setHeartIcons(prev => ({ ...prev, [productId]: true }));
                fetchWishlistProducts();
            } else {
                toast.error(`${productTitle} removed from wishlist`);
                setHeartIcons(prev => ({ ...prev, [productId]: false }));
                fetchOfferProducts();
                fetchWishlistProducts();
            }

        } catch (error) {
            throw new Error(error)
        }
    };

    const visibleProducts = showAllOffer
        ? filteredProducts
        : filteredProducts.slice(0, screenWidth < 640 ? 6 : 5);

    return (
        <>
            <div className='mb-6'>
                <h1 className='text-secondary text-2xl md:text-3xl lg:text-4xl font-bold text-center xl:text-left mb-3'>
                    <b>Featured Products</b>
                </h1>
                <p className='text-gray-600 text-base md:text-lg lg:text-lg mt-2 text-center xl:text-left'>
                    Discover our curated selection of premium clothing, blending modern style with <br /> unparalleled comfort
                </p>

                
                {/* Filter Buttons */}
                <div className='flex items-center gap-3 mt-4 flex-wrap'>
                    <button 
                        onClick={() => filterProductsByCategory('All')}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                            selectedCategory === 'All' 
                            ? 'border-gray-300 bg-black text-white hover:bg-gray-900' 
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        All
                    </button>
                    
                    {categoriesLoading ? (
                        <div className="flex gap-3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="px-5 py-2 rounded-full border border-gray-300 bg-gray-200 animate-pulse">
                                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        categories.map((category) => (
                            <button 
                                key={category.id}
                                onClick={() => filterProductsByCategory(category.name)}
                                className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                                    selectedCategory === category.name 
                                    ? 'border-gray-300 bg-black text-white hover:bg-gray-900' 
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))
                    )}
                </div>

                {/* Selected category info */}
                {selectedCategory !== 'All' && (
                    <div className="mt-3">
                        <p className="text-gray-600 text-sm">
                            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in {selectedCategory}
                        </p>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="col-span-2 flex justify-center items-center h-[50vh]">
                    <AppLoader />
                </div>
            ) : filteredProducts.length === 0 ? (
                <p className='col-span-5 flex items-center justify-center h-[50vh]'>
                    {selectedCategory === 'All' 
                        ? 'No featured products available' 
                        : `No featured products available in ${selectedCategory}`
                    }
                </p>
            ) : (
                <>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 pb-2'>
                        {visibleProducts.map(product => {
                            return (
                                <div className='group relative' key={product._id}>
                                    <Link
                                        to={`/product-details/${product._id}/${product.category._id}`}
                                        state={{ productId: product._id, categoryId: product.category?._id }}
                                        className="cursor-pointer"
                                    >
                                        <div className='w-full aspect-[2/3] relative rounded-xl overflow-hidden'>
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className='w-full h-full object-cover rounded-xl shadow-md transition-transform duration-500 ease-in-out group-hover:scale-105'
                                                onError={(e) => (e.target.src = '/no-image.jpg')}
                                            />
                                        </div>
                                    </Link>
                                    <MdZoomOutMap
                                        onClick={() => handleOpenImageZoom(product.images, 0)}
                                        className='absolute top-2 left-2 cursor-pointer text-gray-600 bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                    />
                                    {product.isInWishlist || heartIcons[product._id] ? (
                                        <RiHeart3Fill
                                            onClick={() => handleWishlist(product._id, product.title)}
                                            className='absolute top-2 right-2 cursor-pointer text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                        />
                                    ) : (
                                        <RiHeart3Line
                                            onClick={() => handleWishlist(product._id, product.title)}
                                            className='absolute top-2 right-2 cursor-pointer bg-white text-gray-600 w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                        />
                                    )}
                                    <div className='mt-3'>
                                        <h4 className='font-medium text-sm xl:text-lg lg:text-lg capitalize truncate w-40 xl:w-60 lg:w-60'>
                                            {product.title.slice(0, 15) + '...'}
                                        </h4>
                                        <p className='text-black-200 capitalize text-xs xl:text-sm lg:text-sm truncate w-40 xl:w-60 lg:w-60'>
                                            {product.description.slice(0, 20) + '...'}
                                        </p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            {/* Star Rating */}
                                            <div className='flex items-center gap-1'>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        className={`w-3 h-3 xl:w-4 xl:h-4 lg:w-4 lg:h-4 ${star <= Math.floor(product.averageRating || 0)
                                                                ? 'text-yellow-400 fill-current'
                                                                : product.averageRating && star === Math.ceil(product.averageRating) && product.averageRating % 1 !== 0
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                {/* Average Rating Number */}
                                                <span className='text-xs xl:text-sm lg:text-sm text-gray-600 ml-1'>
                                                    ({product.averageRating ? product.averageRating.toFixed(1) : '0.0'})
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <p className='text-black text-sm xl:text-base lg:text-base font-semibold'>
                                                ₹{product.offerPrice % 1 >= 0.9 ? Math.ceil(product.offerPrice) : Math.floor(product.offerPrice)}
                                            </p>
                                            <p className='text-black/70 text-xs xl:text-sm lg:text-sm line-through'>
                                                ₹{product.actualPrice % 1 >= 0.9 ? Math.ceil(product.actualPrice) : Math.floor(product.actualPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredProducts.length > 5 && (
                        <div className='flex justify-center items-center pb-8'>
                            <Button
                                onClick={() => setShowAllOffer(!showAllOffer)}
                                className='bg-transparent font-custom shadow-none text-black font-normal capitalize text-sm 
                                flex items-center gap-2 border border-black rounded-3xl px-3 py-2 hover:shadow-none'
                            >
                                {showAllOffer ? "View Less" : "View All"} {showAllOffer ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </Button>
                        </div>
                    )}
                </>
            )}

            <UserNotLoginPopup
                open={openUserNotLogin}
                handleOpen={handleOpenUserNotLogin}
            />

            <ImageZoomModal
                open={openImageModal}
                handleOpen={handleOpenImageZoom}
                zoomImage={zoomImage}
            />
        </>
    );
};

export default OfferProducts;