'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const paraRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── ENTRANCE: each word scales up from tiny + blur ──────────────────
            const headingSplit = new SplitText(headingRef.current, { type: 'words' })

            gsap.set(headingSplit.words, {
                display: 'inline-block',
                scale: 0.05,
                opacity: 0,
                transformOrigin: 'center center',
                filter: 'blur(14px)',
            })

            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

            tl.to(headingSplit.words, {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                stagger: {
                    each: 0.1,
                    ease: 'power2.inOut',
                },
            })

            // paragraph words slide up after heading
            const paraSplit = new SplitText(paraRef.current, {
                type: 'words',
                wordsClass: 'para-word',
            })

            gsap.set(paraSplit.words, { opacity: 0, y: 16, display: 'inline-block' })

            tl.to(
                paraSplit.words,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.028,
                    ease: 'power3.out',
                },
                '-=0.7'
            )

            gsap.set([buttonRef.current, scrollRef.current], { opacity: 0, y: 20 })
            tl.to(
                [buttonRef.current, scrollRef.current],
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
                '-=0.3'
            )

            // ── SCROLL EXIT: words scatter + shrink back to dust ────────────────
            const exitTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.4,
                },
            })

            // each word flies to a unique random position and shrinks away
            headingSplit.words.forEach((word, i) => {
                const xDir = i % 2 === 0 ? -1 : 1
                exitTl.to(
                    word,
                    {
                        scale: 0.05,
                        opacity: 0,
                        filter: 'blur(18px)',
                        x: xDir * gsap.utils.random(40, 110),
                        y: gsap.utils.random(-60, -130),
                        ease: 'power2.in',
                    },
                    i * 0.035
                )
            })

            // paragraph + button parallax up and fade
            exitTl.to(
                [paraRef.current, buttonRef.current],
                {
                    opacity: 0,
                    y: -80,
                    ease: 'power1.in',
                },
                0
            )

            exitTl.to(scrollRef.current, { opacity: 0 }, 0)

            // subtle video zoom as you scroll — adds cinematic depth
            exitTl.fromTo(
                sectionRef.current!.querySelector('video'),
                { scale: 1 },
                { scale: 1.2, ease: 'none' },
                0
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="w-full min-h-screen relative overflow-hidden">
            <video
                src="/hero-bg.mp4"
                className="absolute inset-0 size-full object-cover"
                autoPlay
                controls={false}
                muted
                loop
            />
            <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black via-black/30 to-black/70" />

            <div className="absolute inset-0 z-10 px-4 text-white w-full h-full flex flex-col justify-center">
                <div className="container mx-auto">

                    <h1
                        ref={headingRef}
                        className="text-4xl md:text-8xl capitalize tracking-normal font-extrabold text-center lg:leading-26 font-heading"
                        style={{ perspective: 900 }}
                    >
                        Experience{' '}
                        <span
                            className="py-1 px-4 rounded-full bg-white text-black"
                            style={{ mixBlendMode: 'difference' }}
                        >
                            Safaris
                        </span>
                        <br />
                        like{' '}
                        <span
                            className="py-1 px-4 rounded-full bg-white text-black"
                            style={{ mixBlendMode: 'difference' }}
                        >
                            never
                        </span>{' '}
                        before
                    </h1>

                    <p
                        ref={paraRef}
                        className="max-w-xl mx-auto text-lg font-semibold py-5 leading-7 text-center"
                    >
                        We create immersive traveling experiences. Dive into cultures, uncover local
                        secrets and build journeys to match your style, pace and passion for
                        exploration.
                    </p>

                    <div ref={buttonRef} className="flex items-center justify-center">
                        <button className="bg-white text-gray-800 px-6 py-4 rounded-4xl font-semibold flex items-center gap-x-2">
                            Explore more
                        </button>
                    </div>

                    <div
                        ref={scrollRef}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
                    >
                        <div className="flex flex-col items-center gap-2 text-white/70">
                            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`.para-word { display: inline-block; }`}</style>
        </section>
    )
}

export default Hero
