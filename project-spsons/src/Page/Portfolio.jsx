import React from "react";
import PortfolioList from "../components/PortfolioList";
const Portfolio = () => {
    return (
        <>
            <div className="bg-blue-950 px-10 py-40 text-white">
                <h1 className="text-center text-5xl font-bold mt-15 mb-4">
                    ผลงานของร้านเรา
                </h1>
            </div>
            <PortfolioList />
        </>
    );
}

export default Portfolio;