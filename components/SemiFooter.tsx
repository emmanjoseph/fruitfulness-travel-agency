import { ArrowLeft, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const SemiFooter = () => {
  return (
    <div>
           <div className='py-10 max-w-[1400px] mx-auto px-4'>
        <div className="w-full flex flex-co items-center md:flex-row justify-between mb-11">
          <div>
            <Image
               src={'/logo.jpg'}
               alt='logo'
               width={500}
               height={500}
               className='size-20 md:size-40'
            />
          </div>

          <div className='flex flex-col md:flex-row gap-20'>
                 <div>
                    <h1 className='text-base font-semibold text-gray-800'>Quick links</h1>
                    <div>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Wildlife package</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Coastal package</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Weekend packages</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>About us</p>
                      </Link>
                    </div>
                    
                 </div>

                 <div>
                    <h1 className='text-base font-semibold text-gray-800'>Main Office</h1>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>Viewpark Towers 17th floor</p>
                    </div>
                    
                 </div>

                
          </div>

        </div>

       

           <div className="md:flex flex-col md:flex-row items-center pt-10 justify-between border-t border-gray-300">
          <span className='text-sm text-gray-500'>&copy; 2025 Fruitfulness Travel LTD. All rights reserved.</span>

          <button className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowLeft/>
             Back to home page
          </button>

          <button 
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowUp/>
             Back to top
          </button>

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
    </div>
  )
}

export default SemiFooter