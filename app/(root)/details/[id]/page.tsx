"use client"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchJourneyById } from '@/lib/api'
import { ArrowLeft, Calendar1, Clock, DollarSignIcon, MapPin, PlaneTakeoff, StarIcon, VolleyballIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailsPage = () => { 
  const { id } = useParams()
  const idParam = Array.isArray(id) ? id[0] : id
  const [journeyDetails, setJourneyDetails] = useState<any>(null)
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

    getJourneyDetails()
  }, [idParam]);

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

  return (
    <section className='py-20 max-w-4xl mx-auto px-4 md:px-0 space-y-3.5 font-sans'>
      <button className='flex items-center gap-x-1.5 px-7 py-2 cursor-pointer shadow-md rounded-[10px] hover:shadow-lg transition' onClick={router.back}>
        <ArrowLeft size={16}/>
        <p className="text-gray-600 font-semibold text-sm">Go back</p>
      </button>

      <h1 className="text-4xl lg:text-5xl text-center font-bold py-5">{details.name}</h1>

      <p className='text-gray-700 py-5'>{details.description}</p>

      {/* <div className="flex items-center justify-between">

        <div className="flex items-center gap-6">
        <p className="text-gray-600 font-medium flex items-center gap-x-1.5 text-sm"><Calendar1 size={16}/>{details.numberOfDays} day plan</p>

        <p className="text-gray-600 font-medium flex items-center gap-x-1.5 text-sm"><MapPin size={16}/>{details.location}</p>
      </div>

        
        <div className="flex items-center gap-x-2">
          {Array.from({ length: Math.round(details.rating) }).map((_, index) => (
           <StarIcon key={index} size={16} className='text-yellow-500 fill-yellow-500'/>
          ))}
          <Badge className="text-sm bg-amber-500 text-white font-bold">
            {details.rating} / 5.0 
          </Badge>
        </div>
      </div> */}
      

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

<h1 className='text-3xl font-bold'>Day-wise Itinerary</h1>

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
   <h1 className='text-3xl font-bold py-3 flex items-center gap-x-1.5'><VolleyballIcon/> Activities</h1>
    
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
    <h2 className="text-3xl font-bold py-3 flex items-center gap-x-1.5"><Clock/>Best Time to Visit</h2>
    <p className="text-gray-700">{details.bestTimeToVisit}</p>
  </div>
)}

{/* Pricing */}
{details.pricing?.length > 0 && (
  <div>
    <h2 className="text-3xl font-bold py-3 flex items-center gap-x-1.5"><DollarSignIcon/> Pricing Tiers</h2>

    <div className="space-y-4">
      {details.pricing.map((price: any, index: number) => (
        <Card
          key={index}
          className="p-6 border border-gray-200 rounded-4xl bg-white shadow-sm"
        >
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-xl text-gray-800">
              {price.tier}
            </h3>
            <Badge className="bg-emerald-600 text-white font-bold px-3 py-2">
              {price.currency}
            </Badge>
          </CardHeader>

          <CardContent className="mt-2 text-sm text-gray-700 space-y-1">
            <div className="grid grid-cols-2 gap-3">
               <p className='bg-gray-200/20 p-4 rounded-2xl'>
              <strong>Citizen:</strong> {" "} {price.citizenPrice}
            </p>
            <p className='bg-gray-200/20 p-4 rounded-2xl'>
              <strong>Non-Resident:</strong> {" "} {price.nonResidentPrice}
            </p>
            </div>
           
            <div className='bg-gray-200/20 p-4 rounded-2xl'>
              <h3 className='text-gray-700 font-semibold'>Accommodation</h3> 
              <p>{price.accommodation}</p>
              
            </div>

            {price.transportation && (
              <p className='bg-gray-200/20 p-4 rounded-2xl'>
                <strong>Transport:</strong>{" "}
                {price.transportation.type} –{" "}
                {price.transportation.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}



<Link href={`/plan-trip/${details.id}`}>
<button type="button" className='bg-emerald-700 w-full rounded-[15px] py-3 text-white font-semibold cursor-pointer flex items-center justify-center gap-x-2 hover:bg-emerald-600 transition-all duration-150'>
  <p className='text-sm'>Book your journey</p>
  <PlaneTakeoff/>
</button>
</Link>



    </section>
  )
}

export default DetailsPage