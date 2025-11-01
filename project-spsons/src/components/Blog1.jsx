import React, { useEffect } from "react";
import Newlogo from "../assets/newlogo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog1 = () => {
    useEffect(() =>{
        AOS.init(
            {
                duration: 800,
                delay:200,
                once:false,
            }
        );
    },[]);
    return(
        <section id="blog1" className="w-full px-6 md:px-36 py-50 bg-white flex flex-col items-center">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
                {/*logo image*/}
                <div data-aos="fade-right" className="w-full lg:w-1/2 flex justify-center">
                 <img src={Newlogo} className="rounded-xl shadow-xl w-[250px] md:w-[300px] lg:w-[350px] h-auto" />
                </div>

                {/*content*/}
                <div data-aos ="fade-left" className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
                 SP&SONS (เอส พี แอนด์ ซัน) 
                </h2>
                <p className="text-blue-950 text-base md:text-[25px] leading-relaxed font-Prompt">
                    บริการออกแบบ ตัดเย็บติดตั้งผ้าม่าน วอลล์เปเปอร์ มู่ลี่ ม่านม้วน ม่านปรับแสง ฉากกั้นห้อง ทุกชนิด โดยช่างผู้มีประสบการณ์กว่า 30 ปี รับรองคุณภาพด้วยผลงานกว่า 1000 หลังราคาโรงงาน รับรองถูกกว่าและดีกว่า แน่นอน
                </p>
                </div>
            </div>
        </section>
    );
}

export default Blog1; 