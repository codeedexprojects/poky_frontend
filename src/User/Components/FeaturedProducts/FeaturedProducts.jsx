import React, { useContext } from 'react';
import { RxHeart } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { useEffect } from 'react';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdZoomOutMap } from 'react-icons/md';
import { ImageZoomModal } from '../ImageZoomModal/ImageZoomModal';


const FeaturedProducts = () => {
    const { BASE_URL, setFav, fetchWishlistProducts, setWishlist } = useContext(AppContext);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [heartIcons, setHeartIcons] = useState({});
    const [showAllFeature, setShowAllFeature] = useState(false);
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


    //handle image zoom
    const handleOpenImageZoom = (productImages, index) => {
        setOpenImageModal(!openImageModal);
        setZoomImage({ images: productImages, currentIndex: index });
    }

    // fetch featured products
    const fetchFeaturedProducts = async () => {
        try {
            const params = userId ? { userId } : {}; // Only include userId if it exists
            const response = await axios.get(`${BASE_URL}/user/products/view-products`, { params });
            const filteredProducts = response.data.filter(product => product.isFeaturedProduct);
            setFeaturedProducts(filteredProducts)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching offer products:", error);
        }
    }
    useEffect(() => {
        fetchFeaturedProducts()
    }, [])

    // add to wishlist
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
                // setWishlist(prevFav => [...prevFav, { productId }]);
            } else {
                toast.error(`${productTitle} removed from wishlist`);
                setHeartIcons(prev => ({ ...prev, [productId]: false }));
                // setWishlist(prevFav => prevFav.filter(item => item.productId !== productId));
                fetchFeaturedProducts();
                fetchWishlistProducts();
            }

        } catch (error) {
            throw new Error(error)
        }
    };

    const visibleProducts = showAllFeature
        ? featuredProducts
        : featuredProducts.slice(0, screenWidth < 640 ? 6 : 5);


    return (
        <>
            <div className='mb-6'>
                <h1 className='text-secondary text-2xl md:text-3xl lg:text-4xl font-bold text-center xl:text-left mb-3'>
                    Recently Viewed
                </h1>

                <p className='text-gray-600 text-base md:text-lg lg:text-lg mt-2 text-center xl:text-left'>
                    Take another look at your favorites – the styles you browsed are waiting. Don’t let <br /> them slip away, they might sell out soon!
                </p>

                {/* Filter Buttons */}
                <div className='flex items-center gap-3 mt-4 flex-wrap'>
                    <button className='px-5 py-2 rounded-full border border-gray-300 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors'>
                        All
                    </button>
                    <button className='px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors'>
                        Mens
                    </button>
                    <button className='px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors'>
                        Ladies
                    </button>
                    <button className='px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors'>
                        Kids
                    </button>
                </div>
            </div>
            {
                isLoading ? (
                    <div className="col-span-2 flex justify-center items-center h-[50vh]">
                        <AppLoader />
                    </div>
                ) : featuredProducts.length === 0 ? (
                    <>
                        <p className='col-span-5 flex items-center justify-center h-[50vh]'>No products available</p>
                    </>
                ) : (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 pb-10'>
                            {
                                visibleProducts.map((product) => {
                                    return (
                                        <div className='group relative' key={product._id}>
                                            <Link
                                                to={`/product-details/${product._id}/${product.category._id}`}
                                                state={{
                                                    productId: product._id,
                                                    categoryId: product.category._id
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <div className='w-full aspect-[2/3] rounded-xl overflow-hidden'>
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        className='w-full h-full object-cover rounded-xl shadow-md
                                                        transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105'
                                                        onError={(e) => e.target.src = '/no-image.jpg'}
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
                                                <h4 className='font-medium text-sm xl:text-lg lg:text-lg capitalize truncate w-40 xl:w-60 lg:w-60'>{product.title.slice(0, 15) + '...'}</h4>
                                                <p className='text-black-200 font-normal text-xs xl:text-sm lg:text-sm capitalize truncate overflow-hidden 
                                                whitespace-nowrap w-40 xl:w-60 lg:w-60'>
                                                    {product.description.slice(0, 20) + '...'}
                                                </p>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <p className='text-black text-base xl:text-xl lg:text-xl font-semibold'>
                                                        ₹{product.offerPrice % 1 >= 0.9 ? Math.ceil(product.offerPrice) : Math.floor(product.offerPrice)}
                                                    </p>
                                                    <p className='text-black/70 text-sm xl:text-base lg:text-base line-through'>
                                                        ₹{product.actualPrice % 1 >= 0.9 ? Math.ceil(product.actualPrice) : Math.floor(product.actualPrice)}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        {featuredProducts.length > 5 && (
                            <div className='flex justify-center items-center pb-8'>
                                <Button
                                    onClick={() => setShowAllFeature(!showAllFeature)}
                                    className='bg-transparent font-custom shadow-none text-black font-normal capitalize text-sm 
                                    flex items-center gap-2 border border-black rounded-3xl px-3 py-2 hover:shadow-none'
                                >
                                    {showAllFeature ? "View Less" : "View All"} {showAllFeature ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </Button>
                            </div>
                        )}

                        <ImageZoomModal
                            open={openImageModal}
                            handleOpen={handleOpenImageZoom}
                            zoomImage={zoomImage}
                        />

                        <UserNotLoginPopup
                            open={openUserNotLogin}
                            handleOpen={handleOpenUserNotLogin}
                        />
                    </>
                )
            }
        </>
    )
}

export default FeaturedProducts