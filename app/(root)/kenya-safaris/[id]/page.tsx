import { kenyanDestinations } from '@/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Cloud, Dot, MapPin, StarIcon } from 'lucide-react';
import SemiFooter from '@/components/SemiFooter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ✅ For static export
export function generateStaticParams() {
  return kenyanDestinations.map((d) => ({
    id: d.id,
  }));
}


// ✅ Just destructure params and type inline
export default function DetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const details = kenyanDestinations.find((d) => d.id === id);

  if (!details) {
    notFound();
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 space-y-5 font-sans font-medium">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-7 pt-20">
        <Image
          src={details.imageUrl}
          alt={details.name}
          width={1000}
          height={1000}
          className="h-60 md:h-96 md:w-6/12 object-cover rounded-3xl"
        />
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-heading text-gray-800 font-semibold">
            {details.name}
          </h1>
          <p className="flex flex-row items-center gap-1.5 text-base font-semibold text-gray-600">
            <MapPin size={16} className="text-green-500 fill-green-500" />
            <span>{details.location}</span>
          </p>
          <p className="flex flex-row items-center gap-1.5 text-base font-semibold text-gray-600">
            <StarIcon size={16} className="text-amber-500 fill-amber-500" />
            <span>{details.rating}</span>
          </p>
          <p className="flex gap-1.5 text-[15px] font-medium text-gray-600 max-w-lg">
            <Cloud size={16} className="text-blue-500 fill-blue-500" />
            {details.climate}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-7 py-10">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-semibold text-xl text-gray-800">Overview</h1>
            <p className="text-[15px] text-gray-600">{details.description}</p>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-semibold text-xl text-gray-800">Fun Activities</h1>
            <div className="space-y-1">
              {details.activities.map((item, idx) => (
                <p key={idx} className="text-gray-600 text-[15px] flex flex-row gap-1.5">
                  <Dot size={19} /> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-semibold text-xl text-gray-800">Nearby attractions</h1>
            <div className="space-y-1">
              {details.nearbyAttractions.map((item, idx) => (
                <p key={idx} className="text-gray-600 text-[15px] flex flex-row gap-1.5">
                  <Dot size={19} /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full space-y-3 ">
            {details.transportation && (
              <AccordionItem value="transportation" className="tour-card px-4 rounded-3xl">
                <AccordionTrigger>How do I get there?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-[15px] text-gray-600">{details.transportation}</p>
                </AccordionContent>
              </AccordionItem>
            )}

            {details.accommodation && (
              <AccordionItem value="accommodation" className="tour-card px-4 rounded-3xl">
                <AccordionTrigger>Accommodation</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {details.accommodation.map((stay, idx) => (
                      <p key={idx} className="text-gray-600 text-[15px] flex flex-row gap-1.5">
                        <Dot size={19} /> {stay}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {details.travelTips && (
              <AccordionItem value="travelTips" className="tour-card px-4 rounded-3xl">
                <AccordionTrigger>Travel Tips</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {details.travelTips.map((tip, idx) => (
                      <p key={idx} className="text-gray-600 text-[15px] flex flex-row gap-1.5">
                        <Dot size={19} /> {tip}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="mt-7">
            <button className="bg-gray-900 px-3 py-3 rounded-xl text-white font-semibold">
              Start your booking
            </button>
          </div>
        </div>
      </div>

      <SemiFooter />
    </section>
  );
}
