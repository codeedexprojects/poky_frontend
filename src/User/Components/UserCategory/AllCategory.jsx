import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import FilterBySize from './FilterBySize';
import FilterByMaterial from './FilterByMaterial';
import FilterByPrice from './FilterByPrice';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import FilterBySubCategory from './FilterBySubCategory';
import { MdZoomOutMap } from 'react-icons/md';
import { ImageZoomModal } from '../ImageZoomModal/ImageZoomModal';
import { CgArrowLongLeft } from "react-icons/cg";
import FilterByCategory from './FilterByCategory';

const AllCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productsCategory = location.state?.category || [];
    const { BASE_URL, fetchWishlistProducts } = useContext(AppContext);

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [heartIcons, setHeartIcons] = useState({});
    const [openImageModal, setOpenImageModal] = React.useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const [openUserNotLogin, setOpenUserNotLogin] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const userId = localStorage.getItem('userId');

    // handle non logged users modal
    const handleOpenUserNotLogin = () => {
        setOpenUserNotLogin(!openUserNotLogin);
    };

    // Filter states
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, Infinity]);

    //handle image zoom
    const handleOpenImageZoom = (productImages, index) => {
        setOpenImageModal(!openImageModal);
        setZoomImage({ images: productImages, currentIndex: index });
    }

    // fetch products
    const fetchProducts = async () => {
        try {
            const params = userId ? { userId } : {};
            const response = await axios.get(`${BASE_URL}/user/products/products/category/${productsCategory?.id}`, { params });
            setProducts(response.data);
            setAllProducts(response.data); // Save the original list
            setIsLoading(false);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error.response || error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, [productsCategory.id]);

    // Function to apply all filters
    const applyFilters = () => {
        let filteredProducts = [...allProducts];

        // Apply category filter - UPDATED for multiple categories
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => {
                    // Handle both single category (string) and multiple categories (array)
                    if (Array.isArray(product.category)) {
                        return product.category.some(cat => cat._id === selectedCategory);
                    } else {
                        return product.category._id === selectedCategory;
                    }
                }
            );
        }

        // Apply subcategory filter - UPDATED for multiple subcategories
        if (selectedSubCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => {
                    // Handle both single subcategory (string) and multiple subcategories (array)
                    if (Array.isArray(product.subcategory)) {
                        return product.subcategory.some(subcat => subcat._id === selectedSubCategory);
                    } else {
                        return product.subcategory._id === selectedSubCategory;
                    }
                }
            );
        }

        // Apply size filter (unchanged)
        if (selectedSize) {
            filteredProducts = filteredProducts.filter((product) =>
                product.colors.some((color) => color.sizes.some((s) => s.size === selectedSize))
            );
        }

        // Apply material filter (unchanged)
        if (selectedMaterial) {
            filteredProducts = filteredProducts.filter(
                (product) => product.features.material === selectedMaterial
            );
        }

        // Apply price range filter (unchanged)
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange;
            filteredProducts = filteredProducts.filter(
                (product) => product.offerPrice >= minPrice && product.offerPrice <= maxPrice
            );
        }

        setProducts(filteredProducts);
    };

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Handle individual filter changes
    const handleSubCategory = (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
    };

    const handleSizeFilter = (size) => {
        setSelectedSize(size);
    };

    const handleMaterialFilter = (material) => {
        setSelectedMaterial(material);
    };

    const handlePriceFilter = (range) => {
        setPriceRange(range);
    };

    // Reapply filters whenever a filter state changes
    useEffect(() => {
        applyFilters();
    }, [selectedSize, selectedMaterial, selectedSubCategory, selectedCategory, priceRange]);

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
            } else {
                toast.error(`${productTitle} removed from wishlist`);
                setHeartIcons(prev => ({ ...prev, [productId]: false }));
                fetchProducts();
                fetchWishlistProducts();
            }

        } catch (error) {
            throw new Error(error)
        }
    };

    // Helper function to get category name for display
    const getCategoryName = (product) => {
        if (Array.isArray(product.category)) {
            return product.category.map(cat => cat.name).join(', ');
        }
        return product.category?.name || '';
    };

    // Helper function to get subcategory name for display
    const getSubcategoryName = (product) => {
        if (Array.isArray(product.subcategory)) {
            return product.subcategory.map(subcat => subcat.title).join(', ');
        }
        return product.subcategory?.title || '';
    };

    return (
        <>
            <div className='h-[calc(100vh-4rem)] pb-20'>
                {/* Header */}
                <div className='w-full h-10 sm:h-44 relative'>
                    <img src="/banner.jpg" alt="" className='w-full h-full object-cover' />

                    <div className='absolute inset-0 flex items-end justify-center mb-2 sm:mb-5'>
                        <h1 className='text-white text-xl sm:text-4xl font-medium capitalize flex items-center gap-2'>
                            <CgArrowLongLeft
                                onClick={() => navigate(-1)}
                                className="text-white text-lg sm:text-2xl cursor-pointer"
                            />
                            {productsCategory.name}
                        </h1>
                    </div>
                </div>

                {/* Filters - Optimized for mobile */}
                <div className="px-3 py-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-white">
                    <ul className='grid grid-cols-2 gap-2 xl:flex xl:items-center xl:space-y-0 xl:gap-5 xl:justify-center
                         lg:flex lg:items-center lg:space-y-0 lg:gap-5 lg:justify-center'>
                        <li className='col-span-1'><FilterByCategory handleCategoryFilter={handleCategoryFilter} /></li>
                       
                        <li className='col-span-1'><FilterBySize handleSizeFilter={handleSizeFilter} categoryId={productsCategory.id} /></li>
                        <li className='col-span-1'><FilterByMaterial handleMaterialFilter={handleMaterialFilter} categoryId={productsCategory.id} /></li>
                        <li className='col-span-1'><FilterByPrice handlePriceFilter={handlePriceFilter} /></li>
                    </ul>

                     <div className='mt-5 '><FilterBySubCategory categoryId={productsCategory.id} handleSubCategory={handleSubCategory} /></div>

                    {/* Products */}
                    <div className="xl:p-10 mt-6">
                        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-5">
                            {isLoading ? (
                                <div className='col-span-5 flex justify-center items-center h-[50vh]'>
                                    <AppLoader />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="col-span-5 flex flex-col justify-center items-center h-[50vh] text-center">
                                    <p className="text-xl font-semibold text-secondary">No products available,</p>
                                    <p className="text-md text-gray-700">Please check back later or try filtering the products.</p>
                                </div>
                            ) : (
                                products.map((product) => {
                                    return (
                                        <div className='group relative' key={product._id}>
                                            <Link 
                                                to={`/product-details/${product._id}/${product.category._id}`}
                                                state={{ 
                                                    productId: product._id, 
                                                    categoryId: Array.isArray(product.category) 
                                                        ? product.category[0]?._id 
                                                        : product.category?._id 
                                                }} 
                                                className="cursor-pointer"
                                            >
                                                <div className="w-full aspect-[2/3] rounded-xl overflow-hidden">
                                                    <img src={product.images[0]} alt="" className='w-full h-full object-cover rounded-xl shadow-md transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' onError={(e) => e.target.src = '/no-image.jpg'} />
                                                </div>
                                            </Link>
                                            <MdZoomOutMap
                                                onClick={() => handleOpenImageZoom(product.images, 0)}
                                                className='absolute top-2 left-2 cursor-pointer text-gray-600 bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                            />
                                            {product.isInWishlist || heartIcons[product._id] ? (
                                                <RiHeart3Fill onClick={() => handleWishlist(product._id, product.title)} className='absolute top-2 right-2 cursor-pointer text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md' />
                                            ) : (
                                                <RiHeart3Line onClick={() => handleWishlist(product._id, product.title)} className='absolute top-2 right-2 cursor-pointer bg-white text-gray-600 w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md' />
                                            )}
                                            <div className='mt-3'>
                                                <p className='font-medium text-sm xl:text-lg lg:text-lg truncate capitalize'>{product.title}</p>
                                                <p className='text-black-200 font-normal text-xs xl:text-sm lg:text-sm truncate overflow-hidden whitespace-nowrap w-40 xl:w-56 lg:w-48 capitalize'>{product.description.slice(0, 17) + '...'}</p>
                                                
                                                {/* Display multiple categories if available */}
                                                {Array.isArray(product.category) && product.category.length > 1 && (
                                                    <p className='text-xs text-gray-500 mt-1'>
                                                        Categories: {getCategoryName(product)}
                                                    </p>
                                                )}
                                                
                                                {/* Display multiple subcategories if available */}
                                                {Array.isArray(product.subcategory) && product.subcategory.length > 1 && (
                                                    <p className='text-xs text-gray-500'>
                                                        Collections: {getSubcategoryName(product)}
                                                    </p>
                                                )}
                                                
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
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

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

export default AllCategory;