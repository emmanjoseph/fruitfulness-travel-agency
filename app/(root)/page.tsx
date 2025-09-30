import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import About from '@/components/sections/About'
import Features from '@/components/sections/Features'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import React from 'react'

const Home = () => {
  return (
    <div className='font-sans font-medium'>
      <Hero/>
      <About/>
      <Features/>
      <Services/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      </div>
  )
}

export default Home