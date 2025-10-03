import { Mail, Phone } from 'lucide-react'
import React from 'react'

const Banner = () => {
  return (
    <div className=' w-full bg-emerald-700 font-sans'>
        <div className="max-w-[1440px] mx-auto flex flex-row text-white px-4 py-2">
            <p className="flex flex-row items-center">
                <Phone size={15}/>
                <span className='font-semibold text-sm'>+ 254 769 322 991</span>
            </p>

            <p className="flex flex-row items-center gap-1.5 ml-10">
                <Mail size={15}/>
                <span className='font-semibold text-sm'> info@fruitfulnesstravel.co.ke</span>
            </p>
        </div>
    </div>
  )
}

export default Banner