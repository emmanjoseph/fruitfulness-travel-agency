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

  const destination = [
  {
    name: "Mombasa",
    href: "/"
  },
  {
    name: "Nairobi",
    href: "/"
  },
  {
    name: "Maasai Mara",
    href: "/"
  },
  {
    name: "Diani Beach",
    href: "/"
  },
  {
    name: "Lake Nakuru",
    href: "/"
  },
  {
    name: "Amboseli",
    href: "/"
  },
  {
    name: "Lamu",
    href: "/"
  },
  {
    name: "Mount Kenya",
    href: "/"
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
            <h3 className='font-semibold text-lg'>Destinations</h3>

            <div className="flex flex-col text-center md:text-start">
              {destination.map((link,idx)=>(
                 <Link key={idx} href={link.href}>
                  <span className='text-sm'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className='font-semibold text-lg'>Quick Links</h3>

            <div className="flex flex-col text-center md:text-start">
              {quickLinks.map((link,idx)=>(
                <Link key={idx} href={link.href}>
                  <span className='text-sm'>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-semibold text-lg'>Contact us</h3>

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

        <div className="md:flex flex-col md:flex-row items-center pt-10 justify-between gap-4 border-t border-gray-300">
          <span className='text-sm text-gray-500'>&copy; 2025 Fruitfulness Travel LTD. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <Link href={'/'}>
               <Image src={'/images/facebook.png'} alt='facebook' width={24} height={24}/>
            </Link>
            <Link href={'/'}>
               <Image src={'/images/instagram.png'} alt='instagram' width={24} height={24}/>
            </Link>
            <Link href={'/'}>
               <Image src={'/images/whatsapp.png'} alt='whatsapp' width={24} height={24}/>
            </Link>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer