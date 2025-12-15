import { faqs } from '@/constants'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
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
    <section className='bg-[url(/images/feature-bg.png)] py-12'>
        <div className='flex flex-col items-center gap-4 mx-auto max-w-[1440px] p-4 '>
            <h1 className='font-heading text-4xl text-gray-700'>Why Choose Us?</h1>


            <div className="flex flex-row gap-5">
                <div className="md:w-1/2 hidden md:flex items-center justify-center">
                   <Image
                      src={'/images/feature.png'}
                      alt='feature'
                      width={600}
                      height={600}
                   />
                </div>
                 <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {reasons.map((reasons,idx)=>(
                    <div className="p-4" key={idx}>
                        <div className="flex items-center gap-1.5">
                            <div>
                                <Image src={reasons.icon} alt={reasons.title} width={500} height={500} className='size-20 md:size-48 object-contain'/>
                            </div>

                            <h4 className='text-lg text-gray-800 font-semibold'>{reasons.title}</h4>
                        </div>

                        <p className='text-gray-600 mt-2 font-semibold text-base'>
                            {reasons.description}
                        </p>
                    </div>
                ))}

            </div>
            </div>
           
        </div>

         <div className='space-y-3 flex flex-col items-center max-w-2xl mx-auto'>
          <h1 className='font-heading text-2xl'>FAQs</h1>
          <Accordion type="single" collapsible className="w-full tour-card p-6  space-y-3 rounded-3xl">
  {faqs.map((faq, idx) => (
    <AccordionItem key={idx} value={`faq-${idx}`}>
      <AccordionTrigger className="font-semibold text-lg text-left text-gray-800">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-600 text-base">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
          
        </div>

        
    </section >
  )
}

export default Testimonials