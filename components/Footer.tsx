import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {IconBrandInstagram, IconBrandWhatsapp} from "@tabler/icons-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const destinations = [
    {
      name:"Explore all destinations",
      href:"/services"
    },
    {
      name:"Kenya",
      href:"/kenya-safaris"
    },
    {
      name:"Tanzania",
      href:"/tanzania-safaris"
    },
    {
      name:"Uganda",
      href:"/tanzania-safaris"
    },

  ]

  const topTags = [
    {
      name:"Wildlife",
      href:"/"
    },
    {
      name:"Mountains",
      href:"/"
    },
    {
      name:"Sandy beaches",
      href:"/"
    },
    {
      name:"Adventure",
      href:"/"
    },

  ]

  const quickLinks = [
    {
      name:"Contact us",
      href:""
    },
    {
      name:"About Us",
      href:"/about"
    },
    {
      name:"Terms and Conditions",
      href:"/terms"
    },
    {
      name:"Privacy Policy",
      href:"/terms"
    }
  ]


  return (
    <footer className='py-20 px-4 text-gray-300/80 bg-black'>
      <div className="container mx-auto flex flex-col gap-5">
         <div className="flex flex-col lg:flex-row gap-5 md:gap-0 lg:items-center justify-between">
           <Image src={'/logo.jpg'} alt={'logo'} width={300} height={200} className={'size-30 lg:size-50 rounded-full'}/>

        <div className='flex flex-col md:flex-row gap-8 md:gap-28 pt-14 pb-28'>
          <div>
            <h3 className='font-medium text-lg text-start mb-1 font-heading text-white'>Destinations</h3>

            <div className="flex flex-col text-start space-y-1.5">
              {destinations.map((link,idx)=>(
                <Link key={idx} href={link.href}>
                  <span className='text-[14px] font-medium'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-medium text-lg text-start mb-1 font-heading text-white'>Travel Categories</h3>

            <div className="flex flex-col text-start space-y-1.5">
              {topTags.map((link,idx)=>(
                  <Link key={idx} href={link.href}>
                    <span className='text-[14px] font-medium'>{link.name}</span>
                  </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-medium text-lg text-start mb-1 font-heading text-white'>Quick Links</h3>

            <div className="flex flex-col text-start space-y-1.5">
              {quickLinks.map((link,idx)=>(
                <Link key={idx} href={link.href}>
                  <span className='text-[14px] font-medium'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

       
          
       </div>

       <div className="flex flex-col lg:flex-row items-center pt-16 lg:justify-between border-t border-gray-300/50 gap-6">

  <span className='text-sm text-gray-300/80 text-center'>&copy;{year} Fruitfulness Travel LTD. All rights reserved.</span>
         <p className="text-sm text-gray-300/80 text-center">Web by <span className="font-bold">Category7+</span></p>
         

         <div className="flex items-center gap-4 justify-center">
           <Link href={'https://www.instagram.com/fruitfulnesstravelltd?igsh=YTZwaW43ZXRxNDAx'}>
             <IconBrandInstagram size={23}/>
           </Link>
           <Link href={'https://wa.me/254769322991'}>
             <IconBrandWhatsapp size={23}/>
           </Link>
         </div>

 
</div>
      </div>
      
    </footer>
  )
}

export default Footer