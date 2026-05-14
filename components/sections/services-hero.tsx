"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScatterHeroProps {
    backgroundImage: string;
    heading: React.ReactNode;
    headingText: string;
    paragraph: string;
    className?: string;
    heightClassName?: string;
}

function injectWordSpans(el: HTMLElement, group: string) {
    const raw = el.innerText.trim();
    const isTitle = group === "title";
    el.innerHTML = raw
        .split(" ")
        .map(
            (w) =>
                `<span class="word-wrap inline-block ${isTitle ? "overflow-hidden" : ""}" style="vertical-align:top"><span data-group="${group}" class="word-inner inline-block" style="will-change:transform,opacity,scale">${w}&nbsp;</span></span>`
        )
        .join("");
}

export function ScatterHero({
                                backgroundImage,
                                heading,
                                headingText,
                                paragraph,
                                className = "",
                                heightClassName = "h-[400px] md:h-[500px] lg:h-[600px]",
                            }: ScatterHeroProps) {
    const heroRef    = useRef<HTMLDivElement>(null);
    const bgRef      = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef   = useRef<HTMLHeadingElement>(null);
    const descRef    = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!heroRef.current || !titleRef.current || !descRef.current) return;

        injectWordSpans(titleRef.current, "title");
        injectWordSpans(descRef.current, "desc");

        const titleWords = Array.from(
            titleRef.current.querySelectorAll<HTMLElement>('[data-group="title"]')
        );
        const descWords = Array.from(
            descRef.current.querySelectorAll<HTMLElement>('[data-group="desc"]')
        );
        const allWords = [...titleWords, ...descWords];

        const seeds = allWords.map(() => ({
            x:   gsap.utils.random(-280, 280),
            y:   gsap.utils.random(-200, 100),
            rot: gsap.utils.random(-50, 50),
        }));

        const ctx = gsap.context(() => {

            // 1. Entrance
            gsap.set(bgRef.current, { scale: 1.18 });
            gsap.set(allWords, { y: 55, opacity: 0 });

            gsap.timeline({ defaults: { ease: "power3.out" } })
                .to(bgRef.current, { scale: 1, duration: 1.6, ease: "power2.out" })
                .to(titleWords, { y: 0, opacity: 1, stagger: 0.06, duration: 0.9 }, "-=0.9")
                .to(descWords,  { y: 0, opacity: 1, stagger: 0.025, duration: 0.8 }, "-=0.5");

            // 2. Background parallax
            gsap.to(bgRef.current, {
                y: 110, scale: 1.1, ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top", end: "bottom top",
                    scrub: 1,
                },
            });

            // 3. Scatter (scrub makes it fully reversible on scroll back)
            const scatterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });

            allWords.forEach((word, i) => {
                const { x, y, rot } = seeds[i];
                scatterTl.to(
                    word,
                    { x, y, rotation: rot, scale: 0.05, opacity: 0, filter: "blur(18px)", ease: "none" },
                    i * 0.02
                );
            });

            // 4. Overlay deepens
            gsap.to(overlayRef.current, {
                opacity: 1.6, ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top", end: "bottom top",
                    scrub: 1,
                },
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={heroRef}
            className={`relative ${heightClassName} overflow-hidden flex items-end ${className}`}
        >
            <div
                ref={bgRef}
                className="absolute inset-0 will-change-transform"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundPosition: "center 30%",
                    backgroundSize: "cover",
                }}
            />

            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] to-black/40"
            />

            <div className="relative z-10 w-full px-6 lg:px-10 pb-12 md:pb-16 max-w-7xl mx-auto">
                <div className="max-w-4xl">

                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-[58px] leading-[1.15] tracking-tight mb-4 text-[#f0ece0] font-heading font-bold"
                        aria-label={headingText}
                    >
                        {heading}
                    </h1>

                    {/*
            THE FIX: flex-wrap on the <p> means word spans wrap at max-w-xl.
            After injectWordSpans replaces innerHTML with inline-block spans,
            flexbox is the only reliable way to constrain their wrapping width.
          */}
                    <p
                        ref={descRef}
                        className="flex flex-wrap max-w-xl text-base leading-relaxed text-white/90 font-medium"
                        aria-label={paragraph}
                    >
                        {paragraph}
                    </p>

                </div>
            </div>
        </div>
    );
}
