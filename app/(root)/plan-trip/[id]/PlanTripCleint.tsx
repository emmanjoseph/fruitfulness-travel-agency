"use client";

import { fetchJourneyById, requestBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar1, ChevronDownIcon, DollarSignIcon, Mail, MapPinXInside, Phone, Star, User2, Users } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

type Props = {
  tripId: string;
};

const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(7),
  travelDate: z.string(),
  numberOfGuests: z.number().min(1),
  journeyId: z.string(),
});

export default function PlanTripClient({ tripId }: Props) {
  console.log("Client tripId:", tripId);
  const router = useRouter();
  const [journeyDetails, setJourneyDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // ---------------- FETCH JOURNEY ----------------
  useEffect(() => {
    const loadJourney = async () => {
      try {
        const data = await fetchJourneyById(tripId);
        setJourneyDetails(data);
      } catch (err) {
        console.error("Failed to fetch journey", err);
      } finally {
        setLoading(false);
      }
    };

    loadJourney();
  }, [tripId]);

  // ---------------- FORM ----------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelDate: "",
      numberOfGuests: 1,
      journeyId: tripId,
    },
  });

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setIsSubmitting(true);
  try {
    await toast.promise(
      requestBooking(values),
      {
        loading: "Submitting your booking request...",
        success: "Your booking request has been sent successfully!",
        error: "Failed to submit booking request",
      }
    );
    
    router.push("/plan-trip/success");
  } catch (error) {
    console.error("Booking error:", error);
  }finally{
    setIsSubmitting(false)
  }
};

  const details = journeyDetails?.data ?? journeyDetails;
  console.log(details);

  if (loading || !details) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center">
        Loading trip details...
      </section>
    );
  }

  return (
    <section className="py-20 max-w-[1400px] px-4 mx-auto grid lg:grid-cols-3 gap-10 font-sans">
      {/* LEFT SIDE - STICKY PRICING TIERS */}
      <div className="lg:col-span-1">
        {details.pricing?.length > 0 && (
          <div className="lg:sticky lg:top-20">
            <h2 className="text-xl font-semibold text-gray-600 py-3 flex items-center gap-x-1.5">
              <DollarSignIcon /> Pricing Tiers
            </h2>

            <div className="space-y-4">
              {details.pricing.map((price: any, index: number) => (
                <Card
                  key={index}
                  className="p-3 border border-gray-200 rounded-4xl bg-white shadow-sm"
                >
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="font-semibold text-xl text-gray-800">
                      {price.tier}
                    </h3>
                    <Badge className="bg-emerald-600 text-white font-bold px-3 py-2">
                      {price.currency}
                    </Badge>
                  </CardHeader>

                  <CardContent className="mt-2 text-sm text-gray-700 space-y-1">
                    <div className="grid grid-cols-2 gap-3">
                      <p className="bg-gray-200/20 p-4 rounded-2xl">
                        <strong>Citizen:</strong> {price.citizenPrice}
                      </p>
                      <p className="bg-gray-200/20 p-4 rounded-2xl">
                        <strong>Non-Resident:</strong> {price.nonResidentPrice}
                      </p>
                    </div>

                    <div className="bg-gray-200/20 p-4 rounded-2xl">
                      <h3 className="text-gray-700 font-semibold">Accommodation</h3>
                      <p>{price.accommodation}</p>
                    </div>

                    {price.transportation && (
                      <p className="bg-gray-200/20 p-4 rounded-2xl">
                        <strong>Transport:</strong> {price.transportation.type} –{" "}
                        {price.transportation.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - TRIP DETAILS & FORM */}
      <div className="lg:col-span-2 space-y-8">
        {/* TRIP DETAILS */}
        <div className="space-y-2.5">
          <h1 className="text-xl font-semibold text-gray-600">
            Plan trip for {details.name}
          </h1>
          <Image
            src={details.imgUrl}
            alt={details.name}
            width={500}
            height={500}
            className="rounded-4xl object-cover w-full max-w-xl h-120"
          />

          <div className="flex items-center space-x-5 max-w-xl">
            <p className="text-gray-600 font-semibold flex items-center gap-x-1.5 text-base">
            <Calendar1 size={16} className="fill-gray-500" />
            {details.numberOfDays} day plan
            </p>

             <div className="flex items-center gap-2 text-gray-600">
        <MapPinXInside className='fill-gray-500' size={15}/>
        <span className='font-semibold'>{details.location}</span>
      </div>

             <div className="flex items-center gap-2 text-gray-600">
        <Star className='fill-amber-500 text-amber-500' size={15}/>
        <span className='font-semibold'>{details.rating}/5</span>
      </div>
          </div>
          
        </div>

        {/* BOOKING FORM */}
        <div className="max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <h1 className="font-semibold text-gray-600 text-xl">
                Submit your booking
              </h1>

              {/* FULL NAME */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Username</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-2 bg-gray-200/25 rounded-3xl px-4 py-2">
                        <User2 size={17} className="text-gray-600" />
                        <Input
                          className="focus-visible:ring-0 border-0 shadow-none"
                          {...field}
                          placeholder="Daniel Jackson"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-2 bg-gray-200/25 rounded-3xl px-4 py-2">
                        <Mail size={17} className="text-gray-600" />
                        <Input
                          {...field}
                          className="focus-visible:ring-0 border-0 shadow-none"
                          placeholder="jackson101@gmail.com"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PHONE */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Phone</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-2 bg-gray-200/25 rounded-3xl px-4 py-2">
                        <Phone size={17} className="text-gray-600" />
                        <Input
                          {...field}
                          className="focus-visible:ring-0 border-0 shadow-none"
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid lg:grid-cols-2 gap-6">
                {/* DATE */}
                <FormField
                  control={form.control}
                  name="travelDate"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Travel Date</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button className="w-full justify-between bg-gray-200/25 rounded-3xl py-2 text-gray-700 hover:text-white h-12">
                            {date ? date.toDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-3xl">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => {
                              setDate(d);
                              form.setValue("travelDate", d?.toISOString() || "");
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {/* GUESTS */}
                <FormField
                  control={form.control}
                  name="numberOfGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Guests</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-x-2 bg-gray-200/25 rounded-3xl px-4 py-2">
                          <Users size={17} className="text-gray-600" />
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
              </div>

              <Button
              disabled={isSubmitting}
              className="w-full bg-emerald-600 h-12 rounded-full font-semibold">
                Submit Booking Request
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}