"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

gsap.registerPlugin(ScrollTrigger)

// ─── Word splitter ────────────────────────────────────────────────────────────
function splitWords(text: string) {
  return text.split(" ").map((word, i) => (
      <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "top" }}
      >
      <span className="word-inner inline-block" style={{ willChange: "transform, opacity" }}>
        {word}&nbsp;
      </span>
    </span>
  ))
}

const faqs = [
  {
    question: "What is the difference between a citizen and non-resident price?",
    answer:
        "Citizen prices apply to Kenyan nationals and East African Community residents, who pay Kenya Wildlife Service park fees at a subsidized rate. Non-resident prices apply to international visitors and reflect the higher KWS gazetted rates for foreign nationals. Both are clearly listed on each journey so you know exactly what you're paying for.",
  },
  {
    question: "When is the best time to witness the Great Migration in the Maasai Mara?",
    answer:
        "The dramatic Mara River crossings — where wildebeest leap into crocodile-filled waters — typically happen between July and October. However, migration herds are present in the broader Mara ecosystem from June through November. January to February is also excellent for witnessing calving season in the Serengeti.",
  },
  {
    question: "Are park entry fees included in the package price?",
    answer:
        "It depends on the pricing tier. Our Midrange and Luxury packages typically bundle Kenya Wildlife Service park fees into the total price. Budget packages may list park fees separately since they vary by nationality and park. Each journey's inclusions and exclusions are clearly listed so there are no surprises at the gate.",
  },
  {
    question: "How do I get to the safari destination from Nairobi?",
    answer:
        "Most of our journeys include either a road transfer in a 4x4 safari vehicle or a private charter flight from Wilson Airport in Nairobi, depending on your chosen tier. Road transfers to the Maasai Mara take approximately 5–6 hours, while a charter flight takes around 45 minutes. Luxury packages typically include flights by default.",
  },
  {
    question: "Is it safe to go on safari in Kenya?",
    answer:
        "Kenya is one of Africa's most established safari destinations with a well-developed tourism infrastructure. All our guides are Kenya Professional Safari Guides Association certified and carry first aid training. Our vehicles are equipped with communication devices, and all clients are covered by Flying Doctors emergency evacuation for the duration of the journey.",
  },
  {
    question: "What vaccinations or health requirements do I need before travelling?",
    answer:
        "Yellow fever vaccination is required if you are arriving from a yellow fever endemic country. We strongly recommend being up to date on routine vaccinations and consulting your doctor about malaria prophylaxis at least 4–6 weeks before travel. A Yellow Fever certificate may be checked at the airport on arrival.",
  },
  {
    question: "Can I customise a package or travel as a private group?",
    answer:
        "Absolutely. All our journeys can be tailored for private groups, honeymoons, family travel, or corporate retreats. You can adjust the number of days, accommodation tier, activities, and travel dates. Reach out to us directly and we will build an itinerary around your preferences and budget.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
        "Cancellations made 30 or more days before departure receive a full refund minus a 10% administration fee. Cancellations between 15–29 days before departure are refunded at 50%. Cancellations within 14 days of departure are non-refundable. We strongly recommend purchasing comprehensive travel insurance to cover unforeseen cancellations.",
  },
  {
    question: "Do I need travel insurance and what should it cover?",
    answer:
        "Travel insurance is not mandatory but is strongly recommended. Your policy should cover emergency medical evacuation, trip cancellation, lost luggage, and personal liability. While Flying Doctors evacuation cover is included in all our packages, it covers emergency air evacuation only and does not replace a full travel insurance policy.",
  },
]

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const faqLabelRef = useRef<HTMLHeadingElement>(null)
  const hrRef = useRef<HTMLHRElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // ── 1. Tagline — word-by-word scrub ──────────────────────────────────
      const taglineWords = taglineRef.current!.querySelectorAll<HTMLElement>(".word-inner")
      gsap.set(taglineWords, { y: "110%", opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: taglineRef.current,
          start: "top 88%",
          end: "top 50%",
          scrub: 1,
        },
      }).to(taglineWords, {
        y: "0%",
        opacity: 1,
        stagger: 0.05,
        ease: "none",
      })

      // ── 2. FAQ label — slides in from right ───────────────────────────────
      gsap.set(faqLabelRef.current, { x: 60, opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: faqLabelRef.current,
          start: "top 88%",
          end: "top 55%",
          scrub: 1,
        },
      }).to(faqLabelRef.current, {
        x: 0,
        opacity: 1,
        ease: "none",
      })

      // ── 3. HR — scaleX reveal ─────────────────────────────────────────────
      gsap.set(hrRef.current, { scaleX: 0, transformOrigin: "left center" })

      gsap.timeline({
        scrollTrigger: {
          trigger: hrRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      }).to(hrRef.current, {
        scaleX: 1,
        ease: "none",
      })

      // ── 4. Accordion rows — staggered rise ───────────────────────────────
      const rows = listRef.current!.querySelectorAll<HTMLElement>(".faq-row")
      gsap.set(rows, { y: 36, opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
        },
      }).to(rows, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "none",
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
      <section ref={sectionRef} className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">

            {/* Tagline — word-by-word */}
            <p
                ref={taglineRef}
                className="text-xl lg:text-4xl text-gray-700 leading-relaxed font-heading font-bold"
                aria-label="Got questions? Say less, we've got answers!"
            >
              {splitWords("Got questions?")}
              <br />
              {splitWords("Say less, we've got answers!")}
            </p>

            {/* FAQ label — slides from right */}
            <h2
                ref={faqLabelRef}
                className="font-heading text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 flex items-start gap-1"
            >
              FAQ&apos;s
              <span className="text-4xl mt-1">↗</span>
            </h2>
          </div>

          {/* Divider — scaleX reveal */}
          <hr ref={hrRef} className="border-gray-300 mb-0" />

          {/* Accordion */}
          <div ref={listRef}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                  <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="faq-row border-b border-gray-300"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold capitalize cursor-pointer text-gray-700 hover:no-underline [&[data-state=open]>svg]:hidden">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent asChild>
                      <div className="grid lg:grid-cols-2 gap-8 pb-6">
                        <div />
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
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