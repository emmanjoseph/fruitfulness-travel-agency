"use client";

import { fetchJourneyById, requestBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Baby, Calendar1, Car, Check,
    ChevronLeft, Flag, House, Mail, MapPin, MessageSquare, Phone, Sparkles, Star, Tag, User2, Users, X
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {IconMoneybag, IconPhone} from "@tabler/icons-react";
import JourneyLoading from "@/components/journey-loading";



type Props = {
    tripId: string;
};

type price ={
    tier: string;
    currency: string;
    citizenPrice: string;
    nonResidentialPrice: string;
    accommodation: string;
    inclusions:[];
    exclusions:[];

}

const formSchema = z.object({
    fullName: z.string().min(3,"Please enter a full name"),
    email: z.string().email().min(3,"Please enter a valid email address"),
    phone: z.string().min(7,'Please enter a phone number'),
    journeyId: z.string(),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a travel date"),
    numberOfAdults: z.number().int().min(1),
    numberOfChildren: z.number().int().min(0),
    pricingTier: z.string().min(1, "Select a pricing tier"),
    nationality: z.string().min(2,'Please enter a nationality'),
    specialRequests: z.string().optional(),
});

const formatDateForPayload = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const formatPricingTier = (tier: string) =>
    tier
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

export default function PlanTripClient({ tripId }: Props) {
    const [journeyDetails, setJourneyDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const router = useRouter();

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
            journeyId: tripId,
            travelDate: "",
            numberOfAdults: 1,
            numberOfChildren: 0,
            pricingTier: "",
            nationality: "",
            specialRequests: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...values,
                specialRequests: values.specialRequests?.trim() || undefined,
            };

            await toast.promise(
                requestBooking(payload),
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
    const pricingOptions = details?.pricing ?? [];
    const selectedPricingTier = form.watch("pricingTier");
    const selectedPricingTierExists = pricingOptions.some(
        (price: any) => price.tier === selectedPricingTier
    );
    const activePricingTier = selectedPricingTierExists
        ? selectedPricingTier
        : pricingOptions[0]?.tier;
    console.log(details)

    useEffect(() => {
        const firstPricingTier = pricingOptions[0]?.tier;

        if (!firstPricingTier) {
            return;
        }

        const currentPricingTier = form.getValues("pricingTier");
        const currentTierExists = pricingOptions.some(
            (price: any) => price.tier === currentPricingTier
        );

        if (!currentTierExists) {
            form.setValue("pricingTier", firstPricingTier, { shouldValidate: true });
        }
    }, [form, pricingOptions]);

    if (loading || !details) return <JourneyLoading/>

    return (
        <section className="min-h-screen font-sans">
            <div className="py-4 px-4 md:px-0 border-b">
                <div className="max-w-[1340px] mx-auto flex items-center justify-between ">
                    <h1 className={'text-base font-heading font-bold text-emerald-600 flex items-center space-x-2'}>
                        <Sparkles className="text-emerald-600" size={17} /> {"  "}
                        <span> Plan for {details.name}</span>
                    </h1>

                    <button className={'flex items-center justify-center font-heading font-bold text-base text-red-600 hover:text-red-700 duration-100 transition'} onClick={()=> router.back()}>
                        <ChevronLeft size={15}/> <p>Go back</p>
                    </button>

                </div>
            </div>

            {/* Main Content */}
            <div className=" px-4 relative">

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-6 py-4">
                        <div className="mx-auto max-w-lg space-y-4">

                            <div className="font-heading">
                                {pricingOptions.length > 0 && (
                                    <div className="lg:sticky lg:top-20">
                                        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-4xl p-6 text-white shadow-lg mb-4">
                                            <div className="flex items-center gap-2">
                                                <IconMoneybag size={17} />
                                                <h2 className="text-base font-bold">Pricing Options</h2>
                                            </div>
                                            <p className="text-emerald-50 text-sm font-semibold">
                                                Choose the perfect tier for your adventure
                                            </p>
                                        </div>

                                        <Tabs
                                            value={activePricingTier}
                                            onValueChange={(tier) =>
                                                form.setValue("pricingTier", tier, { shouldValidate: true })
                                            }
                                        >
                                            {/* Tab triggers */}
                                            <TabsList variant={'line'} className="w-full rounded-[40px] h-12 mb-4">
                                                {pricingOptions.map((price: any) => (
                                                    <TabsTrigger
                                                        key={price.tier}
                                                        value={price.tier}
                                                        className="flex-1 rounded-xl text-sm font-semibold"
                                                    >
                                                        {formatPricingTier(price.tier)}
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>

                                            {/* Tab content */}
                                            {pricingOptions.map((price: any) => (
                                                <TabsContent key={price.tier} value={price.tier}>
                                                    <Card className=" rounded-[40px] bg-white shadow-none border">
                                                        <CardHeader className="flex items-center ">
                                                            <h3 className="font-bold text-lg text-gray-800">
                                                                {formatPricingTier(price.tier)}
                                                            </h3>
                                                        </CardHeader>

                                                        <CardContent className="mt-2 text-sm text-gray-700 space-y-2">
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <p className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                                                                    <strong>Citizen:</strong><br/>
                                                                    <span className="text-lg font-bold text-gray-800">
                      {price.currency} {price.citizenPrice?.toLocaleString()}
                    </span>
                                                                </p>
                                                                <p className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                                                                    <strong>Non-Resident:</strong><br/>
                                                                    <span className="text-lg font-bold text-gray-800">
                      {price.currency} {price.nonResidentPrice?.toLocaleString()}
                    </span>
                                                                </p>
                                                            </div>

                                                            <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                                <h3 className="text-gray-700 font-semibold flex items-center gap-x-1">
                                                                    <House size={16} /> Accommodation
                                                                </h3>
                                                                <p className="mt-1 text-gray-600">{price.accommodation}</p>
                                                            </div>

                                                            {price.transportation && (
                                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                                    <h3 className="text-gray-700 font-semibold flex items-center gap-x-1">
                                                                        <Car size={16} /> Transportation
                                                                    </h3>
                                                                    <p className="mt-1 text-gray-600">
                                                                        {price.transportation.type} — {price.transportation.description}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {price.inclusions?.length > 0 ? (
                                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                                    <h3 className="text-emerald-700 font-semibold flex items-center gap-x-1">
                                                                        <Check size={16} /> Inclusions
                                                                    </h3>

                                                                    <ul className="mt-2 space-y-1.5">
                                                                        {price.inclusions.map((item: string, idx: number) => (
                                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                                                <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                                                                {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                                                                    <h3 className="text-emerald-700 font-semibold flex items-center gap-x-1">
                                                                        <Check size={16} /> Inclusions
                                                                    </h3>
                                                                    <p className="mt-1 text-sm text-emerald-700">
                                                                        Inclusion details are not available yet.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {price.exclusions?.length > 0 ? (
                                                                <div className="bg-gray-200/20 p-4 rounded-2xl">
                                                                    <h3 className="font-semibold text-red-500 flex items-center gap-x-1">
                                                                        <X size={16} /> Exclusions
                                                                    </h3>

                                                                    <ul className="mt-2 space-y-1.5">
                                                                        {price.exclusions.map((item: string, idx: number) => (
                                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                                                <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                                                                {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                                                                    <h3 className="font-semibold text-red-500 flex items-center gap-x-1">
                                                                        <X size={16} /> Exclusions
                                                                    </h3>
                                                                    <p className="mt-1 text-sm text-red-500">
                                                                        Exclusion details are not available yet.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    {/* Left Column - Booking Form */}
                    <div className="lg:col-span-6 lg:shadow-sm bg-neutral-200/10 font-heading">
                        <div className="overflow-hidden mx-auto max-w-lg space-y-6 py-4">
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-white rounded-4xl">
                                <h2 className="text-base font-heading font-extrabold mb-1 flex items-center gap-2">
                                    <Sparkles size={17} />
                                    Book Your Adventure
                                </h2>
                                <p className="text-gray-300 text-sm font-bold">
                                    Fill in your details and we'll get back to you within 24 hours
                                </p>
                            </div>

                            <div className="">
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
                                                        <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                            <User2 className="text-gray-400" size={17} />
                                                            <Input
                                                                {...field}
                                                                className="focus-visible:ring-0 border-none shadow-none h-13"
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
                                                        <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                            <Mail className="text-gray-400" size={17} />
                                                            <Input
                                                                {...field}
                                                                className="focus-visible:ring-0 border-none shadow-none h-13"
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
                                                        <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                            <IconPhone className="text-gray-400" size={17} />
                                                            <Input
                                                                {...field}
                                                                className="focus-visible:ring-0 border-none shadow-none h-13"
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
                                                                        form.setValue("travelDate", d ? formatDateForPayload(d) : "");
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

                                            {/* Pricing Tier */}
                                            <FormField
                                                control={form.control}
                                                name="pricingTier"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold">Pricing Tier</FormLabel>
                                                        <div className="relative">
                                                            <Tag className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400" size={20} />
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                disabled={pricingOptions.length === 0}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="w-full pl-12 h-12 rounded-2xl border-gray-200 bg-white text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/20">
                                                                        <SelectValue placeholder="Select a tier" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="rounded-xl">
                                                                    <SelectGroup>
                                                                        {pricingOptions.length > 0 ? (
                                                                            pricingOptions.map((price: any) => (
                                                                                <SelectItem key={price.tier} value={price.tier}>
                                                                                    {formatPricingTier(price.tier)}
                                                                                </SelectItem>
                                                                            ))
                                                                        ) : (
                                                                            <SelectItem value="unavailable" disabled>
                                                                                No pricing tiers available
                                                                            </SelectItem>
                                                                        )}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Number of Adults */}
                                            <FormField
                                                control={form.control}
                                                name="numberOfAdults"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold">Adults</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                                <Users className="text-gray-400" size={17} />
                                                                <Input
                                                                    type="number"
                                                                    min={1}
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                                    className="focus-visible:ring-0 border-none shadow-none h-13"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Number of Children */}
                                            <FormField
                                                control={form.control}
                                                name="numberOfChildren"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold">Children</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                                <Baby className="text-gray-400" size={17} />
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                                    className="focus-visible:ring-0 border-none shadow-none h-13"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Nationality */}
                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-600 font-semibold">Nationality</FormLabel>
                                                    <FormControl>
                                                        <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-full bg-white">
                                                            <Flag className=" text-gray-400" size={17} />
                                                            <Input
                                                                {...field}
                                                                className="focus-visible:ring-0 border-none shadow-none h-13"
                                                                placeholder="Kenyan"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Special Requests */}
                                        <FormField
                                            control={form.control}
                                            name="specialRequests"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-600 font-semibold">Special Requests</FormLabel>
                                                    <FormControl>
                                                        <div className="flex items-center gap-x-2 border border-gray-200 px-4 rounded-3xl bg-white">
                                                            <MessageSquare className="text-gray-400" size={17} />
                                                            <textarea
                                                                {...field}
                                                                className="min-h-28 w-full focus-visible:ring-0 border-none shadow-none p-2 resize-none"
                                                                placeholder="Vegetarian meals and airport pickup"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || pricingOptions.length === 0}
                                            className="w-full h-13 rounded-4xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
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





                </div>
            </div>
        </section>
    );
}
