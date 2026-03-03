import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: "Mountains",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW91bnRhaW58ZW58MHx8MHx8fDA%3D",
    link: "/categories/mountains"
  },
  {
    name: "Beaches",
    image: "https://plus.unsplash.com/premium_photo-1675039871449-62f86fb78a70?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRpYW5pJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
    link: "/categories/beaches"
  },
  {
    name: "Safari",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpfGVufDB8fDB8fHww",
    link: "/categories/safari"
  },
  {
    name: "Cities",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/categories/cities"
  },
  {
    name: "Adventure",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kfGVufDB8fDB8fHww",
    link: "/categories/islands"
  }
]

const TopCategories = () => {
  return (
    <section className="py-16">
      <div className="max-w-350 mx-auto px-4">
        <h2 className="text-3xl font-medium text-gray-700 text-center mb-12 font-heading">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="rounded-4xl shadow p-2">
              <div className='rounded-4xl shadow overflow-hidden'>
                <Image 
                  src={category.image} 
                  width={400} 
                  height={300} 
                  alt={category.name} 
                  className="w-full h-24 lg:h-48 object-cover rounded-4xl"
                />
              </div>

              <div className="p-2.5 flex items-center justify-between">
                <p className='text-muted-foreground font-semibold font-heading'>{category.name}</p>

                <Link href={category.link}>
                  <div className="size-9 bg-accent rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <ArrowRight size={16} className="text-gray-500" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopCategories