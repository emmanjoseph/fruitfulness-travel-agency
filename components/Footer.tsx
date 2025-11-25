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
    {
      name:"Kenya destinations",
      href:"/kenya-safaris"
    },
    {
      name:"Tanzania destinations",
      href:"/tanzania-safaris"
    },

  ]


  return (
    <footer className='py-20 px-4 text-gray-600'>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
         <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">
        <div>
          <Image src={'/logo.jpg'} alt='logo' width={700} height={700} className='size-40 lg:size-52'/>
        </div>

        <div className='flex flex-col md:flex-row gap-8 md:gap-28 pb-14'>
          
          
          <div>
            <h3 className='font-semibold text-lg text-start mb-1'>Quick Links</h3>

            <div className="flex flex-col text-start space-y-1.5">
              {quickLinks.map((link,idx)=>(
                <Link key={idx} href={link.href}>
                  <span className='text-[15px] font-medium'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className=''>
                             <h1 className='font-semibold text-lg text-start mb-1'>Main Office</h1>
                             <div className='space-y-1.5'>
                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Building className='text-orange-400' size={15}/>View Park Towers, Monrovia Street,Utalii Lane-17th Floor,</p>
                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><AtSign size={15} className='text-blue-700'/>info@fruitfulnesstravel.co.ke</p>
                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Phone size={15} className='text-green-900'/> + 254 769 322 991</p>
                               <p className='text-[15px] font-medium text-gray-600 flex items-center gap-3'><Mail size={15}/>PO.BOX 46435 - 00100, Nairobi, Kenya </p>
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