"use client"
import React from 'react'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger);

const Reasons = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".bento-item");

            items.forEach((item: any, i) => {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.96,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: 1, // smooth scroll-linked feel
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section ref={sectionRef} className='pt-30 pb-8'>
            <div className='mx-auto max-w-7xl px-4'>
                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5">

                    {/* Left Column - Main Heading Card */}
                    <div className='flex flex-col justify-center p-10 bento-item'>
                        <div className='space-y-6'>
                            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-700 leading-tight">
                                Why <br/>Choose This <br/>Safari Experience
                            </h2>
                            <p className='text-gray-600 text-lg max-w-md leading-relaxed'>
                                This isn't just another tour. It's a transformation into the heart of Africa's wilderness.
                            </p>
                        </div>
                    </div>

                    {/* Top Right - AI-First Approach */}
                    <div className='bento-item bg-gradient-to-br  from-amber-50 to-stone-100 rounded-4xl p-8 shadow-sm border border-stone-200/50 hover:shadow-md transition-shadow'>
                        <div className='inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full items-center'>
                            Expert Curation
                        </div>

                        <div className='space-y-2 pt-20 lg:pt-40'>
                            <h3 className="text-xl font-heading font-bold text-gray-700 w-fit">
                                Handpicked Experiences
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Our travel experts select each destination and activity to ensure unforgettable adventures.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Right - Plug & Play */}
                    <div className='bento-item bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 shadow-sm border border-stone-200/50 hover:shadow-md transition-shadow'>
                        <div className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full'>
                            Personalized
                        </div>

                        <div className='space-y-2 pt-20 lg:pt-40'>
                            <h3 className="text-xl font-heading font-bold text-gray-700">
                                Tailored Safaris
                            </h3>
                            <p className='text-gray-600 leading-relaxed text-[15px]'>
                                Get access to customized itineraries designed for wildlife enthusiasts and photographers.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Full Width - Real Results with Image */}
                    <div
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1577971132997-c10be9372519?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd1aWRlZCUyMHRvdXIlMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D')"
                        }}
                        className='bento-item relative min-h-90 lg:col-span-2 rounded-b-[40px] overflow-hidden bg-cover bg-center shadow-sm hover:shadow-md transition-shadow'>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a0899] to-white" />
                        <div className='grid md:grid-cols-2 gap-8 p-8 items-center relative z-10 w-full text-gray-100'>
                            <div className='space-y-4'>
                                <div className='inline-block px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-semibold rounded-full'>
                                    Real Results
                                </div>
                                <h3 className="text-2xl font-heading font-extrabold leading-tight">
                                    Expert Guides <br/> & 24/7 Support
                                </h3>
                                <p className='text-gray-200 leading-relaxed pt-20 font-medium'>
                                    Built by guides who've done it — not just taught it. Our team makes your safari safe, enjoyable, and hassle-free.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1586398205986-afd1e041db64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGd1aWRlZCUyMHRvdXIlMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D')"
                        }}
                        className='bento-item relative min-h-90 lg:col-span-1 rounded-[40px] border overflow-hidden bg-cover bg-center shadow-sm hover:shadow-md transition-shadow'>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a0899] to-black" />
                        <div className='grid p-8 items-center relative z-10 w-full text-gray-100'>
                            <div className='space-y-4'>
                                            <div className='inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full'>
                                                Zero Experience Needed
                                            </div>
                                <h3 className="text-2xl font-heading font-extrabold leading-tight">
                                    First-Time <br/>Travelers Welcome
                                </h3>
                                <p className='text-gray-200 leading-relaxed pt-20 font-medium'>
                                    No prior safari experience? No problem. This system works even if you're starting from zero.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Reasons
