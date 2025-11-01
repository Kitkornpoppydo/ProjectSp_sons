
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./Page/Home"
import Blog1 from "./components/Blog1"
import Contact from "./components/Contact"
import Whyus from "./components/Whyus"
import About from "./Page/About"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCard from "./components/ProductCard"
import ProductCategoryList from "./Page/ProductCategoryList";
import PortfolioList from "./components/PortfolioList";
import Portfolio from "./Page/Portfolio"
import PortfolioDetail from "./components/PortfolioDetail";
import FabricColorGallery from "./components/FabricColorGallery";
import { EstimateForm } from "./components/EstimateForm";




function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
           <Route path="/About" element={<About />} />
           <Route path="/ProductCategoryList" element={<ProductCategoryList />} />
           <Route path="Portfolio" element={<Portfolio />} />
           <Route path="/portfolio/:id" element={<PortfolioDetail />} />
           <Route path="/FabricColorGallery" element={<FabricColorGallery />} />
           <Route path="/EstimateForm" element={<EstimateForm />} />
           <Route path="/" element={
          <>
          <Home />
          <ProductCard />
          <Blog1 />
          <PortfolioList />
          <Whyus />
          <Contact />
            </>
           } />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
