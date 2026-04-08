"use client";

import { fetchJourneyById, requestBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Calendar1, Car, Check, ChevronDownIcon, Clock, DollarSign, House, Mail, MapPin, Phone, Star, User2, Users, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import SemiFooter from "@/components/SemiFooter";

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
    const router = useRouter();
    const [journeyDetails, setJourneyDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();

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
                    success: "Booking request submitted! We'll be in touch shortly.",
                    error: (err) => err?.message || "Failed to submit booking request",
                }
            );
            router.push("/plan-trip/success");
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const details = journeyDetails?.data ?? journeyDetails;

    if (loading || !details) {
        return (
            <section className="w-full min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600">Loading trip details...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 font-sans">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                    src={details.imgUrl}
                    alt={details.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/80 to-black/30" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full max-w-300 mx-auto px-4 pb-12 md:pb-26">
                        <div className="max-w-4xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-white text-sm font-medium">Featured Experience</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {details.name}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <MapPin size={18} className="text-emerald-400" />
                                    <span className="font-medium">{details.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <Calendar1 size={18} className="text-emerald-400" />
                                    <span className="font-medium">{details.numberOfDays} Days</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <Star size={18} className="fill-amber-400 text-amber-400" />
                                    <span className="font-medium">{details.rating}/5 Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-300 mx-auto px-4 -mt-20 relative z-10 pb-16">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column - Booking Form */}
                    <div className="lg:col-span-6">
                        <div className="bg-white rounded-4xl shadow-xl overflow-hidden sticky top-8">
                            <div className="bg-emerald-900 p-6">
                                <h2 className="text-xl font-bold text-white mb-2">
                                    Book Your Adventure
                                </h2>
                                <p className="text-white/90 text-sm font-medium">
                                    Fill in your details to reserve your spot
                                </p>
                            </div>

                            <div className="p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                        {/* Full Name */}
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-600 font-semibold">Full Name</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <User2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                            <Input
                                                                {...field}
                                                                className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                                                placeholder="Daniel Jackson"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-600 font-semibold">Email Address</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                            <Input
                                                                {...field}
                                                                className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                                                placeholder="jackson@email.com"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Phone */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-600 font-semibold">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                            <Input
                                                                {...field}
                                                                className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                                                placeholder={"07XX XXX XXX"}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Travel Date */}
                                            <FormField
                                                control={form.control}
                                                name="travelDate"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold">Travel Date</FormLabel>
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full h-12 justify-start rounded-2xl border-gray-200 hover:border-emerald-500"
                                                                >
                                                                    <Calendar1 className="mr-2" size={18} />
                                                                    {date ? date.toLocaleDateString() : "Select"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0 rounded-2xl">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={date}
                                                                    onSelect={(d) => {
                                                                        setDate(d);
                                                                        form.setValue("travelDate", d?.toISOString() || "");
                                                                        setOpen(false);
                                                                    }}
                                                                    disabled={(date) => date < new Date()}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Number of Guests */}
                                            <FormField
                                                control={form.control}
                                                name="numberOfGuests"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold">Guests</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                                <Input
                                                                    type="number"
                                                                    min={1}
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                                    className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-13 rounded-4xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                "Submit Booking Request"
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-gray-500">
                                            By submitting, you agree to our terms and conditions
                                        </p>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Pricing Tiers */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="bg-white rounded-4xl p-2 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 px-4 py-3">
                                Pricing Options
                            </h2>

                            {details.pricing?.length > 0 ? (
                                <div className="space-y-6">
                                    {details.pricing.map((price: any, index: number) => (
                                        <div
                                            key={index}
                                            className="card"
                                        >
                                            <div className="card-title-area">
                                                <h1 className="font-bold">{price.tier}</h1>
                                                <p className={'card-tag'}>
                                                    {price.currency}
                                                </p>
                                            </div>

                                            {/* Pricing */}
                                            <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                                        <p className="text-xs text-gray-500 mb-1">Citizen Price</p>
                                                        <p className="text-2xl font-bold text-gray-900">{price.citizenPrice}</p>
                                                    </div>
                                                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                                        <p className="text-xs text-gray-500 mb-1">Non-Resident Price</p>
                                                        <p className="text-2xl font-bold text-gray-900">{price.nonResidentPrice}</p>
                                                    </div>
                                                </div>

                                                {/* Accommodation */}
                                                <div className="bg-white rounded-3xl p-4 mb-4 border border-gray-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <House className="text-emerald-900" size={20} />
                                                        <h3 className="font-semibold text-gray-900">Accommodation</h3>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{price.accommodation}</p>
                                                </div>

                                                {/* Transportation */}
                                                {price.transportation && (
                                                    <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Car className="text-emerald-900" size={20} />
                                                            <h3 className="font-semibold text-gray-900">Transportation</h3>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">
                                                            {price.transportation.type} – {price.transportation.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Inclusions */}
                                                {price.inclusions && price.inclusions.length > 0 && (
                                                    <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-100">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Check className="text-emerald-600" size={20} />
                                                            <h3 className="font-semibold text-emerald-900">What's Included</h3>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {price.inclusions.map((item: string, idx: number) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                                                                    <Check className="mt-0.5 flex-shrink-0 text-emerald-600" size={16} />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Exclusions */}
                                                {price.exclusions && price.exclusions.length > 0 && (
                                                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <X className="text-red-600" size={20} />
                                                            <h3 className="font-semibold text-red-900">Not Included</h3>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {price.exclusions.map((item: string, idx: number) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                                                                    <X className="mt-0.5 flex-shrink-0 text-red-600" size={16} />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <DollarSign className="mx-auto text-gray-300 mb-4" size={48} />
                                    <p className="text-gray-500">Pricing information coming soon</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SemiFooter/>
        </section>
    );
}