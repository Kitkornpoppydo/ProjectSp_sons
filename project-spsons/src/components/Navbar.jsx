import React from "react";
import Logo from '../assets/Logo.png';
import Newlogo from '../assets/newlogo.png';

const Navbar = () =>{
    return (
       <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-95 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
               
                    <div className="flex items-center space-x-4">
                        <img src={Newlogo} alt="Logo" className="w-30 h-27"/>
                        <h1 className="text-black text-xl md:text-2xl font-bold whitespace-nowrap">
                           
                        </h1>
                    </div>

                
                    <ul className="hidden md:flex space-x-8 text-black  font-medium">
                        <li><a href="/" className="hover:text-blue-900 text-[20px] transition duration-200">หน้าแรก</a></li>
                        <li><a href="/ProductCategoryList" className="hover:text-blue-900 text-[20px] transition duration-200">สินค้า/บริการ</a></li>
                        <li><a href="/Portfolio" className="hover:text-blue-900 text-[20px] transition duration-200">ผลงาน</a></li>
                        <li><a href="/About" className="hover:text-blue-900 text-[20px] transition duration-200">เกี่ยวกับเรา</a></li>
                        <li><a href="/EstimateForm" className="hover:text-blue-900 text-[20px] transition duration-200">ฟอร์มคำนวนราคา</a></li>
                    </ul>
                </div>
            </nav>
    );
}

export default Navbar;