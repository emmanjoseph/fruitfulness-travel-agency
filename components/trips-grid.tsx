import Link from "next/link";
import Image from "next/image";
import {CalendarFold, MapPinIcon, PlaneIcon, PlaneTakeoff, StarIcon } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const shortenText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function TripsGrid({ trips }: { trips: any[] }) {
  if (!trips?.length) return <p className="mt-10">No journeys found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {trips.map((trip) => (
       <Link key={trip.name} href={`/details/${trip.id}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-[30px] hover:shadow-lg transition-shadow">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          className="relative z-20 aspect-video w-full lg:h-64 object-cover brightness-90 dark:brightness-40 rounded-t-[30px]"
          width={400}
          height={700}
        />
        
       <CardHeader className="">
  {/* Country Badge */}
  <Badge className="w-fit capitalize bg-emerald-600 text-white font-semibold">
    {trip.country}
  </Badge>
  
  <CardTitle className="line-clamp-2">{trip.name}</CardTitle>
  
  {/* Location & Info Grid */}
  <div className="">
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
      <MapPinIcon size={14} />
      <span className="truncate">{trip.location}</span>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
        <CalendarFold size={14} />
        <span>{trip.numberOfDays} days</span>
      </div>
      
      <div className="flex items-center gap-1">
        <StarIcon size={14} className="fill-yellow-500 text-yellow-500" />
        <span className="font-semibold text-sm">{trip.rating}/5</span>
      </div>
    </div>
  </div>
</CardHeader>
        
        <CardFooter>
          <button className='flex items-center justify-center gap-x-1.5 bg-neutral-700 w-full text-white font-semibold py-3 rounded-3xl cursor-pointer hover:bg-neutral-800 transition-colors'>
            Explore destination
            <PlaneTakeoff size={15}/>
          </button>
        </CardFooter>
      </Card>
    </Link>
      ))}
    </div>
  );
}
