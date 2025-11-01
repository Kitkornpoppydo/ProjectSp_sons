import { ArrowRight } from 'lucide-react';
import React from 'react'

function Stats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-200/20
         transition-all duration-300 group'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-600 '>
                        Stats Title
                    </p>
                    <p className='text-3xl font-bold text-slate-800'>
                        Stats Value
                    </p>
                    <div className='flex items-center space-x-2'>
                        <ArrowRight className='w-4 h-4' />
                        <span>state change</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-200/20
         transition-all duration-300 group'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-600 '>
                        Stats Title
                    </p>
                    <p className='text-3xl font-bold text-slate-800'>
                        Stats Value
                    </p>
                    <div className='flex items-center space-x-2'>
                        <ArrowRight className='w-4 h-4' />
                        <span>state change</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-200/20
         transition-all duration-300 group'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-600 '>
                        Stats Title
                    </p>
                    <p className='text-3xl font-bold text-slate-800'>
                        Stats Value
                    </p>
                    <div className='flex items-center space-x-2'>
                        <ArrowRight className='w-4 h-4' />
                        <span>state change</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-200/20
         transition-all duration-300 group'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-600 '>
                        Stats Title
                    </p>
                    <p className='text-3xl font-bold text-slate-800'>
                        Stats Value
                    </p>
                    <div className='flex items-center space-x-2'>
                        <ArrowRight className='w-4 h-4' />
                        <span>state change</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Stats;