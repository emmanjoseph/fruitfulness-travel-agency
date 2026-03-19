import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import Destinations from '@/components/sections/Destinations'
import Reasons from '@/components/sections/Reasons'
import ImageInfiniteScroller from '@/components/ImageInfiniteScroller'
import { About } from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'


const Home = () => {
  return (
    <div className='font-sans font-medium'>
      <Hero/>
      <ImageInfiniteScroller/>
      <About/>
      <Destinations/>
      <Reasons/>
      <Testimonials/> 
      <FAQ/>   
      <Contact/>
      <Footer/>
      </div>
  )
}

export default Home