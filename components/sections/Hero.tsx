import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden font-sans">
      {/* Background Video */}
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Content */}
      <div className="max-w-[1400px] h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Left Side */}
        <div className="w-full h-full md:w-1/2 flex flex-col justify-between text-white py-16">
          <div className="space-y-6 mt-36 md:mt-48">
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
              Your journey <br /> starts here
            </h1>
            <h2 className="text-lg font-semibold text-gray-200">
              Discover Hidden Gems & Unforgettable Adventures
            </h2>
            <p className="text-base text-gray-300 max-w-lg">
              From serene beaches to vibrant cities, Fruitfulness helps you explore the
              world with ease. Plan, book, and live the adventure you’ve always dreamed of.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-neutral-900 font-semibold px-6 py-4 rounded-full hover:bg-white transition flex items-center justify-between gap-1.5">
                <span className="font-semibold">explore more</span>
                <ArrowDown className="animate-bounce" />
              </button>
            </div>

            
          </div>
          {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-start">
                <h3 className="text-3xl md:text-4xl font-bold text-violet-400">100+</h3>
                <p className="text-sm md:text-base text-gray-300">Destinations</p>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-3xl md:text-4xl font-bold text-violet-400">3K+</h3>
                <p className="text-sm md:text-base text-gray-300">Happy Travelers</p>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-3xl md:text-4xl font-bold text-violet-400">10+</h3>
                <p className="text-sm md:text-base text-gray-300">Years of Service</p>
              </div>
            </div>
        </div>

        {/* Right Side (Optional Image/Visual) */}
        <div className="hidden md:block w-1/2">
        <div className='columns-3'>
          <Image
            src="/images/Tsavo.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg aspect-square my-5"
          />
          <Image
            src="/images/lamu.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg aspect-square"
          />
          <Image
            src="/images/mombasa.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg my-5"
          />
          <Image
            src="/images/diani.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg aspect-square object-cover"
          />
          <Image
            src="/images/samburu.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg my-5 aspect-square object-cover"
          />
          <Image
            src="/images/safari.jpg"
            alt="travel-hero"
            width={500}
            height={500}
            className="h-full rounded-3xl shadow-lg my-2 aspect-square"
          />
         
        </div>
          
        </div>
      </div>
    </section>
  )
}

export default Hero
