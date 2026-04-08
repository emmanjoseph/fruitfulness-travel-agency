import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Destinations from '@/components/sections/Destinations'
import Reasons from '@/components/sections/Reasons'
import ImageInfiniteScroller from '@/components/ImageInfiniteScroller'
import { About } from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import GoogleReviews from "@/components/sections/GoogleReviews";


const Home = () => {
  return (
    <div className='font-sans font-medium'>
      <Hero/>
      <About/>
      <Destinations/>
      <Reasons/>
      <FAQ/>
      <GoogleReviews/>
      <Contact/>
      <ImageInfiniteScroller/>
      <Footer/>
      </div>
  )
}

export default Home