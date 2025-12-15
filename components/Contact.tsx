"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const Contact = () => {


  return (
   <section
  className="relative h-[570px] mt-7 rounded-t-[100px] bg-[url('https://plus.unsplash.com/premium_photo-1697729918007-3ff509bb2468?w=900&auto=format&fit=crop&q=60')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden"
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 rounded-t-[100px] bg-gradient-to-t from-black/80 via-black/60 to-black/10" />

  {/* Content */}
  <div className="relative z-10 max-w-[1400px] mx-auto h-full py-20">
    <div className="flex flex-col items-center justify-center w-full h-full px-4">
      <h1 className="font-heading text-4xl md:text-5xl text-center max-w-2xl">
        Ready to embark on your next adventure? Contact us today!
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
</section>

  )
}

export default Contact