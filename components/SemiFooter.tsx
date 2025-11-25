"use client"
import { ArrowLeft, ArrowUp, AtSign, Building, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SemiFooter = () => {
  const router = useRouter()
  return (
    <div className='py-24 border-t border-gray-200'>
           <div className='max-w-[1400px] mx-auto px-4'>
        <div className="w-full flex flex-col items-center md:flex-row justify-between mb-11">
         
            <Image
               src={'/logo.jpg'}
               alt='logo'
               width={500}
               height={500}
               className='size-40'
            />
         


               
                 <div className=''>
                   <h1 className='text-base font-semibold text-gray-800 mb-1'>Main Office</h1>
                             <div className='space-y-1.5'>
                                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Building className='text-orange-400' size={15}/>View Park Towers, Monrovia Street,Utalii Lane-17th Floor,</p>
                                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><AtSign size={15} className='text-blue-700'/>info@fruitfulnesstravel.co.ke</p>
                                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Phone size={15} className='text-green-900'/> + 254 769 322 991</p>
                                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Mail size={15}/>PO.BOX 46435 - 00100, Nairobi, Kenya </p>
                                             </div>
                                             
                                          </div>                          


        </div>

       

           <div className="flex flex-col lg:flex-row items-center pt-10 lg:justify-between border-t border-gray-300 gap-10">

            <div className="flex items-center gap-4">
            <Link href={'https://www.instagram.com/fruitfulnesstravelltd?igsh=YTZwaW43ZXRxNDAx'}>
      <Image src={'/images/instagram.png'} alt='instagram' width={24} height={24}/>
    </Link>
    <Link href={'https://wa.me/254769322991'}>
      <Image src={'/images/whatsapp.png'} alt='whatsapp' width={24} height={24}/>
    </Link>
          </div>

          

          <button
          onClick={()=> router.back()}
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowLeft/>
             Back to home page
          </button>

          <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowUp/>
             Back to top
          </button>

          <span className='text-sm text-gray-500'>&copy; 2025 Fruitfulness Travel LTD. All rights reserved.</span>
          </div>
        </div>
    </div>
  )
}

export default SemiFooter