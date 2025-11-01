import React from "react";

const Footer = () =>{
    return(
        <footer className="bg-blue-950 text-amber-50 py-10 px-4 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-2xl font-bold mb-4">SP&SONS</h3>
                    <p>34 ซ.ประชาอุทิศ 33 แยก 15 แขวงบางมด<br></br> เขตทุ่งครุ กรุงเทพมหานคร</p>
                    <p>โทร: 0882455024</p>
                    <p>kittikorn.not@gmail.com</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">เมนู</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:underline">สินค้าของเราและบริการของเรา</a></li>
                        <li><a href="/" className="hover:underline">ผลงานของร้านเรา</a></li>
                        <li><a href="/" className="hover:underline">เกี่ยวกับเรา</a></li>
                        <li><a href="/" className="hover:underline">ฟอร์มคำนวนราคา</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">ติดต่อเรา</h3>
                    <ul className="space-y-2">
                        <li><a href="#" aria-label="facebook">Facebook</a></li>
                        <li><a href="#" aria-label="facebook">Line</a></li>
                        <li><a href="#" aria-label="facebook">Phone</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;