import EmblaCarousel from '@/components/Carousel'
import SemiFooter from '@/components/SemiFooter'

import InfiniteReviewScroll from '@/components/userTestimonials';
import { kenyanDestinations, mostPopularDestinations } from '@/constants'
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



const Services = () => {
  return (
    <section className='font-sans px-4 md:px-4 lg:px-0'>

       <div className="max-w-[1400px] mx-auto text-gray-700 font-medium space-y-10 py-4">
        <div className='space-y-3 pt-20'>
          <h1 className='font-semibold text-2xl'>Popular destinations and experiences</h1>
          <EmblaCarousel
            slides={mostPopularDestinations}
          />
        </div>


        <div className="space-y-2.5">
          <h1 className='font-semibold text-2xl'>Handpicked trips</h1>
          <p className='text-gray-600'>Explore well-planned trips designed for different travel styles and interests</p>

          <div className='mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
              kenyanDestinations.map((destination)=>{
                const {id,name,location,imageUrl,} = destination;
                return(
                  <Link href={`/kenya-safaris/${id}`} key={id} className='rounded-[35px] shadow-lg border border-gray-200'>
                    <div className='rounded-t-[35px]'>
                      <Image src={imageUrl} alt= {name} width={500} height={500} className='w-full h-60 rounded-t-[35px] object-center object-cover'/>
                    </div>

                    <div className="p-4">
                      <h1 className="font-semibold">
                        {name}
                      </h1>
                      <p className="flex items-center gap-0.5 text-sm text-gray-500 font-semibold">
                       <MapPin size={14}/> {location}
                      </p>
                    </div>
                    
                  </Link>
                )
              })
            }
          </div>
        </div>

        


       
        <div>
          <InfiniteReviewScroll/>
        </div>
        <SemiFooter/>
         
       </div>
    </section>
  )
}

export default Services