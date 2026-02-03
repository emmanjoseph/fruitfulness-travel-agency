"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchJourneyById, requestBooking } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, User, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(7),
  travelDate: z.string(),
  numberOfGuests: z.coerce.number<number>().min(1),
  journeyId: z.string(),
});

const PlanTrip = () => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("tripId") || "";
  const router = useRouter()
  const [journeyDetails, setJourneyDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  // ---------------- FETCH JOURNEY USING YOUR PATTERN ----------------
  useEffect(() => {
    const getJourneyDetails = async () => {
      if (idParam) {
        try {
          const details = await fetchJourneyById(idParam);
          console.log("Journey details", details);
          setJourneyDetails(details);
        } catch (error) {
          console.error("Error fetching details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getJourneyDetails();
  }, [idParam]);

  // ---------------- FORM SETUP ----------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelDate: "",
      numberOfGuests:1,
      journeyId: idParam,
    },
  });

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const data = await requestBooking(values);
    console.log("Booking response:", data);
    router.push("/plan-trip/success")
  } catch (error) {
    alert("Error submitting booking");
  }
  
  
};


  const details = journeyDetails?.data || journeyDetails;

  return (
    <div className="py-20 max-w-[1440px] mx-auto px-4 grid lg:grid-cols-2 gap-10 font-sans">
      <div>
      {loading && 
         <div className=''>
    <Skeleton className="h-12 w-3/4 rounded-xl" />
    <Skeleton className="h-[225px] w-9/10 bg-gray-200 rounded-[30px]" />
  </div>
      }

      {!loading && details && (
        <div className="space-y-3">
           <h2 className="font-semibold text-gray-600 text-xl">Plan for {details.name}</h2>
           <Image
                           src={details.imageUrl || "https://images.unsplash.com/photo-1716404211069-dc368a7247fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpbGltYW5qYXJvJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D"}
                           alt={details.name}
                           width={700}
                           height={700}
                           className='w-full lg:w-3/4 h-60 md:h-80 rounded-[30px] object-cover'
                        />
          <p className="font-medium">{details.numberOfDays}- Day {details.location} Adventure</p>

          <div className="w-full lg:w-3/4">
  <h1 className='text-lg font-semibold mb-2'>Accommodation</h1>
  <div className='space-y-2'>
    {details.accommodations && details.accommodations.map((accommodationObj: any, index: number) => (
      <div
        key={index}
        className='mb-6 p-4 border-l-4 border-emerald-500 bg-gray-50  rounded text-sm'
      >
        {accommodationObj.name} ({accommodationObj.tier})
      </div>
    ))}
  </div>

  <div>
  <h1 className='text-lg font-semibold mb-2'>Transportation</h1>
  <div className="p-4 border-l-4 border-emerald-500 bg-gray-50  rounded">
    {details.transportation}
  </div>

</div>
</div>
        </div>
      )}

      </div>
     

      {/* ---------------- FORM ---------------- */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full lg:max-w-3/4">

          <h1 className="font-semibold text-gray-600 text-xl">Submit your booking</h1>
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark-4">Username</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 px-3.5 py-2 bg-gray-200/30 rounded-3xl">
                    <User size={16} className="dark-4"/>
                    <Input {...field} placeholder="Daniel Jackson"
                    className="focus-visible:ring-0 border-0 shadow-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
               <FormItem>
                <FormLabel className="dark-4">Email address</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 px-3.5 py-2 bg-gray-200/30 rounded-3xl">
                    <User size={16} className="dark-4"/>
                    <Input {...field} placeholder="DanielJackson@gmail.com"
                    className="focus-visible:ring-0 border-0 shadow-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
               <FormItem>
                <FormLabel className="dark-4">Contact No</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 px-3.5 py-2 bg-gray-200/30 rounded-3xl">
                    <User size={16} className="dark-4"/>
                    <Input {...field} placeholder="07XXXXXXX"
                    className="focus-visible:ring-0 border-0 shadow-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Date</FormLabel>
                <FormControl>
                   <div className="flex items-center gap-3 px-3.5 py-2 bg-gray-200/30 rounded-3xl">

                   <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className="w-full justify-between"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full overflow-hidden p-0" align="start">
         <Calendar
  mode="single"
  selected={date}
  captionLayout="dropdown"
  onSelect={(selected) => {
    setDate(selected);
    form.setValue("travelDate", selected?.toISOString() || "");
    setOpen(false);
  }}
/>

        </PopoverContent>
      </Popover>
                   </div>
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark-4">Number of guests</FormLabel>
                <FormControl>
                    <div className="flex items-center gap-3 px-3.5 py-2 bg-gray-200/30 rounded-3xl">
                      <Users size={16} className="dark-4"/>

                     <Input
  type="number"
  min={1}
  value={field.value}
  onChange={(e) => field.onChange(Number(e.target.value))}
  className="focus-visible:ring-0 border-0 shadow-none"
/>

                    </div>
                  
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
  control={form.control}
  name="journeyId"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="hidden">Journey ID</FormLabel>
      <FormControl className="hidden">
        <Input {...field} disabled />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          <Button className="w-full rounded-3xl bg-emerald-600 h-12 text-white font-bold hover:bg-emerald-500 cursor-pointer" type="submit">
            Submit Booking
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PlanTrip;
