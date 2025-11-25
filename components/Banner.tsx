import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className='hidden md:block w-full bg-emerald-700 font-sans'>
        <div className="max-w-[1440px] mx-auto flex flex-row justify-between text-white p-4">

          <div className='flex'>
            <p className="flex flex-row items-center">
                <Phone size={15}/>
                <span className='font-semibold text-sm'>+ 254 769 322 991</span>
            </p>

            <p className="flex flex-row items-center gap-1.5 ml-10">
                <Mail size={15}/>
                <span className='font-semibold text-sm'> info@fruitfulnesstravel.co.ke</span>
            </p>

          </div>

          <div className="flex items-center gap-4 justify-center">
    <Link href={'https://www.instagram.com/fruitfulnesstravelltd?igsh=YTZwaW43ZXRxNDAx'}>
      <Image src={'/images/instagram.png'} alt='instagram' width={20} height={20}/>
    </Link>
    <Link href={'https://wa.me/254769322991'}>
      <Image src={'/images/whatsapp.png'} alt='whatsapp' width={20} height={20}/>
    </Link>
  </div>
            
        </div>
    </div>
  )
}

export default Banner