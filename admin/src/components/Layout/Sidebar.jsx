import React, { useState } from 'react'
import Newlogo from '../../assets/newlogo.png';
import { BarChart3, Calendar, ChevronDown, CreditCard, FileText, LayoutDashboard, MessageSquare, Package, Settings, ShoppingBag, Users, Zap } from 'lucide-react';

const menuItems = [
    {
        id: "dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        active: true,
    },
    {
        id: "test1",
        icon: BarChart3,
        label: "test1",
        submenu: [
            { id: "test1-1", label: "Test1-1" },
            { id: "test1-2", label: "Test1-2" },
            { id: "test1-3", label: "Test1-3" },
        ],
    },
    {
        id: "test2",
        icon: Users,
        label: "Test2",
        submenu: [
            { id: "test2-1", label: "Test2-1" },
            { id: "test2-2", label: "Test2-2" },
            { id: "test2-3", label: "Test2-3" },
        ],
    },
    {
        id: "Product",
        icon: ShoppingBag,
        label: "จัดการสินค้า",
        submenu: [
            { id: "productcategories", label: "จัดการเพิ่มสินค้า" },
            { id: "products", label: "จัดการเพิ่มวัสดุ" },
        ],
    },
    {
        id: "stocks",
        icon: Package,
        label: "สต็อกอุปกรณ์",
    },
    {
        id: "test5",
        icon: CreditCard,
        label: "Test5",
    },
    {
        id: "test6",
        icon: MessageSquare,
        label: "Test6",
    },
    {
        id: "test7",
        icon: Calendar,
        label: "Test7",
    },
    {
        id: "test8",
        icon: Settings,
        label: "Test8",
    },
]


function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
    const [expandedItems, setExpendedItems] = useState(new Set(["test1"]));

    const toggleExpended = (itemid) => {
        const newExpanded = new Set(expandedItems);

        if (newExpanded.has(itemid)) {
            newExpanded.delete(itemid)
        } else {
            newExpanded.add(itemid)
        }

        setExpendedItems(newExpanded);
    };
    return (
        <div className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out bg-white/80 
     backdrop-blur-xl border-r border-slate-200/50 flex flex-col relative z-10`}>
            {/*logo*/}
            <div className='p-6 border-b border-slate-200/50'>
                <div className='flex items-center '>
                    <img src={Newlogo} alt="Logo" className="w-30 h-27" />
                </div>
            </div>
            <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                {menuItems.map((item) => {
                    return (
                        <div key={item.id}>
                            <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${currentPage === item.id || item.active ? "bg-blue-400 text-white shadow-lg shadow-blue-500/25" :
                                "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"

                                }`} onClick={() => {
                                    if (item.submenu) {
                                        toggleExpended(item.id);
                                    } else {
                                        onPageChange(item.id);
                                    }
                                }}  >
                                <div className='flex items-center space-x-3'>
                                    <item.icon className={'w-5 h-5'} />
                                    <>
                                        {!collapsed && (
                                            <span className='font-medium ml-2'>{item.label}</span>
                                        )}
                                    </>
                                </div>
                                {!collapsed && item.submenu && (
                                    <ChevronDown className={`w-4 h-4 transition-transform`} />
                                )}
                            </button>
                            {!collapsed && item.submenu && expandedItems.has(item.id) && (
                                <div className='ml-8 mt-2 space-y-1'>
                                    {item.submenu.map((subitem) => {
                                        return (
                                            <button
                                                key={subitem.id}
                                                className={`w-full text-left p-2 text-sm rounded-lg transition-all ${currentPage === subitem.id
                                                        ? "bg-blue-400 text-white"
                                                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                                                    }`}
                                                onClick={() => onPageChange(subitem.id)}
                                            >
                                                {subitem.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    );
                })}
            </nav>
        </div>
    )
}

export default Sidebar