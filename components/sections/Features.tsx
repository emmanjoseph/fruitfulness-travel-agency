import React from 'react'
import EmblaCarousel from '../Carousel'
import {  kenyanDestinations, tanzanianDestinations } from '@/constants'


const Features = () => {
  return (
    <div className='mx-auto max-w-[1440px] p-4 space-y-7 py-20' id='features'>
      <div className='flex flex-col gap-4 py-6'>
        <h1 className='font-semibold text-gray-700 text-4xl'>Featured Kenyan Safaris</h1>
         <p className="text-base text-gray-700 max-w-lg">
           Step into the wild heart of Africa. Kenya offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey.
         </p>
      </div>

          <EmblaCarousel slides={kenyanDestinations} />

          <div className='flex flex-col gap-4 py-6'>
            
        <h1 className='font-semibold text-gray-700 text-4xl'>Tanzanian Safaris</h1>
         <p className="text-base text-gray-700 max-w-lg">
          Discover Tanzania’s wild tapestry: from the endless plains of the Serengeti and the dramatic Ngorongoro Crater to the towering slopes of Kilimanjaro and the spice-scented beaches of Zanzibar. Experience world-class wildlife encounters, timeless cultures, and landscapes that shift from golden savannah to palm-fringed shores.
         </p>
      </div>

          <EmblaCarousel slides={tanzanianDestinations} />


      
    </div>
  )
}

export default Features