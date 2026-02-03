"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import confetti from "canvas-confetti";

const Success = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".success-container", {
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".success-image",
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".success-text",
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(".success-link", {
          opacity: 0,
          y: 20,
          duration: 0.5,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

    useEffect(() => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const fire = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(fire);
      }
    };

    fire();
  }, []);

  return (
    <div
      ref={containerRef}
      className="success-container w-full h-[90vh] flex flex-col font-sans items-center justify-center space-y-4"
    >
      <Image
        src="/success.jpg"
        alt="success"
        width={350}
        height={350}
        className="success-image"
      />

      <h1 className="success-text font-semibold text-2xl text-center">
        Your journey has been booked successfully
      </h1>

      <p className="success-text max-w-xl text-center">
        Your booking has been successfully processed. We are excited to have you on board and will be preparing everything for your upcoming experience.  
        A confirmation email with all the necessary details has been sent to you.  
        Please check your inbox (and spam folder just in case).
      </p>

      <p className="success-text">Thank you for choosing us</p>

      <Link href="/" className="success-link underline text-emerald-600 font-medium">
        Back to homepage
      </Link>
    </div>
  );
};

export default Success;
