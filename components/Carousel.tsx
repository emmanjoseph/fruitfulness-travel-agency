"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import Link from 'next/link'

type Destination = {
  id: string;
  name: string
  imageUrl: string
  location: string
  description: string
  activities: string[]
  rating: number
}

type PropType = {
  slides: Destination[]
  options?: EmblaOptionsType
}


const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

 

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index.id}>
              <div className="bg-white rounded-[35px] overflow-hidden h-full flex flex-col">
                  {/* Image */}
                <Image
                  src={index.imageUrl}
                  alt={index.name}
                  className="h-[430px] w-full object-cover"
                  width={1000}
                  height={1000}
                />

                <div className="w-full h-full rounded-[35px] absolute bg-gradient-to-b from-transparent via-black/20 to-black/90 flex flex-col justify-between p-5">
                 <Link href={`/details/${index.id}`} className='bg-white flex items-center p-3 rounded-[35px] w-1/3'>
                    <span className='font-semibold text-sm'>Explore</span>
                    <ArrowUpRight size={18}/>
                 </Link>

                 <div className='text-gray-200'>
                    <h1 className='font-heading text-lg font-semibold'>
                        {index.name}
                    </h1>

                    <div className="flex items-center justify-between">
                        <p className='text-sm font-semibold flex items-center gap-1'><MapPin size={18} className='text-green-400'/> <span>{index.location}</span></p>
                    <p className='text-sm font-bold flex items-center gap-1'><Star size={18} className='text-yellow-500 fill-yellow-400'/> <span>{index.rating}</span></p>
                    </div>
  

                 </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

       
      </div>
    </section>
  )
}

export default EmblaCarousel
