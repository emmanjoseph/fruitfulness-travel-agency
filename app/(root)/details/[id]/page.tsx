"use client"
import { ControlledMap } from '@/components/Map'
import SemiFooter from '@/components/SemiFooter'
import { shortenText } from '@/components/trips-grid'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchJourneyById, fetchRelatedJourneys } from '@/lib/api'
import { ArrowLeft, Calendar1, CalendarFold, Clock, DollarSignIcon, Heart, MapPin, PlaneTakeoff, StarIcon, Volleyball, VolleyballIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailsPage = () => { 
  const { id } = useParams()
  const idParam = Array.isArray(id) ? id[0] : id
  const [journeyDetails, setJourneyDetails] = useState<any>(null);
  const [relatedJourneys, setRelatedJourneys] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  console.log("id param", idParam);

  useEffect(() => {
    const getJourneyDetails = async () => {
      if (idParam) {
        try {
          const details = await fetchJourneyById(idParam);
          console.log("Journey details", details);
          setJourneyDetails(details)
        } catch (error) {
          console.error("Error fetching details:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    const getRelatedJourneys = async () => {
      if (idParam) {
        try {
          const related = await fetchRelatedJourneys(idParam);
          console.log("Related journeys", related);
          setRelatedJourneys(related);
        } catch (error) {
          console.error("Error fetching related journeys:", error);
        }
      }
    }

    getJourneyDetails()
    getRelatedJourneys()
  }, [idParam]);

  console.log('related', relatedJourneys);
  

  if (loading) return (
  <div className='max-w-3xl mx-auto px-4 md:px-0 py-20 text-center flex items-center flex-col space-y-3'>
    <Skeleton className="h-12 w-3/4 rounded-xl" />
    <Skeleton className="h-[225px] w-9/10 bg-gray-200 rounded-[30px]" />
    <Skeleton className="h-[125px] w-9/10 bg-gray-200 rounded-[30px]" />
    <Skeleton className="h-12 w-1/2 bg-gray-200 rounded-[30px]" />
    <Skeleton className="h-12 w-1/2 bg-gray-200 rounded-[30px]" />
  </div>
)
  if (!journeyDetails) return <div className='py-20 text-center'>Journey not found</div>

  const details = journeyDetails.data || journeyDetails;
  const related = relatedJourneys.data || relatedJourneys;

  return (
    <section>
       <section className='py-20 max-w-4xl mx-auto px-4 md:px-0 space-y-3.5 font-sans'>
      <button className='flex items-center gap-x-1.5 px-7 py-2 cursor-pointer shadow-md rounded-[10px] hover:shadow-lg transition' onClick={router.back}>
        <ArrowLeft size={16}/>
        <p className="text-gray-600 font-semibold text-sm">Go back</p>
      </button>

      <h1 className="text-4xl lg:text-5xl text-center font-bold py-5">{details.name}</h1>

      <p className='text-gray-700 py-5'>{details.description}</p>

      

      {/* image */}
      <Image
                 src={details.imgUrl || "https://images.unsplash.com/photo-1716404211069-dc368a7247fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpbGltYW5qYXJvJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D"}
                 alt={details.name}
                 width={700}
                 height={700}
                 className='w-full h-80 lg:h-150 rounded-[30px] object-cover'
              />
      
     



      {/* Tags */}
{details.tags?.length > 0 && (
  <div className="flex gap-2 overflow-x-auto py-3">
    {details.tags.map((tag: string, index: number) => (
      <Badge key={index} className="px-3 py-1.5 bg-black font-bold">
        {tag}
      </Badge>
    ))}
  </div>
)}

<h1 className='text-2xl font-bold'>Day-wise Itinerary</h1>

{/* Itinerary */}
{details.itineraries?.length > 0 && (
  <div>
    {details.itineraries.map((item: any) => (
      <div
        key={item.id}
        className="mb-6 space-y-1"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 text-xl">
            Day {item.day}: {item.title}
          </h3>
         
        </div>

        <p className="lg:text-[15px] text-gray-600 mt-2">{item.details}</p>
      </div>
    ))}
  </div>
)}

{/* Activities */}
{details.activities?.length > 0 && (
  <div>
   <h1 className='text-2xl font-bold py-3 flex items-center gap-x-1.5'><VolleyballIcon/> Travel highlights</h1>
    
    <div className="space-y-2">
      {details.activities.map((activity: string, index: number) => (
        <div
          key={index}
          className="p-4 border-l-4 border-emerald-500 bg-gray-50 rounded"
        >
          {activity}
        </div>
      ))}
    </div>
  </div>
)}

{/* Best Time */}
{details.bestTimeToVisit && (
  <div>
    <h2 className="text-2xl font-bold py-3 flex items-center gap-x-1.5"><Clock/>Best Time to Visit</h2>
    <p className="text-gray-700">{details.bestTimeToVisit}</p>
  </div>
)}

<div>
  
</div>
{/* <ControlledMap/> */}


<Link href={`/plan-trip/${details.id}`}>
<button type="button" className='bg-emerald-700 w-full rounded-[30px] py-4 text-white font-semibold cursor-pointer flex items-center justify-center gap-x-2 hover:bg-emerald-600 transition-all duration-150'>
  <p className='text-base'>Submit a booking request</p>
</button>
</Link>

<div className="my-6 py-6">
<h2 className="text-xl font-bold py-3 flex items-center gap-x-1.5"><Heart/>You may also like</h2>
<div className="grid md:grid-cols-3 gap-3">
  {related.slice(0,6).map((trip:any)=> (
    <Link key={trip.name} href={`/details/${trip.id}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-[30px] hover:shadow-lg transition-shadow">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          className="relative z-20 aspect-video w-full lg:h-50 object-cover brightness-90 dark:brightness-40 rounded-t-[30px]"
          width={400}
          height={700}
        />
        
       <CardHeader className="">
  {/* Country Badge */}
  <Badge className="w-fit capitalize bg-emerald-600 text-white font-semibold">
    {trip.country}
  </Badge>
  
  <CardTitle className="line-clamp-2 font-heading truncate">
    {shortenText(trip.name,27)}
  </CardTitle>
  
  {/* Location & Info Grid */}
  <div className="">
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
      <span className="line-clamp-2 font-heading truncate">{shortenText(trip.location,27)}</span>
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

    
  </div>
</CardHeader>
      </Card>
    </Link>
  ))}
</div>
</div>

    </section>

<SemiFooter/>

    </section>
   
  )
}

export default DetailsPage