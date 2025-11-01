import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Portfolio } from '../models/Portfolio';
import { PortfolioImage } from '../models/PortfolioImage';
import { getPortfolioWithImages } from '../service/PortfolioService';
import { BASE_URL } from '../config';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>([]);

  useEffect(() => {
    if (id) {
      getPortfolioWithImages(Number(id)).then(data => {
        setPortfolio(data.portfolio);
        setImages(data.images);
      });
    }
  }, [id]);

  if (!portfolio) return <p>Loading...</p>;

  return (
    <>
    <div className='bg-blue-950 px-10 py-40 text-white'>
      <h2 className="text-4xl text-center font-bold text-white mt-20">{portfolio.project_name}</h2>
      <p className="text-2xl text-center text-white mt-10">{portfolio.description || "ไม่มีคำอธิบาย"}</p>
    </div>
    <h4 className="text-2xl font-semibold text-gray-700 mt-5 text-center ">รูปภาพ</h4>
    <div className="p-5 max-w-8xl max-h-4xl mt-5">
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map(img => (
            <img
              key={img.portfolio_images_ID}
              src={`${BASE_URL}${img.image_url}`}
              alt="Project"
              className="w-full h-90 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PortfolioDetail;
