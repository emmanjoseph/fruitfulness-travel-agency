import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { MapPin, Star } from 'lucide-react'


const Services = () => {

    const destinations = [
      {
        name: "Diani Beach",
        location: "Kwale County, Kenya",
        imageUrl: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlhbmklMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.8,
      },
      {
        name: "Lake Naivasha",
        location: "Nakuru County, Kenya",
        imageUrl: "https://images.unsplash.com/photo-1736763373900-5e2de39cbbbe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmFpdmFzaGF8ZW58MHx8MHx8fDA%3D",
        rating: 4.8,
      },
      {
        name: "Zanzibar Island",
        location: "Unguja, Zanzibar Archipelago, Tanzania",
        imageUrl: "https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8emFuemliYXJ8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
      },
    ]
  return (
    <section className='max-w-[1400px] mx-auto px-4 py-20 space-y-4'>
      <h1 className='font-semibold text-3xl'>Top rated travel destinations</h1>
      <p className='text-gray-600'>Checkout some of the top rated places you can visit in East Africa </p>

      <div className="grid lg:grid-cols-10 gap-3">
        <div className="lg:col-span-8 space-y-3">
         <div className="relative w-full min-h-[350px] rounded-3xl overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586348409779-f808a7013f67?w=900&auto=format&fit=crop&q=60')] bg-cover bg-center" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

   <div className="absolute inset-0 w-full h-full z-10 p-6 text-white flex flex-col justify-between">
    <Badge className="bg-white font-semibold text-gray-700 text-[15px]">
      <Star className="fill-amber-500 text-amber-500" />
      4.7
    </Badge>

    <div className='space-y-0.5'>
      <h1 className="font-semibold text-lg">Maasai Mara</h1>
      <p className='font-semibold flex items-center gap-2'>
        <MapPin size={15} className='fill-white'/> Narok county, Kenya
      </p>
    </div>
  </div>

</div>

<div className="grid lg:grid-cols-2 gap-3">
   <div className="relative w-full min-h-[350px] rounded-3xl overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516496798850-70e120364fe4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlcmVuZ2V0aXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

   <div className="absolute inset-0 w-full h-full z-10 p-6 text-white flex flex-col justify-between">
    <Badge className="bg-white font-semibold text-gray-700 text-[15px]">
      <Star className="fill-amber-500 text-amber-500" />
      4.7
    </Badge>

    <div className='space-y-0.5'>
      <h1 className="font-semibold text-lg">Serengeti National park</h1>
      <p className='font-semibold flex items-center gap-2'>
        <MapPin size={15} className='fill-white'/> Narok county, Kenya
      </p>
    </div>
  </div>

</div>

   <div className="relative w-full min-h-[350px] rounded-3xl overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNlcmVuZ2V0aXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

   <div className="absolute inset-0 w-full h-full z-10 p-6 text-white flex flex-col justify-between">
    <Badge className="bg-white font-semibold text-gray-700 text-[15px]">
      <Star className="fill-amber-500 text-amber-500" />
      4.7
    </Badge>

    <div className='space-y-0.5'>
      <h1 className="font-semibold text-lg">Serengeti National park</h1>
      <p className='font-semibold flex items-center gap-2'>
        <MapPin size={15} className='fill-white'/> Narok county, Kenya
      </p>
    </div>
  </div>

</div>


</div>


         
        </div>
        <div className="lg:col-span-2 grid grid-rows-3 gap-3">
          {
            destinations.map((destination)=>(
              <div key={destination.name} className='relative w-full rounded-3xl overflow-hidden'>
                <div style={{
                  backgroundImage:`url(${destination.imageUrl})`
                }} className='absolute inset-0 bg-cover bg-center'/>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

                 <div className="absolute inset-0 w-full h-full z-10 p-3 text-white flex flex-col justify-between">
    <Badge className="bg-white font-semibold text-gray-700 text-[15px]">
      <Star className="fill-amber-500 text-amber-500" />
      4.7
    </Badge>

    <div className='space-y-0.5'>
      <h1 className="font-semibold text-base">{destination.name}</h1>
      <p className='font-semibold text-sm flex items-center gap-2'>
        <MapPin size={15} className='fill-white'/> {destination.location}
      </p>
    </div>
  </div>

              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Services