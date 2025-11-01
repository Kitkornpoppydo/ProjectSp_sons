import React, { useEffect, useState } from 'react';
import { ProductCategory } from '../models/ProductCategory';
import { getAllProductCategories } from '../service/ProductCategoryservice';
import { BASE_URL } from '../config';

const ProductCategoryList = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllProductCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-blue-950 px-10 py-40 text-white">
        <h1 className="text-center text-5xl font-bold mt-15 mb-4">
          สินค้าและบริการของเรา
        </h1>
      </div>
      <div className="pt-30 px-20 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-blue-900 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 "
            >
              {category.image && category.image.startsWith('/uploads/') && (
                <div className="overflow-hidden rounded-t-2xl h-[600px] bg-blue-100">
                  <img
                    src={`${BASE_URL}${category.image}`}
                    alt={category.name}
                    className="w-full h-[700px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 text-center">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-20 md:gap-20">
        <div className="p-2 w-full lg:w-[500px] h-[300px]">
          <div className="flex rounded-lg h-full  bg-blue-900 p-8 flex-col">
            <div className="flex items-center mb-35">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-white text-4xl font-bold">เลือกดูสีที่ชอบ</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <a href="/FabricColorGallery" className="mt-3 text-white hover:text-blue-600 inline-flex items-center text-2xl">กดดูเพิ่มเติม
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="p-2 w-full lg:w-[500px] h-[300px]">
          <div className="flex rounded-lg h-full bg-blue-900 p-8 flex-col">
            <div className="flex items-center mb-35">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-white  text-4xl font-bold">ฟอร์มคำนวนราคา</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <a href="/EstimateForm" className="mt-3 text-white  hover:text-blue-600 inline-flex items-center text-2xl">กดเพื่อคำนวนราคา
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>



  );
};

export default ProductCategoryList;
