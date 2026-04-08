"use client"
import { ControlledMap } from '@/components/Map'
import SemiFooter from '@/components/SemiFooter'
import { shortenText } from '@/components/trips-grid'
import { Badge } from '@/components/ui/badge'
import { Card,CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchJourneyById, fetchRelatedJourneys } from '@/lib/api'
import {
    ArrowLeft, Calendar1, CalendarFold, Clock, DollarSignIcon, Heart, MapPin,
    Palmtree, PlaneTakeoff, StarIcon, Volleyball, VolleyballIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState , useRef} from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

function ItineraryTimeline({ itineraries }: { itineraries: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    const items = containerRef.current.querySelectorAll(".itinerary-item")

    // Animate the vertical line growing downward
    gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: items.length * 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
    )

    // Animate each item fading in as the line reaches it
    items.forEach((item, i) => {
      gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
      )

      // Animate the dot
      const dot = item.querySelector(".itinerary-dot")
      if (dot) {
        gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [itineraries])

  return (
      <div className="py-6">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-x-2">
          <CalendarFold size={22} /> Day-wise Itinerary
        </h2>

        <div ref={containerRef} className="relative">
          {/* Vertical growing line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-100 overflow-hidden">
            <div
                ref={lineRef}
                className="w-full h-full bg-emerald-400 origin-top"
            />
          </div>

          <div className="space-y-8">
            {itineraries.map((item: any, index: number) => (
                <div key={item.id} className="itinerary-item flex gap-5 pl-1">
                  {/* Dot */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div className="itinerary-dot w-12 h-12 rounded-full bg-white flex items-center justify-center text-white font-bold text-sm">
                        <div className="size-8 bg-emerald-600 rounded-full flex items-center justify-center">
                            {item.day}

                        </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1  px-5 py-4 transition-all duration-200">
                    <h3 className="font-semibold text-xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] lg:text-base mt-1 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}


const DetailsPage = () => { 
  const { id } = useParams()
  const idParam = Array.isArray(id) ? id[0] : id
  const [journeyDetails, setJourneyDetails] = useState<any>(null);
  const [relatedJourneys, setRelatedJourneys] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const getJourneyDetails = async () => {
      if (idParam) {
        try {
          const details = await fetchJourneyById(idParam);
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
      <div
          style={{
            background: `url(${details.imgUrl})`,
            backgroundPosition:"center center",
            backgroundSize:"cover",
          }}
          className="h-140 lg:h-150 relative bg-fixed bg-cover bg-center text-gray-200 overflow-hidden">
        <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

        <div className="relative h-full z-10 flex flex-col items-center space-y-2 text-white pt-37">
          <h1 className="text-4xl lg:text-6xl text-center font-semibold font-sans max-w-3xl
          ">{details.name}</h1>
          <p className="text-gray-100 text-center max-w-5xl font-medium text-base p-4 font-sans">{details.description}</p>
        </div>

      </div>
       <section className='py-20 max-w-4xl mx-auto px-4 md:px-0 space-y-3.5 font-sans'>
           <div className="flex items-center justify-between">
               <button className='flex items-center gap-x-1.5 px-7 py-2 cursor-pointer shadow-md rounded-[10px] hover:shadow-lg transition' onClick={router.back}>
                   <ArrowLeft size={16}/>
                   <p className="text-gray-600 font-semibold text-sm">Go back</p>
               </button>

               <Badge className={'p-2'}>
                   <StarIcon className={'text-amber-300 fill-amber-300'}/>
                   Rating
                   <p className="font-semibold">{details.rating}/5</p>
               </Badge>
           </div>


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

           {details.itineraries?.length > 0 && (
             <ItineraryTimeline itineraries={details.itineraries}/>
         )}

{/* Activities */}
{details.activities?.length > 0 && (
  <div>
   <h1 className='text-2xl font-bold py-3 flex items-center gap-x-1.5'>Travel highlights</h1>
    
    <div className="space-y-2">
      {details.activities.map((activity: string, index: number) => (
        <div
          key={index}
          className="py-4 px-6 bg-gray-50 rounded-xl flex items-center gap-x-2.5"
        >
            <Palmtree size={17}/>
          {activity}
        </div>
      ))}
    </div>
  </div>
)}

{/* Best Time */}
           {details.bestTimeToVisit?.length > 0 && (
               <div>
                   <h2 className="text-2xl font-bold py-3 flex items-center gap-x-1.5">
                       Best Time to Visit
                   </h2>
                   <div className="flex flex-wrap gap-2">
                       {details.bestTimeToVisit.map((period: string, i: number) => (
                           <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium">
          {period}
        </span>
                       ))}
                   </div>
               </div>
           )}

<div>
  
</div>
{/* <ControlledMap/> */}


<Link href={`/plan-trip/${details.id}`}>
<button type="button" className='bg-emerald-700 max-w-[500px] mx-auto rounded-[30px] p-4 text-white font-semibold cursor-pointer flex items-center justify-center gap-x-2 hover:bg-emerald-600 transition-all duration-150'>
  <p className='text-base font-semibold'>Submit a booking request</p>
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