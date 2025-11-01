import React, { useEffect, useState } from "react";
import Banner from "../assets/banner.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            delay: 200,
            once: false,
        });
    }, []);



    return (
        <section
                id='home'
                className="w-full lg:h-[1100px] lg:px-[200px] px-8 lg:pb-[80px] pb-5 pt-[180px] h-full flex lg:flex-row flex-col justify-between items-center gap-[100px] bg-cover bg-center"
                style={{ backgroundImage: `url(${Banner})` }}
            >
                <div className="lg:w-3/5 w-full flex flex-col justify-center items-start gap-8">
                    <h1 data-aos="zoom-in" className="text-white lg:text-3xl text-xl font-semibold font-popins">SP & SONS</h1>
                    <h1 data-aos="zoom-in" data-aos-delay="200" className="text-white text-5xl font-semibold font-popins">
                        Welcome to SP&SONS
                    </h1>
                    <h1 data-aos="zoom-in" data-aos-delay="400" className="text-white text-4xl font-semibold">
                        ผ้าม่าน ติดตั้งม่าน มูลี่ ม่านม้วน ฉากกั้นห้อง
                    </h1>
                </div>
            </section>
    );
}

export default Home;