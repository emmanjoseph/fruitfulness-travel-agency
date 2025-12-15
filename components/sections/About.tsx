import { Map } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

interface Props {
  img: string
  title: string
  location: string
  description: string
}

const TouristAttraction = ({ img, title, location, description }: Props) => (
  <div
    className="relative min-w-[290px] sm:min-w-[340px] md:min-w-[1100px] h-full rounded-r-[40px] overflow-hidden shadow-lg snap-center"
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 text-white">
      {/* Top Info */}
      <div className="flex items-center gap-3">
        <div className="size-11 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
          <Map size={17} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-heading">{title}</h3>
          <p className="text-sm md:text-base text-gray-200">{location}</p>
        </div>
      </div>

      {/* Bottom Description */}
      <p className="text-sm md:text-base max-w-md font-medium">
        {description}
      </p>
    </div>
  </div>
)


const About = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-36 space-y-3 font-sans">
      {/* Intro */}
      <div className="space-y-6 pb-7">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800">
          Discover the <br /> largest shared adventure
        </h1>
      </div>

      {/* Scrollable Attractions */}
      <div className="hide-scrollbar relative z-10 flex h-[370px] w-full items-start gap-4 md:gap-6 overflow-x-auto lg:h-[450px] xl:h-[600px] snap-x snap-mandatory">
        <TouristAttraction
          img="https://images.unsplash.com/photo-1745691123668-ad57c3804810?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
          title="Explore Wildlife"
          location="Kenya"
          description="Vast savannahs alive with lions, elephants, and the legendary Great Migration—experience Africa’s wildlife at its most raw and breathtaking."

        />
        <TouristAttraction
          img="https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D"
          title="Sandy beaches"
          location="Diani beach, Kenya"
          description="Powder-white sands, turquoise waters, and golden sunsets create the perfect escape for relaxation, water sports, and coastal luxury."

        />
        <TouristAttraction
          img="https://images.unsplash.com/photo-1716404214250-8d34f6b0bc24?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Mountains"
          location="Mount Kilimanjaro, Tanzania"
          description="Africa’s highest peak offers dramatic landscapes, alpine trails, and an unforgettable journey from tropical forests to snowy summits."

        />
        <TouristAttraction
          img="https://images.unsplash.com/photo-1636636985438-4154b379aac5?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Lakes & Valleys"
          location="The great rift valley"
          description="Serene lakes framed by dramatic valleys and rolling hills, offering peaceful retreats, birdlife, and stunning natural panoramas."

        />
      </div>

      {/* CTA */}
      <div className="flex items-center justify-end mt-10 px-6 lg:-mt-60 lg:mr-6 relative z-20">
        <div className="relative w-full bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 rounded-[40px] overflow-hidden shadow-xl">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-white">
            Unsure Where to Begin? <br />
            <span className="font-normal">Let Us Guide Your Journey</span>
          </h2>
          <p className="text-[15px] md:text-base mt-5 text-white/90 font-medium">
            Exploring new destinations can feel overwhelming, but you don’t have
            to navigate it alone. Our team is here to help you discover, plan,
            and enjoy every step of your adventure with confidence and ease.
          </p>

          <Image
            src="/images/quote.svg"
            alt="camp-2"
            width={186}
            height={219}
            className="absolute -right-6 bottom-4 w-[140px] lg:bottom-10 xl:-right-8 xl:w-[186px]"
          />
          <button className="mt-6 px-6 py-3 bg-white text-emerald-800 font-semibold rounded-full hover:bg-gray-100 transition cursor-pointer">
            Start Planning
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
