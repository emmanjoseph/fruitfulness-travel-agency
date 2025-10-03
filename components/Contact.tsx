import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



const ImageClipBox = ({src, clipClass}: {src: string, clipClass: string})=>{
  return (
    <div className={clipClass}>
            <Image src={src} alt='image' width={500} height={500} />
            </div>
  )
}

const Contact = () => {


  return (
    <section className='h-[570px] relative bg-emerald-700 bg-fixed text-gray-200'>
      <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
          src='/images/lamu.jpg'
          clipClass='contact-clip-path-1'
          />

          <ImageClipBox
          src='/images/lamu2.jpg'
          clipClass='contact-clip-path-2 lg:translate-y-40 translate-y-60'
          />
        </div>

         <div className="absolute -top-40 left-20  w-60  sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
        <ImageClipBox
          src='/images/naivasha.jpg'
          clipClass='absolute md:scale-125'
          />

        <ImageClipBox
          src='/images/samburu.jpg'
          clipClass='swordman-clip-path md:scale-125'
          />
        </div>
       <div className="max-w-[1400px] mx-auto py-20">
         <div className='flex flex-col items-center justify-center w-full h-full px-4'>
           <h1 className='font-heading text-4xl md:text-5xl text-center max-w-2xl'>
              Ready to embark on your next adventure? Contact us today!
           </h1>

           <p className='text-center max-w-xl mt-4'>
             Our team of travel experts is here to help you plan your dream trip. Whether you have questions or need assistance with booking, we&apos;re just a message away.
           </p>

           <button className='mt-6 bg-white rounded-3xl px-6 py-3.5 hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 hover:gap-4 duration-300 '>
            <span className='text-neutral-900 font-semibold'>Get in touch</span>
            <ArrowRight size={18} className='text-neutral-900'/>
           </button>
         </div>
       </div>
    </section>
  )
}

export default Contact