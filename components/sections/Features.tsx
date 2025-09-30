'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'


const BentoTilt = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 8; // tilt intensity
    const tiltY = (relativeX - 0.5) * -8;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(0.97)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.2s ease-out", // smooth snap-back
      }}
      className={className}
    >
      {children}
    </div>
  );
};


const Features = () => {
  return (
    <section className='bg-black text-gray-100'>
        <div className='max-w-[1400px] mx-auto px-4 py-32'>
            <div className="pb-20">
            <p className="text-blue-50 capitalize text-3xl font-audiowide font-bold pb-3">
                Explore our travel services
            </p>
           <p className="max-w-md text-base text-blue-50 opacity-90">
  Discover a world of curated tours, personalized itineraries, and seamless travel experiences designed to make every journey unforgettable. Let us connect you to breathtaking destinations and unique adventures across the globe.
</p>
            </div>


            <div className="grid md:grid-cols-10 gap-3">
               {/* wildlife services */}
            <BentoTilt className="md:col-span-4 relative rounded-[35px] w-full h-[400px] md:h-[450px] lg:h-[450px] overflow-hidden border border-neutral-400/30">
                <video
                    src={'/videos/wildlife.mp4'}
                    autoPlay
                    loop
                    muted
                    preload="none"
                    controls={false}
                    className='absolute left-0 right-0 size-full object-cover object-center'
                    
                    />

                    <div className="relative z-10 flex size-full flex-col p-5 md:p-7 text-blue-50 bg-gradient-to-br from-black/90 via-black/50 to-transparent">
                        <h1 className='text-2xl md:text-3xl font-heading font-bold pb-2'>Wildlife packages</h1>

                        <p className='max-w-md font-medium text-base'>Experience breathtaking game drives and discover Africa’s Big Five in their natural habitat.</p>

                        <Link href="/" className='mt-auto inline-flex items-center gap-2 font-semibold'>
                          <span>Learn more</span>
                          <ArrowRight/>
                        </Link>
                    </div>
            </BentoTilt>

             {/* corporate services */}
            <BentoTilt className="md:col-span-6 relative rounded-[35px] w-full h-[400px] md:h-[450px] lg:h-[450px] overflow-hidden border border-neutral-400/30">
                <video
                    src={'/videos/wildlife.mp4'}
                    autoPlay
                    loop
                    muted
                    controls={false}
                    preload="none"
                    className='absolute left-0 right-0 size-full object-cover object-center'
                    
                    />

                    <div className="relative z-10 flex size-full flex-col p-5 md:p-7 text-blue-50 bg-gradient-to-br from-black/90 via-black/50 to-transparent">
                        <h1 className='text-2xl md:text-3xl font-heading font-bold pb-2'>Corporate package</h1>

                        <p className='max-w-md font-medium text-base'>Seamless business travel arrangements with comfort, efficiency, and style.</p>

                        <Link href="/" className='mt-auto inline-flex items-center gap-2 font-semibold'>
                          <span>Learn more</span>
                          <ArrowRight/>
                        </Link>
                    </div>
            </BentoTilt>
            </div>

           

            {/* beach and coastal / weekend getaways */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3">
                <BentoTilt className="md:col-span-3 relative rounded-[35px] w-full h-[300px] md:h-[450px] lg:h-[450px] overflow-hidden border border-neutral-400/30">
                         <video
                    src={'/videos/diani-beach.mp4'}
                    autoPlay
                    loop
                    muted
                    controls={false}
                    preload="none"
                    className='absolute left-0 right-0 size-full object-cover object-center'
                    
                    />

                     <div className="relative z-10 flex size-full flex-col p-5 md:p-7 text-blue-50 bg-gradient-to-br from-black/90 via-black/75 to-transparent">
                        <h1 className='text-2xl md:text-3xl font-heading font-bold pb-2'>Beach & Coastal packages</h1>

                        <p className='max-w-md font-medium text-base'>Relax on pristine sandy beaches and enjoy the turquoise waters of the Kenyan coast.</p>

                        <Link href="/" className='mt-auto inline-flex items-center gap-2 font-semibold'>
                          <span>Learn more</span>
                          <ArrowRight/>

                        </Link>
                    </div>
                </BentoTilt>

                <BentoTilt className="md:col-span-2 relative rounded-[35px] w-full h-[300px] md:h-[450px] lg:h-[450px] overflow-hidden border border-neutral-400/30">
                         <video
                    src={'/videos/mountain.mp4'}
                    autoPlay
                    loop
                    muted
                    controls={false}
                    preload="none"
                    className='absolute left-0 right-0 size-full object-cover object-center'
                    
                    />

                     <div className="relative z-10 flex size-full flex-col p-5 md:p-7 text-blue-50 bg-gradient-to-br from-black/90 via-black/75 to-transparent">
                        <h1 className='text-2xl md:text-3xl font-heading font-bold pb-2'>Weekend packages</h1>

                        <p className='max-w-md font-medium text-base'>Unwind and recharge with our exclusive weekend getaways, designed for relaxation and adventure.</p>

                        <Link href="/" className='mt-auto inline-flex items-center gap-2 font-semibold'>
                          <span>Learn more</span>
                          <ArrowRight/>

                        </Link>
                    </div>
                </BentoTilt>
            </div>


            
        </div>
    </section>
  )
}

export default Features