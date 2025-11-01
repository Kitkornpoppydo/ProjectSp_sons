import React from "react";
import Newlogo from '../assets/newlogo.png';
import Contact from "../components/Contact";
import Whyus from '../components/Whyus';


const About = () => {
    return (
        <>
            <div className="bg-blue-950 px-10 py-40 text-white">

                <h1 className="text-center text-5xl font-bold mt-15 mb-4">
                    เกี่ยวกับร้านเรา
                </h1>

            </div>
            <section className="w-full px-6 md:px-36 py-50 bg-white flex flex-col items-center">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
                    {/*logo image*/}
                    <div  className="w-full lg:w-1/2 flex justify-center">
                        <img src={Newlogo} className="rounded-xl shadow-xl w-[250px] md:w-[300px] lg:w-[350px] h-auto" />
                    </div>

                    {/*content*/}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            SP&SONS (เอส พี แอนด์ ซัน)
                        </h2>
                        <p className="text-gray-600 text-base md:text-[25px] leading-relaxed font-Prompt">
                            บริการออกแบบ ตัดเย็บติดตั้งผ้าม่าน วอลล์เปเปอร์ มู่ลี่ ม่านม้วน ม่านปรับแสง ฉากกั้นห้อง ทุกชนิด โดยช่างผู้มีประสบการณ์กว่า 30 ปี รับรองคุณภาพด้วยผลงานกว่า 1000 หลังราคาโรงงาน รับรองถูกกว่าและดีกว่า แน่นอน
                        </p>
                    </div>
                </div>
            </section>
            <Whyus />
            <Contact />
        </>

    );
}

export default About;