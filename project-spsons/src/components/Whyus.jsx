import React from "react";
import test1 from "../assets/test1.jpg"


const Whyus = () =>{
    return(
        <div
            id="whyus"
            className="w-full px-6 lg:px-32 py-16 h-full flex flex-col items-center gap-12"
        >
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* รูปภาพ */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={test1}
                        alt="whyus"
                        className="rounded-lg w-[800px]  h-auto"
                    />
                </div>


                {/* เหตุผล */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h2 className="text-4xl font-bold text-blue-950 mb-4">
                       ทำไมต้องเลือก SP & Sons?
                    </h2>

                    <div className="bg-blue-100 p-5 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold mb-2 text-blue-950">
                            ผ้าม่านคุณภาพ พร้อมดีไซน์ที่ลงตัว
                        </h3>
                        <p className="text-blue-950 text-[20px]">
                            คัดสรรเนื้อผ้าคุณภาพสูง พร้อมดีไซน์สวยงามที่เข้ากับทุกสไตล์บ้าน
                        </p>
                    </div>

                    <div className="bg-blue-100 p-5 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold mb-2 text-blue-950">
                            งานประณีต โดยทีมช่างมืออาชีพ
                        </h3>
                        <p className="text-blue-950 text-[20px]">
                            ทุกขั้นตอนตัดเย็บและติดตั้งดำเนินการโดยช่างผู้ชำนาญงาน
                        </p>
                    </div>

                    <div className="bg-blue-100 p-5 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold mb-2 text-blue-950">
                            มากกว่า 30 ปีแห่งความไว้วางใจ
                        </h3>
                        <p className="text-blue-950 text-[20px]">
                            ประสบการณ์ยาวนาน รับประกันความมั่นใจจากลูกค้าทั่วประเทศ
                        </p>
                    </div>

                    <div className="bg-blue-100 p-5 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold mb-2 text-blue-950">
                            ให้คำปรึกษาโดยผู้เชี่ยวชาญเฉพาะทาง
                        </h3>
                        <p className="text-blue-950 text-[20px]">
                            แนะนำแบบผ้าม่านที่เหมาะสมกับลักษณะห้องและงบประมาณ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Whyus;