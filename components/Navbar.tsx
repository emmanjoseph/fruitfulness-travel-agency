"use client"
import { useState } from "react"
import Link from 'next/link'
import { Menu, PlaneTakeoff } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'

const Navbar = () => {
  const [open, setOpen] = useState(false)


  const navLinks = [
    { name: "Destinations", path: "/services" },
    // {name:"Kenya", path:"/kenya-safaris"},
    // {name:"Tanzania", path:"/tanzania-safaris"},
    { name: "About", path: "/about" }
  ]


  return (
    <header className='p-4  bg-white absolute w-full z-20 font-sans'>
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <Image
              src={'/favicon.svg'}
              alt='icon'
              width={20}
              height={20}
            />
            <h1 className="font-bold text-lg text-neutral-900">
              <span className='text-green-900'>Fruitfulness</span>Travel
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
          <div className="flex items-center gap-8">
            {navLinks.map(link => (
              <Link href={link.path} key={link.name}>
                <span className="text-[14px] font-semibold text-gray-700 hover:text-neutral-900 transition">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          <button
            style={{ borderRadius: 50 }}
            className="bg-neutral-900 px-4 py-2.5 hover:bg-neutral-800 transition-all flex items-center gap-2.5 text-white cursor-pointer"
          >
            <span className="text-neutral-200 font-semibold leading-1 text-sm cursor-pointer">
              Plan your trip
            </span>
            <PlaneTakeoff size={18}/>
          </button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className='md:hidden'>
            <Menu />
          </SheetTrigger>
          <SheetContent side='left' className='bg-white py-5 md:hidden'>
            <SheetHeader>
              <SheetTitle className='font-sans text-xl font-bold mb-4'>
                Fruitfulness Travel
              </SheetTitle>
              <SheetDescription className='flex flex-col gap-7'>
                {navLinks.map((link) => (
                  <Link
                    href={link.path}
                    key={link.name}
                    onClick={() => setOpen(false)} // ✅ closes the sheet
                  >
                    <span className="text-base font-semibold text-gray-700 hover:text-neutral-900 transition">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}

export default Navbar
