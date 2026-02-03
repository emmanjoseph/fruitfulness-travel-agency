"use client"
import gsap from 'gsap'
import { ArrowRight, StarIcon } from 'lucide-react'
import Image from 'next/image'
import SplitText from "gsap/SplitText"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import ImageInfiniteScroller from '../ImageInfiniteScroller'

  gsap.registerPlugin(SplitText)


const Hero = () => {

  useEffect(()=>{
     const split = SplitText.create(".hero-text",{
    type:"words"
  });

  gsap.from(split.words, {
    y:100,
    autoAlpha:0,
    stagger:{
      amount:0.8,
      from:"random"
    }
  })
  })
 
  return (
    <section className='pt-36 py-10 flex flex-col items-center  gap-10 overflow-hidden'>
       <div className="px-4 z-20 space-y-3 flex flex-col items-center">
        <Link className='' href={'/'}>
        <Badge className='bg-emerald-700 shadow text-white p-2 flex items-center gap-2.5'>
          <p className="font-bold">Explore plenty of destinations</p>
          <ArrowRight/>
        </Badge>
        </Link>
        
         <h1 className='text-5xl lg:text-[58px] font-heading text-gray-700 hero-text text-center'>Your journey starts here</h1>
         <p className="text-gray-700 text-base font-medium max-w-[590px] hero-text text-center">
          From serene beaches to vibrant cities, Fruitfulness helps you explore the world with ease. Plan, book, and live the adventure you’ve always dreamed of.
         </p>

         <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
             <StarIcon size={17} className='text-amber-500 fill-amber-500' key={index}/>
            ))}
          </div>
           <h4 className='text-lg text-gray-700 font-semibold'>1000 + Excellent reviews</h4>
         </div>


         <div className="flex flex-col gap-3.5 md:flex-row">
          <Link href={'#features'}>
              <button className='w-full py-3 px-5 rounded-full flex items-center justify-center gap-1.5 hover:gap-2 cursor-pointer bg-emerald-700 hover:bg-emerald-600 transition-all duration-300 text-white'>
               <span className='font-semibold'>Start planning</span>
               <ArrowRight />
            </button>
          </Link>
            
         </div>

       </div>
         <ImageInfiniteScroller/>

    </section>
  )
}

export default Hero