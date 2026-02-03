import React from "react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const FAQ = () => {
  const faqs = [
    {
      question: "What is included in the safari package?",
      answer:
        "Our safari packages typically include accommodation, meals, park entry fees, guided game drives, and ground transportation. Specific inclusions may vary by itinerary and are clearly listed before booking.",
    },
    {
      question: "When is the best time to go on safari?",
      answer:
        "The best time depends on what you want to experience. Generally, the dry seasons (June–October and January–February) offer excellent wildlife viewing, while the green season provides fewer crowds and lush landscapes.",
    },
    {
      question: "Is the safari suitable for families and children?",
      answer:
        "Yes, many of our safaris are family-friendly. We also offer tailored itineraries with child-appropriate accommodations and activities. Age requirements vary by lodge and park.",
    },
    {
      question: "What should I pack for a safari?",
      answer:
        "We recommend light, neutral-colored clothing, comfortable walking shoes, sun protection, a hat, binoculars, and a camera. A detailed packing guide is provided after booking.",
    },
    {
      question: "How do I book and what is the cancellation policy?",
      answer:
        "You can book directly through our website or with the help of our travel specialists. Cancellation policies vary by package and accommodation, but all terms are shared transparently before confirmation.",
    },
  ]

  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <Image
        src="/Section.png"
        alt="background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/img-testimonial.png"
            alt="testimonial"
            width={400}
            height={400}
            className="w-72 md:w-96 h-auto"
          />
        </div>

        {/* FAQ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-gray-700 text-2xl md:text-3xl font-semibold">
            Frequently Asked Questions
          </h1>

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-xl space-y-2"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border bg-white px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-700">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQ
