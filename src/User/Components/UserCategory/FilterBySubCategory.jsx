import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import axios from 'axios';

const FilterBySubCategory = ({ categoryId, handleSubCategory }) => {
    const { BASE_URL } = useContext(AppContext);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!categoryId) return;

            try {
                const response = await axios.get(`${BASE_URL}/user/subCategory/get`);
                // Filter subcategories that belong to ANY of the selected categories
                const filterSubCategory = response.data.filter(
                    subcat => categoryId.includes(subcat.MainCategory.id)
                );
                setSubCategories(filterSubCategory);
            } catch (error) {
                console.error("Error fetching subcategories:", error.response || error.message);
            }
        }; 

        fetchSubCategories();
    }, [categoryId]);

    const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory.id);
        handleSubCategory(subCategory.id);
    };

    const clearSubCategoryFilter = () => {
        setSelectedSubCategory(null);
        handleSubCategory(null);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                {selectedSubCategory && (
                    <button
                        onClick={clearSubCategoryFilter}
                        className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Horizontal Scrollable for Mobile */}
            <div className="flex space-x-5 overflow-x-auto pb-4 hide-scrollbar">
                {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                        <div
                            key={subCategory.id}
                            onClick={() => handleSubCategoryClick(subCategory)}
                            className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-transform duration-300 transform-gpu 
                                ${selectedSubCategory === subCategory.id ? 'scale-105' : 'hover:scale-105'}
                                px-2 pt-1`}
                        >
                            {/* Circular Border Wrapper */}
                            <div
                                className={`relative w-16 h-16 xl:w-20 xl:h-20 rounded-full p-[3px] border-2 ${
                                    selectedSubCategory === subCategory.id
                                        ? 'border-[#a89160] shadow-md'
                                        : 'border-gray-300 hover:border-[#a89160]'
                                }`}
                            >
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src={subCategory.SubImageUrl}
                                        alt={subCategory.title}
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.src = '/no-image.jpg';
                                        }}
                                    />
                                </div>
                            </div>

                            <span
                                className={`mt-2 text-xs font-medium text-center capitalize px-3 py-1 rounded-full whitespace-nowrap ${
                                    selectedSubCategory === subCategory.id
                                        ? 'bg-[#a89160] text-white font-semibold'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {subCategory.title}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-2">
                        <p className="text-gray-500 text-sm">No collections available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBySubCategory;