import Link from "next/link";
import Image from "next/image";
import {CalendarFold, MapPinIcon, PlaneIcon, PlaneTakeoff, StarIcon, Volleyball } from "lucide-react";
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
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-[35px] hover:shadow-lg transition-shadow">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          className="relative z-20 aspect-video w-full lg:h-64 object-cover brightness-90 dark:brightness-40 rounded-t-[35px]"
          width={400}
          height={700}
        />
        
       <CardHeader className="">
  {/* Country Badge */}
  <Badge className="w-fit capitalize bg-emerald-600 text-white font-semibold">
    {trip.country}
  </Badge>
  
  <CardTitle className="line-clamp-2 font-heading">{shortenText(trip.name,27)}</CardTitle>
  
  {/* Location & Info Grid */}
  <div className="">
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
      <span className="truncate">{shortenText(trip.location,30)}</span>
    </div>
    
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
        <CalendarFold size={14} />
        <span>{trip.numberOfDays} days</span>
      </div>
      
      <div className="flex items-center gap-1">
        <StarIcon size={14} className="fill-yellow-500 text-yellow-500" />
        <span className="font-semibold text-sm">{trip.rating}/5</span>
      </div>

      <div className="flex items-center gap-x-1 text-sm text-muted-foreground font-semibold">
        <Volleyball size={14} />
        <span>{trip.activities.length} activities</span>
      </div>
    </div>

    <div className="mt-2 flex gap-x-3">
      {trip.tags.slice(0, 3).map((tag:string)=>(
        <Badge key={tag} className="text-xs bg-emerald-100 text-emerald-800 font-medium">
          {tag}
        </Badge>
      ))}
    </div>
  </div>
</CardHeader>
      </Card>
    </Link>
      ))}
    </div>
  );
}
