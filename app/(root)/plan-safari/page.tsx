import React from 'react'

const Page = () => {
    return (
        <div className={'font-sans'}>
            <div  className="h-100 lg:h-100 relative bg-[url('https://images.unsplash.com/photo-1711091704998-3bea86948c83?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8emFuemliYXIlMjBpc2xhbmR8ZW58MHx8MHx8fDA%3D')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden">
                <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

                <div className="relative h-full z-10 flex flex-col items-center space-y-2 text-white pt-40">
                    <h1 className="text-4xl lg:text-7xl text-center font-bold font-heading
          ">Start your journey</h1>
                    <p className="text-gray-100 text-center max-w-xl font-medium text-base md:text-xl p-4">Customize your safari</p>
                </div>

            </div>
        </div>
    )
}
export default Page
