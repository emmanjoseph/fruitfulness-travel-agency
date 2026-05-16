"use client"

import React from "react"
import {
    EmblaOptionsType
} from "embla-carousel"

import useEmblaCarousel from "embla-carousel-react"

import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from "./EmblaCarouselArrowButtons"

import {
    useDotButton,
    DotButton
} from "@/components/EmblaCarouselBotButton"

import { Calendar, StarIcon } from "lucide-react"

type TripSlide = {
    id: string
    name: string
    imgUrl: string
    rating: number
    numberOfDays: string
}

type PropType = {
    slides: TripSlide[]
    options?: EmblaOptionsType
}

const EmblaCarousel = ({ slides, options }: PropType) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    } = useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide) => (
                        <div className="embla__slide" key={slide.id}>
                            <div className="relative overflow-hidden rounded-[38px]">

                                <img
                                    className="embla__slide__img"
                                    src={slide.imgUrl}
                                    alt={slide.name}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                    <h3 className="font-heading font-bold text-lg mb-3 line-clamp-1">
                                        {slide.name}
                                    </h3>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        {/* Rating */}
                                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                                            <StarIcon
                                                className="fill-yellow-400 text-yellow-400"
                                                size={14}
                                            />
                                            <span className="font-semibold text-sm">
                        {slide.rating}
                      </span>
                                        </div>

                                        {/* Days */}
                                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                                            <Calendar size={14} />
                                            <span className="font-semibold text-sm">
                        {slide.numberOfDays} Days
                      </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />

                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                {/* Dots */}
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={
                                "embla__dot".concat(
                                    index === selectedIndex
                                        ? " embla__dot--selected"
                                        : ""
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel