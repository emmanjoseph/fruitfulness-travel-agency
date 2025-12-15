import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { kenyanDestinations } from '@/constants';
import { Calendar1Icon, Clock10, MapPin, Send } from 'lucide-react';
import React from 'react'
import { faqs } from '../services/page';
import SemiFooter from '@/components/SemiFooter';
import Link from 'next/link';

const Kenya = () => {
  return (
    <section className='font-sans'>
      <div className="h-[50vh]  bg-[url(https://images.unsplash.com/photo-1679559429194-7fcc01396023?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMG5haXZhc2hhfGVufDB8fDB8fHww)] bg-center bg-cover">
        <div className="bg-gradient-to-r from-black via-black/80 to-transparent w-full h-full  gap-2.5">
           <div className="max-w-[1400px] mx-auto px-4 md:px-0 flex flex-col md:flex-row md:items-center gap-7 py-20 md:py-44">
               <h1 className='text-4xl md:text-6xl font-heading text-gray-50 mt-5'>
              Kenyan <br /> Safaris
           </h1>

             <p className="text-base max-w-lg text-gray-100 font-medium">
  Kenyan safaris offer breathtaking encounters with diverse wildlife, stunning landscapes, and vibrant cultures. From the iconic Maasai Mara to the scenic Amboseli and Tsavo parks, each safari promises unforgettable adventures and a true taste of Africa’s natural beauty.
</p>
           </div>
           
        </div>
         
       </div>

       <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-12">
        <h1 className='font-heading text-2xl text-gray-700'>Popular Destinations in Kenya</h1>
          <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            kenyanDestinations.map((destination)=>{
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

                   className="w-full md:w-1/2 h-56 md:h-72 rounded-[35px]" />

                   <div className='flex flex-col gap-2.5'>

                    <p className='flex flex-row gap-1.5 items-center font-bold text-amber-500'><Calendar1Icon size={17}/> <span>{numberOfDays} days</span></p>
                    <p className='flex flex-row gap-1.5 items-center font-bold text-gray-500 text-sm'><MapPin size={17}/> <span>{location}</span></p>
                      <h1 className='font-heading text-gray-700 text-xl'>{name}</h1>
                      <p className='max-w-sm text-sm text-gray-600'>
                        {description.split(' ').slice(0, 20).join(' ')}...
                      </p>
                      <div className="text-sm md:text-base font-medium text-gray-600">
                        <p className='flex flex-row items-center font-semibold gap-1.5'><Clock10 size={16} className='text-amber-500 '/> best time to visit</p>
                        
                        {bestTimeToVisit}
                        </div>
                         
                         <Link href={`/kenya-safaris/${id}`}>
                            <button className='bg-emerald-700 text-white font-semibold rounded-3xl py-3 w-full md:w-2/3 flex flex-row items-center justify-center cursor-pointer gap-1.5'>
                          <span>Explore</span>
                          <Send size={16}/>
                        </button>
                         </Link>
                       
                   </div>
                 </div>
              )
            })
          }
        </div>

        <div className='space-y-3 flex flex-col items-center py-10'>
          <h1 className='font-heading text-2xl'>FAQs</h1>
          <Accordion type="single" collapsible className="w-full tour-card p-6 space-y-3 rounded-[35px]">
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
       </div>
       <SemiFooter/>
    </section>
  )
}

export default Kenya