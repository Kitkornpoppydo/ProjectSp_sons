
import React, { useState } from 'react'
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProductCategories from './Page/Product/ProductCategories';
import Products from './Page/Product/Products';
import Stocks from './Page/Stock/Stocks';

function App() {

  const[sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const[currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () =>{
    switch(currentPage){
      case 'dashboard' : return <Dashboard />;
      case 'productcategories' : return <ProductCategories />;
      case 'products' : return <Products />;
      case 'stocks' : return <Stocks />;
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50
    to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
    transition-all duration-500'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar collapsed = {sideBarCollapsed} 
        onToggle={()=> setSideBarCollapsed(!sideBarCollapsed)}
        currentPage = {currentPage}
        onPageChange = {setCurrentPage} />
        <div className='flex-1 flex flex-col overflow-hidden'> 
          <Header sidebarCollapsed={sideBarCollapsed} onToggleSidebar={()=> setSideBarCollapsed(!sideBarCollapsed)} />  
           
           <main className='flex-1 overflow-y-auto bg-transpatent'>
              <div className='p-6 space-y-6'>
                {renderPage ()} 
              </div>
           </main>
        </div>
      </div>
    </div>
  )
}

export default App