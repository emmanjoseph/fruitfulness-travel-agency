import Link from "next/link";
import Image from "next/image";
import {CalendarFold, MapIcon, MapPinIcon, PlaneIcon, PlaneTakeoff, StarIcon, Volleyball} from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ta } from "date-fns/locale";

export const shortenText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function TripsGrid({ trips }: { trips: any[] }) {
  if (!trips?.length) return <p className="mt-10">No journeys found.</p>;

  return (
    <div className="grid md:grid-cols-4 gap-6 lg:gap-4 mt-8">
      {trips.map((trip) => (
          <Link key={trip.name} href={`/details/${trip.id}`}>
            <div className="w-full card font-heading">
              <div className="card-pattern-grid"></div>
              <Image
                  src={trip.imgUrl}
                  alt={trip.name}
                  className="relative z-20 aspect-video w-full h-full md:h-50 object-cover"
                  width={1000}
                  height={1000}
              />

              <div className={'p-4 bg-white space-y-1'}>
                <div className="flex items-center justify-between">
                  <Badge className={'py-1.5 capitalize bg-emerald-600'}>
                    <p className={'text-white font-semibold'}>{trip.country}</p>
                  </Badge>


                </div>

                <h1 className="truncate font-semibold  text-gray-700">
                  {trip.name}
                </h1>

                <p className="text-gray-600 truncate font-heading font-medium text-sm flex items-center gap-x-1.5">
                  <MapIcon size={15} className={'text-gray-700 fill-gray-700'}/>
                  {trip.location}
                </p>

                <div className="flex items-center gap-x-2 mt-1">
                  {trip.tags.slice(0,3).map((tag:string) => (
                      <Badge className={'bg-black px-2 py-2'}>
                        {tag}
                      </Badge>
                  ))}
                </div>


                <div className="card-actions">

                  <p className="font-bold font-heading flex items-center gap-x-1.5 text-gray-700">
                    <StarIcon className={'text-amber-300 fill-amber-300'}/>
                    {trip.rating}/5
                  </p>

                  <button className={'card-button bg-emerald-500'}>
                    <p className="font-semibold capitalize">
                      Explore destination
                    </p>
                  </button>
                </div>


              </div>



            </div>
          </Link>

      ))}
    </div>
  );
}
