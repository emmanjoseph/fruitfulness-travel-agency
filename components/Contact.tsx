"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const Contact = () => {


  return (
    <section id='contact' className=''>

          <div
  className="h-100 lg:h-180 relative bg-[url('https://images.unsplash.com/photo-1532574754390-44dc5c6780bb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden"
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

  {/* Content */}
  <div className="relative z-10 h-full py-20">
    <div className="flex flex-col items-center justify-center w-full h-full px-4">
      <h1 className="font-heading font-bold text-4xl md:text-7xl text-center max-w-3xl">
        Ready to embark on your next adventure? 
      </h1>

      <p className="text-center max-w-xl mt-4 text-gray-300 lg:text-xl text-base">
        Our team of travel experts is here to help you plan your dream trip.
        Whether you have questions or need assistance with booking, we’re just a
        message away.
      </p>

      <button
        onClick={() =>
          (window.location.href = "mailto:info@fruitfulnesstravel.com")
        }
        className="mt-6 bg-white rounded-3xl px-6 py-3.5 text-neutral-900 font-semibold
                   hover:scale-105 transition-transform cursor-pointer
                   flex items-center gap-2 hover:gap-4 duration-300"
      >
        <span>Get in touch</span>
        <ArrowRight size={18} />
      </button>
    </div>
  </div>
</div>

  
    
    </section>
   

  )
}

export default Contact