import Link from "next/link";
import Image from "next/image";
import { PlaneIcon } from "lucide-react";

const shortenText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function TripsGrid({ trips }: { trips: any[] }) {
  if (!trips?.length) return <p className="mt-10">No journeys found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      {trips.map((trip) => (
         <Link key={trip.id} href={`/details/${trip.id}`} className="rounded-[40px]">
      {/* images */}
      <div className="relative w-full h-80 rounded-[40px]">
         <Image src={trip.imgUrl} alt={trip.id} width={500} height={500} className='w-full h-full object-cover rounded-[40px]'/>

         <div className="absolute bottom-0 right-0 rounded-tl-[30px] size-16 bg-white flex items-center justify-center">
            <div className="size-14 rounded-full shadow-xl flex items-center justify-center">
                <PlaneIcon size={20} className="text-gray-500"/>
            </div>
            
         </div>
      </div>
       

      <div className="p-4">
        <h3 className="font-semibold">
           {shortenText(trip.name, 30)}
        </h3>
        <p className="text-sm text-gray-500 font-medium">{trip.location}</p>
        <p className="text-sm mt-1">⭐ {trip.rating} | {trip.numberOfDays} days</p>
      </div>
    </Link>
      ))}
    </div>
  );
}
