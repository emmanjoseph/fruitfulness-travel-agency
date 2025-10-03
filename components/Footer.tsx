import { AtSign, Building, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

  const quickLinks = [
    {
      name:"Services",
      href:"/services"
    },
    {
      name:"About",
      href:"/about"
    },

  ]


  return (
    <footer className='py-20 px-4 text-gray-600'>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
         <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">
        <div>
          <Image src={'/logo.jpg'} alt='logo' width={700} height={700} className='size-32 lg:size-52'/>
        </div>

        <div className='flex flex-col md:flex-row gap-6 md:gap-16 pb-14'>
          
          
          <div>
            <h3 className='font-semibold text-lg text-center md:text-start'>Quick Links</h3>

            <div className="flex flex-col text-center md:text-start">
              {quickLinks.map((link,idx)=>(
                <Link key={idx} href={link.href}>
                  <span className='text-sm'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

           <div className=''>
                    <h1 className='text-base text-center md:text-start font-semibold text-gray-800 mb-1'>Main Office</h1>
                    <div className='space-y-1.5'>
                      <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Building className='text-orange-400' size={15}/>Viewpark Towers 17th floor</p>
                      <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Mail size={15}/>PO.BOX 46435 - 00100, Nairobi, Kenya </p>
                    </div>
                    
                 </div>

          <div>
            <h3 className='font-semibold text-lg text-center md:text-start'>Contact us</h3>

            <div className="flex flex-col text-center md:text-start">
              <span className="text-sm">
                Tel no: +254 769 322 991
              </span>

              <p className="text-sm py-2">
                <span className="font-bold">
                  Email : 
                </span> {" "}
            info@fruitfulnesstravel.co.ke
              </p>

              <p className="text-sm">
                <span className="font-bold">
                  General manager : 
                </span> {" "}
                felix@fruitfulnesstravel.com
              </p>
            </div>
          </div>

        </div>

       
          
       </div>

       <div className="flex flex-col lg:flex-row items-center pt-10 lg:justify-between border-t border-gray-300 gap-6">
         <div className="flex items-center gap-4 justify-center">
    <Link href={'https://www.instagram.com/fruitfulnesstravelltd?igsh=YTZwaW43ZXRxNDAx'}>
      <Image src={'/images/instagram.png'} alt='instagram' width={24} height={24}/>
    </Link>
    <Link href={'https://wa.me/254769322991'}>
      <Image src={'/images/whatsapp.png'} alt='whatsapp' width={24} height={24}/>
    </Link>
  </div>
  <span className='text-sm text-gray-500 text-center'>&copy; 2025 Fruitfulness Travel LTD. All rights reserved.</span>

 
</div>
      </div>
      
    </footer>
  )
}

export default Footer