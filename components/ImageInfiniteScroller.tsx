import React from "react"
import InfiniteScroll from "./InfiniteScroll"
import Image from "next/image"

const images = [
    
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1498038116800-4159eb9b2a62?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661887943256-ccfa487d0dff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1527436553949-ea84cd6cf13c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXQlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1646159755791-54e741749028?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXQlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1558907530-83566904e778?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGxhbXV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1711802536772-0ef59886bc1b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtdXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661952476300-1f32e068126f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D",
];

const GradientWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    {/* Left fade */}
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-gray-50 to-transparent" />

    {/* Right fade */}
    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-gray-50 to-transparent" />

    {children}
  </div>
)

const ImageInfiniteScroller = () => {
  return (
    <div>
        <InfiniteScroll
      speed={60}
      direction="left"
      fadeWidth={100}
      fadeColor="#f9fafb"
      className="py-3"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[320px] h-[220px] rounded-2xl overflow-hidden"
        >
          <Image
            src={src}
            alt="Travel destination"
            width={500}
            height={500}
            className="w-full h-full"
            sizes="320px"
            priority={index < 3}
          />
        </div>
      ))}
    </InfiniteScroll>

        <InfiniteScroll
      speed={60}
      direction="right"
      fadeWidth={1000}
      fadeColor="white"
      className=""
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[320px] h-[220px] rounded-2xl overflow-hidden"
        >
          <Image
            src={src}
            alt="Travel destination"
            width={500}
            height={500}
            className="w-full h-full"
            sizes="320px"
            priority={index < 3}
          />
        </div>
      ))}
    </InfiniteScroll>

    </div>
    
  )
}

export default ImageInfiniteScroller
