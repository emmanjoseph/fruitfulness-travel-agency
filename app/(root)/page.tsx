import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import About from '@/components/sections/About'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import Destinations from '@/components/sections/Destinations'
import Reasons from '@/components/sections/Reasons'
import Steps from '@/components/sections/Steps'


const Home = () => {
  return (
    <div className='font-sans font-medium'>
      <Hero/>
      <About/>
      <Destinations/>
      <Steps/>
      <Reasons/>
      <Testimonials/>    
      <Contact/>
      <Footer/>
      </div>
  )
}

export default Home