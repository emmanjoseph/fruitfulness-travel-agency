import { mostPopularDestinations } from '@/constants'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, StarIcon, Cloud, Dot } from 'lucide-react'

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // ✅ Await the promise before using
  const { id } = await params

  const details = mostPopularDestinations.find((d) => d.id === id)

  if (!details) {
    notFound()
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 space-y-5 font-sans font-medium">
      <div className="w-full flex flex-col md:flex-row md:items-center gap-7">
        <Image
          src={details.imageUrl}
          alt={details.name}
          width={1000}
          height={1000}
          className="h-40 md:h-96 md:w-6/12 object-cover rounded-3xl"
        />

        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-heading text-gray-800 font-semibold">
            {details.name}
          </h1>
          <p className="flex items-center gap-1.5 text-base font-semibold text-gray-600">
            <MapPin size={16} className="text-green-500 fill-green-500" />
            {details.location}
          </p>
          <p className="flex items-center gap-1.5 text-base font-semibold text-gray-600">
            <StarIcon size={16} className="text-amber-500 fill-amber-500" />
            {details.rating}
          </p>
          <p className="flex items-center gap-1.5 text-[15px] font-medium text-gray-600 max-w-lg">
            <Cloud size={16} className="text-blue-500 fill-blue-500" />
            {details.climate}
          </p>
        </div>
      </div>

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
                <p key={idx} className="text-gray-600 text-[15px] flex gap-1.5">
                  <Dot size={19} /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
