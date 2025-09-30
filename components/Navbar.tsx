"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name:"Services", path:"/services" },
    { name:"About", path:"/about" }
  ]

  return (
    <header className='absolute w-full z-50 px-4 py-6'>
      <div className="w-full max-w-[1400px] mx-auto p-2 flex items-center justify-between bg-white rounded-xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <h1 className="font-bold text-lg text-neutral-900">Fruitfulness</h1>
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
          <button className="bg-neutral-900 rounded-xl px-4 py-2 hover:bg-neutral-800 transition">
            <span className="text-neutral-200 font-semibold leading-1 text-sm cursor-pointer">
              Plan your trip
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-neutral-800"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4 shadow-lg">
          {navLinks.map(link => (
            <Link
              href={link.path}
              key={link.name}
              onClick={() => setOpen(false)}
              className="block text-[15px] font-semibold text-gray-700 hover:text-neutral-900 transition"
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full bg-neutral-900 rounded-xl px-4 py-2 hover:bg-neutral-800 transition">
            <span className="text-neutral-200 font-semibold text-sm cursor-pointer">
              Plan your trip
            </span>
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
