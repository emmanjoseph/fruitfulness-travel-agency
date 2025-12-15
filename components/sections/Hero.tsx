"use client"
import gsap from 'gsap'
import { ArrowRight, StarIcon } from 'lucide-react'
import Image from 'next/image'
import SplitText from "gsap/SplitText"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'

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
    <section className=' pt-36 lg:pt-40 py-10 flex flex-col items-center  gap-10 overflow-hidden md:h-[95vh]'>
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


         <div className="mt-3 flex flex-col gap-3.5 md:flex-row">
          <Link href={'#features'}>
              <button className='w-full py-3 px-5 rounded-full flex items-center justify-center gap-1.5 hover:gap-2 cursor-pointer bg-emerald-700 hover:bg-emerald-600 transition-all duration-300 text-white'>
               <span className='font-semibold'>Start planning</span>
               <ArrowRight />
            </button>
          </Link>
            
         </div>
       </div>

      <div className="w-full flex gap-4 items-end">

  <Image
    src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=2367"
    width={300}
    height={420}
    alt="img"
    className="rounded-4xl object-cover h-[420px] w-[260px]"
  />

  <Image
    src="https://plus.unsplash.com/premium_photo-1723774894918-635e6eee6572?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FmYXJpfGVufDB8fDB8fHww"
    width={300}
    height={360}
    alt="img"
    className="rounded-4xl object-cover h-[360px] w-[180px] -mt-12"
  />

  <Image
    src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D"
    width={300}
    height={440}
    alt="img"
    className="rounded-4xl object-cover h-[440px] w-[300px]"
  />

  <Image
    src="https://images.unsplash.com/photo-1646159755791-54e741749028?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnQlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D"
    width={300}
    height={400}
    alt="img"
    className="rounded-4xl object-cover h-[400px] w-[260px] -mt-16"
  />

  <Image
    src="https://images.unsplash.com/photo-1708119063168-4785d1359824?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlhbml8ZW58MHx8MHx8fDA%3D"
    width={300}
    height={360}
    alt="img"
    className="rounded-4xl object-cover h-[360px] w-[200px]"
  />

  <Image
    src="https://images.unsplash.com/photo-1688496761159-e9df8bf438a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFtdXxlbnwwfHwwfHx8MA%3D%3D"
    width={300}
    height={420}
    alt="img"
    className="rounded-4xl object-cover h-[420px] w-[240px] -mt-10"
  />

  <Image
    src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=2367"
    width={300}
    height={360}
    alt="img"
    className="rounded-4xl object-cover h-[360px] w-[200px]"
  />

</div>


    </section>
  )
}

export default Hero