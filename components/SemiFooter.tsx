"use client"
import { ArrowLeft, ArrowUp, AtSign, Building, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SemiFooter = () => {
  const router = useRouter()
  return (
    <div className='py-8'>
           <div className='max-w-[1400px] mx-auto px-4'>
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
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 px-2 py-1'>
            <ArrowLeft/>
             Back to home page
          </button>

          <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 px-2 py-1'>
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