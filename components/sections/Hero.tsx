import { ArrowDown, ArrowUpRight, MapPin, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='mx-auto max-w-[1440px] px-4 pt-36 lg:pt-52 py-10 flex flex-col lg:flex-row gap-10 overflow-hidden md:h-[95vh]'>
       <div className="absolute right-0 top-0 h-screen w-screen bg-[url('/images/pattern-bg.png')] bg-cover bg-center md:-right-28 xl:-top-60 left-0 top-0 ml-[-100px]" />
       <div className="z-20 md:w-1/2 space-y-7">
         <h1 className='text-5xl lg:text-[78px] font-heading text-gray-700'>Your journey <br />starts here</h1>
         <p className="text-gray-700 text-xl font-heading">Discover Hidden Gems & Unforgettable Adventures</p>
         <p className="text-gray-700 text-lg font-medium max-w-[500px]">
          From serene beaches to vibrant cities, Fruitfulness helps you explore the world with ease. Plan, book, and live the adventure you’ve always dreamed of.
         </p>

         <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
             <StarIcon size={17} className='text-amber-500 fill-amber-500' key={index}/>
            ))}
          </div>
           <h4 className='text-lg md:text-xl text-gray-700 font-semibold'>1000 + Excellent reviews</h4>
         </div>


         <div className="mt-11 flex flex-col gap-3.5 md:flex-row">
            <button className='tour-card px-4 py-3 flex items-center gap-2.5 cursor-pointer bg-emerald-500'>
               <span className='font-semibold'>Explore more</span>
               <ArrowDown className='animate-bounce'/>
            </button>

            <button className='tour-card px-4 py-3 flex items-center gap-2.5 cursor-pointer'>
               <span className='font-semibold'>More about us</span>
               <ArrowUpRight/>
               
            </button>
         </div>
       </div>

       <div className='flex items-start justify-center'>
          <div className="z-20 bg-black rounded-[35px] lg:w-[350px]">
             <Image src={'/images/lamu.jpg'}
               className='rounded-t-[35px] w-full'
               alt='lamu'
               width={300}
               height={300}
               
             />
              <div className="text-gray-300 font-sans font-medium p-5 space-y-1">
                 <p className='font-bold'>Diani Beach</p>
                 <p className='flex items-center gap-1.5 text-sm font-semibold'><MapPin className='fill-green-500 text-green-500' size={14}/>
                   <span>Kwale County, Kenya</span>
                 </p>

                 <span className='text-sm'>
                  Warm and humid year-round (28–34°C). Best time to visit is December–March and July–October when the weather is drier
                 </span>
              </div>
          </div>
       </div>

    </section>
  )
}

export default Hero