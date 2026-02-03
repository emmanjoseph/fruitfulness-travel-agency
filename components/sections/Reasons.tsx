import React from 'react'
import Image from 'next/image'

const Reasons = () => {
    const answers = [
        {
            heading:"Expertly curated travel experiences",
            description:"Our team of travel experts handpicks each destination and activity to ensure you have an unforgettable adventure.",
            imgUrl:"/images/experience.png"
        },
        {
            heading:"Personalized safaris for every traveler",
            description:"We tailor each safari to your interests, whether you're a wildlife enthusiast, photographer, or seeking cultural experiences.",
            imgUrl:"/images/personalized.jpg"
        },
        {
            heading:"Top-rated guides and support",
            description:"Our knowledgeable guides and 24/7 support team are dedicated to making your safari safe, enjoyable, and hassle-free.",
            imgUrl:"/images/rated.jpg"
        },
    ]
  return (
    <div className='mx-auto max-w-[1400px] px-4 py-20 space-y-4'>
         <h2 className="text-center text-4xl font-semibold text-gray-900">
          Why choose us?
        </h2>

        <div className="grid lg:grid-cols-3 gap-4">
            {answers.map(({heading,description,imgUrl})=> (
                <div key={heading} className='rounded-4xl bg-gray-200/15 p-5 space-y-4'>
                    <Image src={imgUrl} alt={heading} width={200} height={200} className='size-24 rounded-full object-cover'/>

                    <div className='space-y-1'>
                        <h1 className="font-semibold text-gray-600 text-lg">{heading}</h1>
                        <p className='text-gray-600 text-[15px] max-w-sm'>{description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Reasons