"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import AnimatedTitle from '../AnimatedTitle'
gsap.registerPlugin(ScrollTrigger) 



const About = () => {

    useGSAP(()=>{
        const clipAnimation = gsap.timeline({
            scrollTrigger:{
                trigger:"#clip",
                start:"center center",
                end:"+=800 center",
                scrub:0.5,
                pin:true,
                pinSpacing:true
            }
        })

        clipAnimation.to('.mask-clip-path',{
            width:"100%",
            height:"100%",
            borderRadius:"0"
        })
    })
  return (
    <div id="about" className='min-h-screen w-screen'>
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
            
           <AnimatedTitle
           title='Discover the largest shared adventure'
           className='text-black max-w-xl'
           />
            <div className="flex max-w-xl mx-auto flex-col items-center px-4 text-center">
                <p className='text-gray-600'>Embark on unforgettable journeys and explore breathtaking destinations.</p>
  <p className='text-gray-600'>
    We connect travelers from around the globe, offering unique experiences and seamless adventures across continents.
  </p>
            </div>
        </div>

        <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
    <Image
        src='/images/about.jpg' // Use relative path from the public directory
        width={1000}
        height={1000}
        alt="About Image"
        className="absolute top-0 left-0 size-full object-cover"
    />
</div>

        </div>
    </div>
  )
}

export default About