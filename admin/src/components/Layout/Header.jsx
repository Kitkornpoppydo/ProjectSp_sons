import React from 'react'
import { Badge, icons, Menu } from 'lucide-react';

function Header({ sidebarCollapsed, onToggleSidebar }) {
  return (
    <div className='bg-white/80 backdrop:blue-xl border-b border-slate-200/50 px-6 py-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <button className='p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors' onClick={onToggleSidebar}>
                    <Menu className = "w-5 h-5" /> 
                </button>
                <div className='hidden md:block'>
                    <h1 className='text-2xl font-black text-slate-800'>Dashboard</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header