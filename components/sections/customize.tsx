import React from "react";
import Link from "next/link";

const CustomizeCta = () => {
    return (
        <section
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZhY2F0aW9ufGVufDB8fDB8fHww")',
                backgroundSize: "cover",
                backgroundPosition: "center 20%",
            }}
            className="relative h-130 md:h-170 overflow-hidden bg-fixed"
        >
            <div className="absolute inset-0 bg-linear-to-t from-black to-black/40" />

            <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 py-16 max-w-7xl mx-auto text-white">
                <h2 className="text-4xl md:text-7xl font-extrabold font-heading">
                    Plan Your <br/> Perfect Safari
                </h2>

                <p className="mt-3 max-w-xl text-base md:text-lg text-white/85 font-heading">
                    Planning trips can be overwhelming — our team is here to guide you every step of the way.
                    Tell us your travel style, dates, and budget. We will help shape a safari that fits you.
                </p>

                <Link href="/plan-safari">
                    <button className="mt-10 rounded-full bg-white px-6 py-3 text-sm font-heading font-semibold text-neutral-900 hover:bg-emerald-50">
                        Start Planning
                    </button>
                </Link>

            </div>
        </section>
    );
};

export default CustomizeCta;