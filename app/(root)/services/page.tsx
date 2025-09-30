import EmblaCarousel from '@/components/Carousel'
import { coastalPackages, destinations, weekendPackages, wildlifePackages } from '@/constants'
import React from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowUp, Hotel, MapPin, PlaneTakeoff, Presentation, StarIcon } from 'lucide-react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TravelCard = ({ destination }: { destination: any }) => (
  <div key={destination.id} className="tour-card rounded-[35px] shadow-lg overflow-hidden">
    <Image
      src={destination.imageUrl}
      alt={destination.name}
      width={400}
      height={300}
      className="w-full h-52 object-cover"
    />

    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-700">{destination.name}</h3>
      <div className="flex items-center justify-between mt-2">
        <p className="flex items-center gap-1.5">
          <MapPin size={13} className="text-green-500" />
          <span className="text-sm font-semibold text-gray-500">{destination.location}</span>
        </p>

        <p className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
          <StarIcon size={13} className="text-yellow-500" />
          <span>{destination.rating}</span>
        </p>
      </div>
    </div>
  </div>
)

type SectionProps = {
  title: string
  subtitle: string
  buttonText: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  bgImage?: string
}

const ServiceSection = ({ title, subtitle, buttonText, data, bgImage = '/images/travelpattern.jpg' }: SectionProps) => (
  <div className="relative w-full overflow-hidden">
    {/* Background pattern */}
    <Image
      src={bgImage}
      alt="travel-bg"
      fill
      className="object-cover opacity-10"
      style={{ zIndex: 0 }}
    />

    {/* Content */}
    <div className="relative z-10 flex items-center justify-center h-full py-14">
      <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2 font-medium">
          <h1 className="font-heading text-gray-800 text-4xl md:text-6xl max-w-md">
            {title}
          </h1>
          <p className="text-base max-w-md mt-3 font-medium">{subtitle}</p>
          <button className="mt-3 px-7 py-4 bg-gray-800 rounded-3xl font-audiowide text-sm text-gray-100">
            {buttonText}
          </button>
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((destination) => (
            <TravelCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const Services = () => {
  return (
    <section className="font-sans">
      {/* Hero */}
      <div className="w-full h-[48vh]">
        <div className="w-full h-full bg-[url(/images/wildlifepattern.jpg)] bg-cover bg-center flex flex-col items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              Our Services
            </h1>
            <p className="mt-4 text-white text-sm md:text-base lg:text-lg max-w-lg font-semibold">
              Explore safaris, weekend getaways, beach holidays, and curated corporate tours.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations carousel */}
      <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-7">
        <div>
          <h1 className="text-2xl text-gray-700 font-bold pb-5">
            &#128506; Most popular destinations
          </h1>
          <EmblaCarousel slides={destinations} />
        </div>

        <h1 className="text-2xl text-gray-700 font-bold pb-5">
          &#128506; Our Service Packages
        </h1>
      </div>

      {/* Wildlife */}
<ServiceSection
  title="Unforgettable Wildlife Safaris in Kenya"
  subtitle="Witness the magic of the wild with our safari packages. From lions to elephants, enjoy an unforgettable journey in Kenya’s iconic parks."
  buttonText="Feel free to contact us"
  data={wildlifePackages}
  bgImage="/images/wild.jpg"
/>

{/* Coastal */}
<ServiceSection
  title="Luxury Coastal Destinations and Beach Escapes"
  subtitle="Discover the beauty of the coast — white sandy beaches, luxury resorts, and breathtaking ocean views."
  buttonText="Plan your retreat"
  data={coastalPackages}
  bgImage="/images/sand.jpg"
/>

{/* Weekend */}
<ServiceSection
  title="Refreshing Weekend Getaways for Relaxation"
  subtitle="Quick getaways designed for relaxation and fun. Escape the city hustle with a refreshing weekend retreat."
  buttonText="Book your weekend"
  data={weekendPackages}
  bgImage="/images/vacation.jpg"
/>


      {/* Corporate (left as is) */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={'/images/travelpattern.jpg'}
          alt="travel-bg"
          fill
          className="object-cover opacity-10"
        />
        <div className="relative z-10 flex items-center justify-center h-full py-14">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
            <div className="md:w-1/3 font-medium">
              <h1 className="font-heading text-gray-800 text-4xl md:text-6xl max-w-lg">
                Explore our corporate packages
              </h1>
              <p className="text-base max-w-md font-medium mt-3">
                Build stronger teams with our curated retreats. Perfect for conferences, team bonding, and executive getaways.
              </p>
             
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
  {/* Conferencing */}
  <div className="tour-card p-6 shadow-md bg-white hover:shadow-xl transition">
    <div className="flex flex-col items-center text-center space-y-3">
      <Presentation/>
      <h3 className="font-heading text-lg font-semibold text-gray-800">Conferencing</h3>
      <p className="text-sm text-gray-600">
        Professional venues and seamless arrangements for corporate and private events.
      </p>
    </div>
  </div>

  {/* Hotel Booking */}
  <div className="tour-card p-6 shadow-md bg-white hover:shadow-xl transition">
    <div className="flex flex-col items-center text-center space-y-3">
      <Hotel/>
      <h3 className="font-heading text-lg font-semibold text-gray-800">Hotel Booking</h3>
      <p className="text-sm text-gray-600">
        Find and reserve the best hotels with comfort, luxury, and convenience in mind.
      </p>
    </div>
  </div>

  {/* Flight & Ticketing */}
  <div className="tour-card p-6 shadow-md bg-white hover:shadow-xl transition">
    <div className="flex flex-col items-center text-center space-y-3">
     <PlaneTakeoff/>
      <h3 className="font-heading text-lg font-semibold text-gray-800">Flight & Air Ticketing</h3>
      <p className="text-sm text-gray-600">
        Hassle-free flight bookings and ticketing for both local and international travel.
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      <div className='py-24 max-w-[1400px] mx-auto px-4'>
        <div className="w-full flex flex-co items-center md:flex-row justify-between mb-11">
          <div>
            <Image
               src={'/logo.jpg'}
               alt='logo'
               width={500}
               height={500}
               className='size-20 md:size-40'
            />
          </div>

          <div className='flex flex-col md:flex-row gap-20'>
                 <div>
                    <h1 className='text-base font-semibold text-gray-800'>Quick links</h1>
                    <div>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Wildlife package</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Coastal package</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>Weekend packages</p>
                      </Link>
                      <Link href={'/services'}>
                         <p className='text-sm font-medium text-gray-600'>About us</p>
                      </Link>
                    </div>
                    
                 </div>

                 <div>
                    <h1 className='text-base font-semibold text-gray-800'>Location</h1>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>Viewpark Towers 17th floor</p>
                    </div>
                    
                 </div>

                
          </div>

        </div>

       

           <div className="md:flex flex-col md:flex-row items-center pt-10 justify-between border-t border-gray-300">
          <span className='text-sm text-gray-500'>&copy; 2025 Fruitfulness Travel LTD. All rights reserved.</span>

          <button className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowLeft/>
             Back to home page
          </button>

          <button 
          className='text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-150 cursor-pointer flex items-center gap-1 tour-card px-2 py-1'>
            <ArrowUp/>
             Back to top
          </button>

          <div className="flex items-center gap-4">
            <Link href={'/'}>
               <Image src={'/images/facebook.png'} alt='facebook' width={24} height={24}/>
            </Link>
            <Link href={'/'}>
               <Image src={'/images/instagram.png'} alt='instagram' width={24} height={24}/>
            </Link>
            <Link href={'/'}>
               <Image src={'/images/whatsapp.png'} alt='whatsapp' width={24} height={24}/>
            </Link>
          </div>
        </div>

        </div>

    
    </section>
  )
}

export default Services
