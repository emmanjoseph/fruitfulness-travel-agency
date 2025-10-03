"use client"
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, className }:{title:string,className:string}) => {
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create animation for the title
            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y:100,
                    rotateX: 30,
                    // color: '#3498DB'
                },
                {
                    opacity: 1,
                    y:0,
                    rotateX: 0,
                    duration: 5,
                    ease: 'power1.inOut',
                    // color:"#0000000",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%', // Start animation when 80% of the viewport reaches the title
                        end: 'center 50%', // End animation at the center of the viewport
                        scrub: true, // Smooth animation as you scroll
                    },
                }
            );
        });

        return () => ctx.revert(); // Cleanup animation on component unmount
    }, []);

    return (
        <div
            className={`mt-5 text-center text-4xl uppercase leading-[0.8] wall-poet ${className}`}
        >
            <h1 ref={titleRef} className="font-audio-wide-heading font-heading">
                {title}
            </h1>
        </div>
    );
};

export default AnimatedTitle;
