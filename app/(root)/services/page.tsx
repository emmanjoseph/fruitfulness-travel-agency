import EmblaCarousel from '@/components/Carousel'
import SemiFooter from '@/components/SemiFooter'
import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { kenyanDestinations, mostPopularDestinations } from '@/constants'
import { AccordionItem } from '@radix-ui/react-accordion';
import { Calendar1Icon, Clock10, MapPin, Plane } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export const faqs = [
  {
    question: "Do I need a visa to travel to Kenya?",
    answer: "International tourists usually require a visa to enter Kenya. You can apply for an eVisa online before your trip. East African residents may have different requirements."
  },
  {
    question: "What is the best time to visit Kenya for safaris and holidays?",
    answer: "The best time for safaris is July to October during the Great Migration. Coastal holidays are great year-round, but December to March and July to October offer the best beach weather."
  },
  {
    question: "Are your packages suitable?",
    answer: "Yes! We offer special rates and customized packages for local tourists, including weekend getaways and group discounts."
  },
  {
    question: "Is it safe to travel around Kenya?",
    answer: "Kenya is generally safe for both local and international tourists in popular destinations. We recommend traveling with reputable operators and following local advice."
  },
  {
    question: "What should I pack for my trip?",
    answer: "For safaris, pack layered clothing, comfortable shoes, sunscreen, and a camera. For coastal trips, bring swimwear, sandals, and light clothing. Local tourists should also carry identification."
  }
];

const Services = () => {
  return (
    <section className='font-sans'>
       <div className="h-[42vh]  bg-[url(/images/naivasha.jpg)] bg-center bg-cover">
        <div className="bg-gradient-to-r from-black via-black/70 to-transparent w-full h-full flex flex-col items-center justify-center gap-2.5">
           <h1 className='text-4xl font-heading text-gray-50 mt-5'>
  Travel In Style
</h1>

<p className="text-lg max-w-lg text-center text-gray-100 font-semibold">
  Discover a world of comfort, adventure, and unforgettable experiences.</p>
        </div>
         
       </div>

       <div className="py-8 max-w-[1400px] mx-auto text-gray-700 font-medium space-y-10 p-4">
        <div className='space-y-3'>
          <h1 className='font-heading text-2xl'>Top destinations</h1>
          <EmblaCarousel
            slides={kenyanDestinations}
          />
        </div>

        <div className='space-y-3'>
          <h1 className='font-heading text-2xl'>Explore New Destinations</h1>

           <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            mostPopularDestinations.slice(0,6).map((destination)=>{
              const {name,imageUrl,numberOfDays,location,bestTimeToVisit,description,id} = destination;
              return (
                 <div key={id} className='w-full flex flex-col md:flex-row gap-3 items-center shadow shadow-gray-300 p-2 rounded-[35px] tour-card'>
                   <div 
                   style={{
  backgroundImage: `url(${imageUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}}

                   className="w-full md:w-1/2 h-40 md:h-72 rounded-[35px]" />

                   <div className='flex flex-col gap-2.5'>

                    <p className='flex flex-row gap-1.5 items-center font-bold text-amber-500'><Calendar1Icon size={17}/> <span>{numberOfDays} days</span></p>
                    <p className='flex flex-row gap-1.5 items-center font-bold text-gray-500 text-sm'><MapPin size={17}/> <span>{location}</span></p>
                      <h1 className='font-heading text-gray-700 text-xl'>{name}</h1>
                      <p className='max-w-sm text-base text-gray-600'>
                        {description.split(' ').slice(0, 20).join(' ')}...
                      </p>
                      <div className="text-base text-gray-600">
                        <p className='flex flex-row items-center font-semibold gap-1.5'><Clock10 size={16} className='text-amber-500 '/> best time to visit</p>
                        
                        {bestTimeToVisit}
                        </div>
                         
                         <Link href={`/details/${id}`}>
                            <button className='bg-emerald-400 text-white font-semibold rounded-3xl py-3 w-full md:w-2/3 flex flex-row items-center justify-center cursor-pointer gap-1.5'>
                          <span>View details</span>
                          <Plane size={16}/>
                        </button>
                         </Link>
                       
                   </div>
                 </div>
              )
            })
          }
        </div>
          
        </div>


        <div className='space-y-3 flex flex-col items-center'>
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

        <SemiFooter/>
         
       </div>
    </section>
  )
}

export default Services