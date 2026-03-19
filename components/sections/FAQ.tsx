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
];

  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24">
      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-4 flex flex-col items-center gap-10">
         <h2 className="text-3xl md:text-5xl font-bold text-neutral-700 text-center font-sans pb-3">
        Frequently Asked Questions
      </h2>
     

        {/* FAQ */}
        <div className="w-full space-y-6">
                 <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto space-y-2 p-5 rounded-4xl bg-gray-100/50"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-700 text-base lg:text-xl">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-lg text-gray-600 leading-relaxed">
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
