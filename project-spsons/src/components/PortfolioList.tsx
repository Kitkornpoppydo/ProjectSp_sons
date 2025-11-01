import React, { useEffect, useState } from 'react';
import { Portfolio } from '../models/Portfolio';
import { getAllPortfolios } from '../service/PortfolioService';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    getAllPortfolios().then(setPortfolios);
  }, []);

  return (
    <>
      <div className="p-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p) => (
            <Link
              to={`/portfolio/${p.portfolios_ID}`}
              key={p.portfolios_ID}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 block"
            >
              {p.image_url && (
                <img
                  src={`${BASE_URL}${p.image_url}`}
                  alt={p.project_name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-blue-950 mb-2">{p.project_name}</h3>
              <p className="text-gray-600 mb-4">{p.description || "ไม่มีคำอธิบาย"}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioList;
