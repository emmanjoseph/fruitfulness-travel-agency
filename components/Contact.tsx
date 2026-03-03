"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const Contact = () => {


  return (
    <section id='contact' className=''>

          <div
  className="h-100 lg:h-150 relative bg-[url('https://images.unsplash.com/photo-1597046878594-c238e356fee2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden"
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0  bg-gradient-to-t from-black/90 via-black/70 to-black/10" />

  {/* Content */}
  <div className="relative z-10 h-full py-20">
    <div className="flex flex-col items-center justify-center w-full h-full px-4">
      <h1 className="font-heading text-4xl md:text-5xl text-center max-w-2xl">
        Ready to embark on your next adventure? 
      </h1>

      <p className="text-center max-w-xl mt-4 text-gray-300">
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