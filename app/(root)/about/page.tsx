import React from 'react'
import Image from 'next/image'
import SemiFooter from '@/components/SemiFooter'
import Link from 'next/link'
const Page = () => {

  return (
    <section className='font-sans font-medium'>
        <div className="relative w-full overflow-hidden">
              {/* Background pattern */}
                 <Image
                   src={"/images/bg-1.png"}
                   alt="travel-bg"
                   fill
                   className="object-cover opacity-10"
                   style={{ zIndex: 0 }}
                 />

                 <div className="relative z-10 py-24 max-w-[1000px] mx-auto px-4">
                    <div className="flex items-center flex-col justify-between gap-3">
                         <h1 className='font-heading text-2xl md:text-6xl text-gray-700 mb-5 '>Learn more about us</h1>

                         <div className='space-y-4.5'>
                           <p className='text-base text-gray-600'> The name Fruitfulness Travel reflects our philosophy. We believe that every
                         journey should bear &apos;fruit&apos;—whether it&apos;s the fruit of knowledge, new friendships, personal
                         growth, or a deeper understanding of the world. We don&apos;t just plan trips; we cultivate
                         experiences that stay with you long after you&apos;ve returned home</p>
                           <div>
            <h1 className='font-heading text-gray-700 text-xl'>Our Mission</h1>
            <p className='text-base text-neutral-600'>Our mission is to facilitate meaningful journeys that go beyond sightseeing, fostering a sense of discovery and connection with the world.</p>
          </div>
          <div>
            <h1 className='font-heading text-gray-700 text-xl'>Our Vision</h1>
            <p className='text-base text-neutral-600'>To be a leading provider of transformative travel
experiences, recognized globally for our commitment to sustainable tourism and
creating a world where travel enriches both the traveler and the local community.</p>
          </div>
                         </div>
                   
                    </div>
                   
                 </div>
        </div>

        <div className="py-24 max-w-[1000px] mx-auto px-4 space-y-5">
          <p className="text-base text-gray-600">
            <span className='text-xl italic font-semibold pb-0.5'>
              &quot;We believe that the best journeys aren&apos;t measured in miles, but in moments.&quot;
            </span>
            
            <br />
            Fruitfulness Travel was founded on a simple, yet powerful idea: that travel
            should be a deeply rewarding and enriching experience. The name itself is our
            promise to you. We&lsquo;re dedicated to cultivating journeys that bear fruit—the
            fruit of newfound knowledge, lasting memories, and meaningful connections.
          </p>

          <p className="text-base text-gray-600">In a world of generic tours, we stand for something different. Our mission is to
          go beyond the usual tourist trail to curate authentic, immersive, and
          transformative experiences. We don&lsquo;t just show you a place; we help you
          connect with its culture, its people, and its spirit.</p>

          <p className="text-base text-gray-600">Our team of expert travelers and guides are passionate about sharing the world
in a way that truly enriches your life. Whether you&apos;re seeking a serene escape,
to
an adventurous expedition, or a cultural deep dive, we&apos;ll design a journey that
is truly fruitful. We also collaborate closely with other partners to ensure every aspect of your travel experience is meaningful and impactful including <Link 
className='font-semibold text-emerald-700'
href={'https://www.safaribookings.com/'}>SafariBookings.com</Link></p>


      <div className='flex flex-col items-center'>
         <h1 className='font-heading text-gray-700 text-4xl'>Gallery</h1>

       <div className="mt-12 columns-1 sm:columns-2 md:columns-5 gap-4 space-y-4">
  {[
    "https://images.unsplash.com/photo-1564490292125-2e3c78a0ef44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9tYmFzYXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1666695512218-72b628a0a6a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FmYXJpc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1578326626553-39f72c545b07?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1763878119119-aff0820121fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZmFyaXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1626569846723-faf43927df8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdpbGRsaWZlJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661868852019-1ee8ef9c30d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNhZmFyaXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1603632076161-5836b146638c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZGxpZmUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D",
  ].map((src, idx) => (
    <div key={idx} className="relative overflow-hidden rounded-2xl group">
      <Image
        src={src}
        alt={`Gallery image ${idx + 1}`}
        width={500}
        height={500}
        className="w-full h-auto object-cover rounded-2xl transform transition duration-300 group-hover:scale-105 group-hover:brightness-90"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <p className="text-white text-sm font-medium">View</p>
      </div>
    </div>
  ))}
</div>


        
      </div>
            
        </div>

        <SemiFooter/>
    </section>
  )
}

export default Page