import { testimonials } from '@/constants'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Testimonials = () => {
    const reasons = [
        {
            icon:"/images/experience.png",
            title:"Expertly curated travel experiences",
            description:"Our team of travel experts handpicks each destination and activity to ensure you have an unforgettable adventure.",
        },
        {
            icon:"/images/personalized.jpg",
            title:"Personalized safaris for every traveler",
            description:"We tailor each safari to your interests, whether you're a wildlife enthusiast, photographer, or seeking cultural experiences.",
        },
        {
            icon:"/images/rated.jpg",
            title:"Top-rated guides and support",
            description:"Our knowledgeable guides and 24/7 support team are dedicated to making your safari safe, enjoyable, and hassle-free.",
        }
    ]
  return (
    <section className='max-w-[1400px] mx-auto px-4 py-20'>
        <div className='flex flex-col items-center gap-4'>
            <h1 className='font-heading text-4xl text-gray-700'>Why Choose Us?</h1>


            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {reasons.map((reasons,idx)=>(
                    <div className="p-4" key={idx}>
                        <div className="flex items-center gap-1.5">
                            <div>
                                <Image src={reasons.icon} alt={reasons.title} width={500} height={500} className='size-20 md:size-48 object-contain'/>
                            </div>

                            <h4 className='text-lg font-semibold'>{reasons.title}</h4>
                        </div>

                        <p className='text-gray-600 mt-2 font-medium text-base'>
                            {reasons.description}
                        </p>
                    </div>
                ))}

            </div>

            <div className='mt-20 flex flex-col items-center gap-2'>
                <h1 className='font-heading text-4xl text-gray-700'>Testimonials</h1>
            <p className='text-gray-600 mt-2 font-medium text-base'>
                Here&apos;s what our clients have to say about their experiences with us.
            </p>

            {/* cards */}
            <div className="mt-7 lg:columns-3 md:columns columns-1 gap-3">
                {
                    testimonials.map((testimonial,idx)=> (
                        <div key={idx} className='break-inside-avoid mb-3 shadow-lg p-6 rounded-3xl border border-gray-200 bg-white'>

                             <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} className="text-yellow-400 fill-yellow-400 mb-4" />
          ))}
        </div>
                            <p className='text-gray-700 text-[15px]'>{testimonial.testimonial}</p>

                            <div className="mt-4 flex items-center gap-1.5 pt-4 border-t border-gray-200">
                                <div className="size-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-yellow-200">

                                </div>

                                <div>
                                    <h4 className='text-[15px] font-medium'>{testimonial.username}</h4>
                                    <span className='-mt-2 text-sm text-gray-500'>
            {new Date(testimonial.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
                                </div>
                            </div>

                        </div>
                    ))
                }

            </div>

            </div>
            
        </div>

        
    </section >
  )
}

export default Testimonials