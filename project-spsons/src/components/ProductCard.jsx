import React from "react";
import Test1 from "../assets/test1.jpg";
import Product1 from "../assets/product1.jpg";
import Product2 from "../assets/product2.jpg";
import Product3 from "../assets/product3.jpg";
import Product4 from "../assets/product4.jpg";
import Product5 from "../assets/product5.jpg";
import Product6 from "../assets/product6.jpg";
import Test3 from "../assets/test3.jpg";
import Pro2 from "../assets/pro2.jpg";
import Pro3 from "../assets/pro3.jpg";
import Pro4 from "../assets/pro4.jpg";



const ProductCard = () => {
  return (
    <>
      <div class="text-center p-30">
        <h1 class="font-bold text-5xl text-blue-950 mb-8">สินค้าของเราและบริการของเรา</h1>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-20 mt-2 mb-5">
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product1} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">ม่านลอน</p>
          </div>
        </div>
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product3} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">มูลี่</p>
          </div>
        </div>
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product4} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">ฉากกั้นห้อง</p>
          </div>
        </div>
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product2} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">ม่านม้วน</p>
          </div>
        </div>
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product5} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">ม่านพับ</p>
          </div>
        </div>
        <div className="w-110 bg-blue-900 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img src={Product6} alt="Logo" class="h-90 w-110 object-cover rounded-t-xl" />
          <div className="px-26 py-6 w-110">
            <p class="text-2xl font-bold text-white truncate block capitalize text-center">ม่านจีบ</p>
          </div>
        </div>
      </div>
      <ol className=" border-l border-blue-300 dark:border-neutral-500 md:flex md:justify-center md:gap-20 md:border-l-0 md:border-t mt-30 px-20">
        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div className="ml-4 mt-4 pb-5 md:ml-0">
            <h4 className="mb-8 text-xl font-semibold text-blue-950">
              วัดพื้นที่
            </h4>
            <img src={Test3} alt="Logo" class="h-90 w-110 object-cover rounded" />
          </div>
        </li>
        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div className="ml-4 mt-4 pb-5 md:ml-0">
            <h4 className="mb-8 text-xl font-semibold text-blue-950">
              เลือกสีที่ชอบพร้อมประเมินราคา
            </h4>
            <img src={Pro2} alt="Logo" class="h-90 w-110 object-cover rounded" />
          </div>
        </li>
        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div className="ml-4 mt-4 pb-5 md:ml-0">
            <h4 className="mb-8 text-xl font-semibold text-blue-950">
              ตัดเย็บ
            </h4>
            <img src={Pro3} alt="Logo" class="h-90 w-110 object-cover rounded" />
          </div>
        </li>
        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div className="ml-4 mt-4 pb-5 md:ml-0">
            <h4 className="mb-8 text-xl font-semibold text-blue-950">
              นัดติดตั้ง
            </h4>
            <img src={Pro4} alt="Logo" class="h-90 w-110 object-cover rounded" />
          </div>
        </li>
      </ol>
      <div class="flex flex-wrap justify-center mt-30 md:gap-80">
        <div class="p-2 w-full lg:w-[600px] h-[400px]">
          <div class="flex rounded-lg h-full  bg-blue-900 p-8 flex-col">
            <div class="flex items-center mb-55">
              <div
                class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 class="text-white text-4xl font-bold">เลือกดูสีที่ชอบ</h2>
            </div>
            <div class="flex flex-col justify-between flex-grow">
              <a href="/FabricColorGallery" class="mt-3 text-white hover:text-blue-600 inline-flex items-center text-2xl">กดดูเพิ่มเติม
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="p-2 w-full lg:w-[600px] h-[400px]">
          <div class="flex rounded-lg h-full bg-blue-900 p-8 flex-col">
            <div class="flex items-center mb-55">
              <div
                class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 class="text-white  text-4xl font-bold">ฟอร์มคำนวนราคา</h2>
            </div>
            <div class="flex flex-col justify-between flex-grow">
              
              <a href="/EstimateForm" class="mt-3 text-white  hover:text-blue-600 inline-flex items-center text-2xl">กดเพื่อคำนวนราคา
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;