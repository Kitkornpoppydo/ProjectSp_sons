import React from "react";

const Contact = () => {
    return (
        <section id="contact" className="bg-blue-100 text-white py-10 px-4 md:px-10 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-30">
                {/* แผนที่ */}
                <div className="flex-1">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d969.2691715760521!2d100.50704026955573!3d13.653098999170542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDM5JzExLjIiTiAxMDDCsDMwJzI3LjciRQ!5e0!3m2!1sth!2sth!4v1750333476613!5m2!1sth!2sth"
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    ></iframe>
                </div>

                {/* ช่องทางการติดต่อ */}
                <div className="flex-1 flex flex-col justify-center gap-10">
                    <h2 className="text-5xl text-blue-950 font-bold mb-8">ช่องทางการติดต่อ</h2>
                    <div className="space-y-4 text-xl">
                        <p className="text-2xl text-blue-950"><strong>Facebook:</strong> <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-2xl">SP & SONS ผ้าม่าน</a></p>
                        <p className="text-2xl text-green-600"><strong>LINE:</strong> <a href="https://line.me/ti/p/yourlineid" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline text-2xl">@spandsons</a></p>
                        <p className="text-2xl text-black"><strong>เบอร์โทร:</strong> <a href="tel:0812345678" className="hover:underline text-2xl">081-234-5678</a></p>
                    </div>
                </div>

            </div>
        </section>


    );
}

export default Contact;