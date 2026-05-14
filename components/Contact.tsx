"use client"
import { ArrowRight } from 'lucide-react'
import React, {useEffect, useRef} from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);


const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const splitText = (el: HTMLElement) => {
    const words = el.innerText.split(" ");
    el.innerHTML = words
        .map(word => `<span class="inline-block overflow-hidden">
                    <span class="word inline-block">${word}</span>
                  </span>`)
        .join(" ");
  };

  useEffect(() => {
    if (!titleRef.current || !paragraphRef.current) return;

    const ctx = gsap.context(() => {
      // Split paragraph into words
      splitText(paragraphRef.current!);

      const words = paragraphRef.current!.querySelectorAll(".word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Heading (scramble)
      tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrambleText: {
              text: "Ready to embark on your next adventure?",
              chars: "upperCase",
              speed: 0.3,
            },
          }
      );

      // Paragraph (word-by-word reveal)
      tl.fromTo(
          words,
          {
            y: "100%",
            opacity: 0,
          },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.03,
            ease: "none",
          },
          "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);


  return (
    <section id='contact' className=''>
          <div
  className="h-130 relative bg-[url('https://images.unsplash.com/photo-1532574754390-44dc5c6780bb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden"
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0  bg-linear-to-t from-black via-black/90 to-black" />

  {/* Content */}
  <div className="relative z-10 h-full py-10">
    <div className="flex flex-col items-center justify-center w-full h-full px-4">
      <h1 ref={titleRef} className="font-extrabold font-heading text-4xl md:text-6xl text-center max-w-3xl">
        Ready to embark on your next adventure? 
      </h1>

      <p ref={paragraphRef} className="text-center max-w-xl mt-4 text-gray-300 lg:text-xl text-base">
        Our team of travel experts is here to help you plan your dream trip.
        Whether you have questions or need assistance with booking, we’re just a
        message away.
      </p>

      <button
        onClick={() =>
          (window.location.href = "mailto:info@fruitfulnesstravel.com")
        }
        className="mt-6 bg-white rounded-3xl px-6 py-3.5 text-neutral-900 font-semibold
                   hover:scale-105 transition-transform cursor-pointer
                   flex items-center gap-2 hover:gap-4 duration-300"
      >
        <span>Get in touch</span>
        <ArrowRight size={18} />
      </button>
    </div>
  </div>
</div>

  
    
    </section>
   

  )
}

export default Contact