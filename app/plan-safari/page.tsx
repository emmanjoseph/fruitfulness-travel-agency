"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { customizeTripSchema } from "@/lib/utils";
import { toast } from "sonner";
import { RequestCustomBooking } from "@/lib/api";
import {
    Baby, BedDouble, CalendarDays, CalendarIcon, Car, Check, Clock, DollarSign,
    Headphones, Loader2, Mail, MapPin, PartyPopper, Phone, Rocket, Send, Sparkles, User, Users, Shield, ChevronRight, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import SemiFooter from "@/components/SemiFooter";

export type CustomizeTripFormValues = z.infer<typeof customizeTripSchema>;

const STEPS = [
    { id: 0, title: "Contact", subtitle: "Contact details" },
    { id: 1, title: "Dates & Group", subtitle: "Travel dates and group size" },
    { id: 2, title: "Budget", subtitle: "Budget and comfort" },
    { id: 3, title: "Activities", subtitle: "Activities and preferences" },
] as const;

const stepFields: Record<number, (keyof CustomizeTripFormValues)[]> = {
    0: ["fullName", "email", "phone", "destination"],
    1: ["preferredStartDate", "preferredEndDate", "numberOfDays", "numberOfAdults", "numberOfChildren"],
    2: ["preferredPricingTier", "currency", "budgetMin", "budgetMax", "accommodationPreference", "transportationPreference"],
    3: ["activities", "specialRequests"],
};

const pricingTiers = [
    { value: "BUDGET", label: "Budget" },
    { value: "MIDRANGE", label: "Midrange" },
    { value: "LUXURY", label: "Luxury" },
];
const currencies = ["KES", "USD", "EUR", "GBP"];
const activityOptions = [
    "Safari", "Beach", "Cultural tour", "Hiking",
    "Photography", "Honeymoon", "Family trip", "Hot air balloon",
    "Bird watching", "Diving", "Mountain trekking", "Cycling",
    "Game drives",
    "Boat cruise",
    "Camping",
    "Wildlife conservation"
];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center justify-between mb-12">
            {STEPS.map((stepData, i) => {
                const isCompleted = current > i;
                const isCurrent = current === i;

                return (
                    <div key={stepData.id} className="flex items-center flex-1">
                        <div className="flex items-center gap-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold transition-all ${
                                isCurrent
                                    ? "bg-emerald-400 text-white shadow-lg"
                                    : isCompleted
                                        ? "bg-gray-200 text-gray-600"
                                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                            }`}>
                                {i + 1}
                            </div>
                            <div className="hidden md:block">
                                <p className={`text-xs font-semibold uppercase tracking-wide ${isCurrent ? "text-emerald-500" : "text-gray-400"}`}>
                                    STEP {i + 1}
                                </p>
                                <p className={`text-sm font-bold ${isCurrent ? "text-gray-900" : "text-gray-500"}`}>
                                    {stepData.title}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);

    const form = useForm<CustomizeTripFormValues>({
        resolver: zodResolver(customizeTripSchema),
        defaultValues: {
            fullName: "", email: "", phone: "", destination: "",
            preferredStartDate: "", preferredEndDate: "",
            isDateFlexible: false, numberOfDays: 1,
            numberOfAdults: 1, numberOfChildren: 0,
            preferredPricingTier: "MIDRANGE",
            budgetMin: 0, budgetMax: 0, currency: "KES",
            accommodationPreference: "", transportationPreference: "",
            activities: [], specialRequests: "",
        },
        mode: "onTouched",
    });

    const isSubmitting = form.formState.isSubmitting;
    const isLast = step === STEPS.length - 1;

    const handleContinue = async () => {
        const fields = stepFields[step];
        const valid = await form.trigger(fields);
        if (!valid) return;

        if (isLast) {
            await form.handleSubmit(onSubmit)();
            return;
        }

        setStep((s) => s + 1);
    };

    const onSubmit = async (values: CustomizeTripFormValues) => {
        console.log("Submitted:", values);
        try {
            await toast.promise(
                RequestCustomBooking({
                    ...values,
                    specialRequests: values.specialRequests?.trim() || undefined,
                }),
                {
                    loading: "Submitting your request...",
                    success: "Request submitted! We'll be in touch within 24 hours.",
                    error: (err) => err?.message || "Failed to submit request",
                }
            );
            setDone(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen font-heading">
            {/* Hero Section */}
            <div className="relative bg-[url('https://images.unsplash.com/photo-1497271679421-ce9c3d6a31da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-transparent" />

                <div className="relative z-10 container mx-auto text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <Rocket size={16} />
                        CRAFT YOUR JOURNEY
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Design Your Custom Itinerary
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
                        Share your dates, budget, and travel preferences — our experts will craft a tailor-made journey shaped around exactly how you want to travel.
                    </p>
                </div>
            </div>

            {/* Main Form Section */}
            <main className="container mx-auto px-4 pb-20">
                <div className="max-w-6xl mx-auto">
                    {done ? (
                        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-6">
                                <PartyPopper className="text-emerald-600" size={48} />
                            </div>
                            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                Our team will review your details and reach out within 24 hours with a custom safari proposal.
                            </p>
                            <Button
                                type="button"
                                onClick={() => { setDone(false); setStep(0); form.reset(); }}
                                variant="outline"
                                className="rounded-full px-8 h-12"
                            >
                                Submit another request
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-2xs border border-gray-100 overflow-hidden">
                            {/* Progress Indicator */}
                            <div className="px-8 md:px-12 pt-10">
                                <StepIndicator current={step} />
                            </div>

                            {/* Form Content */}
                            <div className="px-8 md:px-12 pb-10">
                                <Form {...form}>
                                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                                        {/* Step 0: Contact */}
                                        {step === 0 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <User className="text-gray-900" size={28} />
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                                                        <p className="text-gray-500 text-sm">How we'll reach you with your personalized proposal.</p>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <FormField control={form.control} name="fullName" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Full name</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="Jane Doe" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Phone number</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="+1 (555) 000-0000" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>

                                                <FormField control={form.control} name="email" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-700 font-semibold">Email address</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                <Input {...field} type="email" className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="jane@example.com" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="destination" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-700 font-semibold">Preferred destination</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                <Input {...field} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="e.g. Santorini & Greek Islands" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="specialRequests" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-700 font-semibold">Tell us about your dream trip <span className="text-gray-400 font-normal">(optional)</span></FormLabel>
                                                        <FormControl>
                                                            <textarea
                                                                {...field}
                                                                rows={4}
                                                                className="w-full rounded-xl border-gray-300 px-4 py-3 text-base outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                                                placeholder="Share any special interests, occasions, or must-haves..."
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                                                    <Shield className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">Your details are safe with us</p>
                                                        <p className="text-gray-600 text-xs mt-1">
                                                            We use your information only to prepare your custom itinerary and never share it with third parties.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 1: Dates & Group */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <CalendarDays className="text-gray-900" size={28} />
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900">Dates & Group Size</h2>
                                                        <p className="text-gray-500 text-sm">When you're traveling and who's coming along.</p>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <FormField
                                                        control={form.control}
                                                        name="preferredStartDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-gray-700 font-semibold">Start date</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant="outline"
                                                                                className={cn(
                                                                                    "h-14 w-full rounded-xl border-gray-300 justify-start text-left font-normal text-base hover:border-emerald-500",
                                                                                    !field.value && "text-gray-400"
                                                                                )}
                                                                            >
                                                                                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                                                {field.value ? format(new Date(field.value), "PPP") : <span>Select start date</span>}
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto rounded-2xl p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value ? new Date(field.value) : undefined}
                                                                            onSelect={(date) => {
                                                                                if (date) field.onChange(format(date, "yyyy-MM-dd"));
                                                                            }}
                                                                            initialFocus
                                                                            captionLayout="dropdown"
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="preferredEndDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-gray-700 font-semibold">End date</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant="outline"
                                                                                className={cn(
                                                                                    "h-14 w-full rounded-xl border-gray-300 justify-start text-left font-normal text-base hover:border-emerald-500",
                                                                                    !field.value && "text-gray-400"
                                                                                )}
                                                                            >
                                                                                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                                                {field.value ? format(new Date(field.value), "PPP") : <span>Select end date</span>}
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto rounded-2xl p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value ? new Date(field.value) : undefined}
                                                                            onSelect={(date) => {
                                                                                if (date) field.onChange(format(date, "yyyy-MM-dd"));
                                                                            }}
                                                                            initialFocus
                                                                            captionLayout="dropdown"
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField control={form.control} name="isDateFlexible" render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 hover:border-emerald-300 transition-colors">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                                    className="size-5 rounded border-gray-300 accent-emerald-500"
                                                                />
                                                                My travel dates are flexible
                                                            </label>
                                                        </FormControl>
                                                    </FormItem>
                                                )} />

                                                <div className="grid md:grid-cols-3 gap-5">
                                                    <FormField control={form.control} name="numberOfDays" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Number of days</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} type="number" min={1} onChange={(e) => field.onChange(Number(e.target.value))} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="numberOfAdults" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Adults</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} type="number" min={1} onChange={(e) => field.onChange(Number(e.target.value))} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="numberOfChildren" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Children</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Budget */}
                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <DollarSign className="text-gray-900" size={28} />
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900">Budget & Comfort</h2>
                                                        <p className="text-gray-500 text-sm">Your preferred tier and spending range.</p>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <FormField control={form.control} name="preferredPricingTier" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Pricing tier</FormLabel>
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-14 rounded-xl border-gray-300 text-base">
                                                                        <SelectValue placeholder="Select tier" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="rounded-xl">
                                                                    {pricingTiers.map((t) => (
                                                                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="currency" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Currency</FormLabel>
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-14 rounded-xl border-gray-300 text-base">
                                                                        <SelectValue placeholder="Select currency" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="rounded-xl">
                                                                    {currencies.map((c) => (
                                                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="budgetMin" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Minimum budget</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="150000" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="budgetMax" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Maximum budget</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="250000" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="accommodationPreference" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Accommodation preference</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="Boutique lodges" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="transportationPreference" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-semibold">Transportation preference</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                                    <Input {...field} className="h-14 rounded-xl border-gray-300 pl-12 text-base focus:border-emerald-500 focus:ring-emerald-500" placeholder="Land Cruiser" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Activities */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Sparkles className="text-gray-900" size={28} />
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900">Activities & Preferences</h2>
                                                        <p className="text-gray-500 text-sm">What experiences you're looking for.</p>
                                                    </div>
                                                </div>

                                                <FormField control={form.control} name="activities" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-700 font-semibold mb-3 block">Select activities</FormLabel>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                            {activityOptions.map((activity) => {
                                                                const selected = field.value.includes(activity);
                                                                return (
                                                                    <button
                                                                        key={activity}
                                                                        type="button"
                                                                        onClick={() =>
                                                                            field.onChange(
                                                                                selected
                                                                                    ? field.value.filter((i) => i !== activity)
                                                                                    : [...field.value, activity]
                                                                            )
                                                                        }
                                                                        className={`h-12 rounded-xl border-2 px-4 text-sm font-semibold transition-all ${
                                                                            selected
                                                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                                                : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/30"
                                                                        }`}
                                                                    >
                                                                        {activity}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        )}

                                        {/* Navigation */}
                                        <div className="flex items-center justify-between pt-6 border-t">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setStep((s) => Math.max(0, s - 1))}
                                                disabled={step === 0}
                                                className="h-12 rounded-xl px-6 font-semibold text-gray-600 hover:bg-gray-100"
                                            >
                                                <ArrowLeft size={18} className="mr-2" />
                                                Back
                                            </Button>

                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-500 font-medium">
                                                    Step {step + 1} of {STEPS.length}
                                                </span>

                                                <Button
                                                    type="button"
                                                    onClick={handleContinue}
                                                    disabled={isSubmitting}
                                                    className="h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                                                >
                                                    {isSubmitting ? (
                                                        <><Loader2 className="animate-spin mr-2" size={18} />Sending...</>
                                                    ) : isLast ? (
                                                        <><Send size={18} className="mr-2" />Submit Request</>
                                                    ) : (
                                                        <>Continue <ChevronRight size={18} className="ml-1" /></>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>

                            {/* Footer Trust Badges */}
                            <div className="bg-gray-50 border-t px-8 md:px-12 py-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Rocket className="text-emerald-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">100% Tailored</h3>
                                            <p className="text-sm text-gray-600">Every itinerary built around your style.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Clock className="text-emerald-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">24-hour response</h3>
                                            <p className="text-sm text-gray-600">Proposal delivered within one business day.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Headphones className="text-emerald-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Expert guidance</h3>
                                            <p className="text-sm text-gray-600">Speak with a real travel designer anytime.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <SemiFooter/>
        </div>
    );
}