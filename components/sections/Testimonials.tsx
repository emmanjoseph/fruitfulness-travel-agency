import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = {
  featured: {
    metric: "5★",
    subtitle: "Rated safari experiences",
    quote:
      "From the first inquiry to the final day of our safari, everything was perfectly organized. The guides were knowledgeable, the lodges were stunning, and every detail was handled with care. It was the most unforgettable travel experience we’ve ever had.",
    name: "David Callahan",
    role: "Traveler, United Kingdom",
    avatar: "/images/avatar1.jpg",
  },
  primary: {
    metric: "3X",
    subtitle: "Repeat bookings from happy travelers",
    quote:
      "Planning a multi-country safari felt overwhelming at first, but the team made it effortless. Their local knowledge and attention to detail gave us complete peace of mind throughout the journey.",
    name: "Sarah Mitchell",
    role: "Family Safari Traveler",
    avatar: "/images/avatar2.jpg",
  },
  secondary: {
    quote:
      "Our guide knew exactly where to find wildlife and shared incredible stories about the land and culture. Every game drive felt personal and authentic.",
    name: "Tom Becker",
    role: "Wildlife Photography Enthusiast",
    avatar: "/images/avatar3.jpg",
  },
  dark: {
    quote:
      "From airport pickup to our final beach stay, everything ran smoothly. The team exceeded our expectations and delivered a truly seamless African adventure.",
    name: "Amina Yusuf",
    role: "Luxury Travel Client",
    avatar: "/images/avatar4.jpg",
  },
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-semibold text-gray-900">
          Results that speak volumes
        </h2>
        <p className="text-2xl text-gray-500 mt-2">
          Read success stories
        </p>
        <p className="text-gray-500 mt-3">
          Discover how travelers from around the world experience Africa with us.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Featured */}
        <div className="bg-[#fcfcfc] rounded-4xl p-10 shadow-sm flex flex-col justify-between lg:row-span-2">
          <div>
            <h3 className="text-6xl font-bold text-gray-900">
              {testimonials.featured.metric}
            </h3>
            <p className="text-lg text-gray-600 mt-2">
              {testimonials.featured.subtitle}
            </p>

            <Quote className="mt-6 text-emerald-500 fill-emerald-500" />

            <p className="mt-12 text-gray-600 leading-relaxed">
              {testimonials.featured.quote}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-14">
            <Image
              src={testimonials.featured.avatar}
              alt={testimonials.featured.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {testimonials.featured.name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials.featured.role}
              </p>
            </div>
          </div>
        </div>

        {/* Right Top */}
        <div className="lg:col-span-2 bg-[#fcfcfc] rounded-4xl p-8 shadow-sm">
          <h4 className="text-3xl font-semibold text-gray-900">
            {testimonials.primary.metric}
          </h4>
          <p className="text-gray-600 mb-4">
            {testimonials.primary.subtitle}
          </p>

          <Quote className="text-emerald-500 fill-emerald-500" />

          <p className="mt-4 text-gray-600">
            {testimonials.primary.quote}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Image
              src={testimonials.primary.avatar}
              alt={testimonials.primary.name}
              width={100}
              height={100}
              className="rounded-full size-10 object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                {testimonials.primary.name}
              </p>
              <p className="text-xs text-gray-500">
                {testimonials.primary.role}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="bg-[#fcfcfc] rounded-3xl p-8 shadow-sm">
          <Quote className="text-emerald-500 fill-emerald-500" />
          <p className="mt-4 text-gray-600">
            {testimonials.secondary.quote}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Image
              src={testimonials.secondary.avatar}
              alt={testimonials.secondary.name}
              width={100}
              height={100}
              className="rounded-full size-10 object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                {testimonials.secondary.name}
              </p>
              <p className="text-xs text-gray-500">
                {testimonials.secondary.role}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Right – Dark */}
        <div className="bg-neutral-900 text-white rounded-3xl p-8">
          <Quote className="text-emerald-400 fill-emerald-400" />
          <p className="mt-4 text-gray-200">
            {testimonials.dark.quote}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Image
              src={testimonials.dark.avatar}
              alt={testimonials.dark.name}
              width={100}
              height={100}
              className="rounded-full object-cover size-10"
            />
            <div>
              <p className="text-sm font-semibold">
                {testimonials.dark.name}
              </p>
              <p className="text-xs text-gray-400">
                {testimonials.dark.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
