"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { customizeTripSchema } from "@/lib/utils";
import { toast } from "sonner";
import { RequestCustomBooking } from "@/lib/api";
import {
    Baby, BedDouble, CalendarDays, CalendarIcon, Car, Check, DollarSign,
    Loader2, Mail, MapPin, PartyPopper, Phone, Send, Sparkles, User, Users,
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

export type CustomizeTripFormValues = z.infer<typeof customizeTripSchema>;

const STEPS = ["Contact", "Dates & Group", "Budget", "Activities"] as const;
type Step = typeof STEPS[number];

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
];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center">
            {STEPS.map((step, i) => {
                const isCompleted = current > i;
                const isCurrent = current === i;

                return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                                isCompleted
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : isCurrent
                                        ? "border-emerald-600 bg-white text-emerald-600"
                                        : "border-neutral-200 bg-white text-neutral-400"
                            }`}>
                                {isCompleted ? <Check size={16} /> : i + 1}
                            </div>
                            <span className={`text-[11px] font-semibold hidden sm:block transition-colors ${isCurrent ? "text-emerald-600" : "text-neutral-400"}`}>
                                {step}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`h-[2px] flex-1 mx-2 mb-4 rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-600" : "bg-neutral-200"}`} />
                        )}
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
        <div className="min-h-screen bg-white font-sans">
            <main className="grid min-h-screen lg:grid-cols-[0.42fr_0.58fr]">
                {/* Left panel */}
                <aside className="relative hidden overflow-hidden bg-[url('https://images.unsplash.com/photo-1613425653628-23fd58c3c2b1?q=80&w=1287&auto=format&fit=crop')] bg-cover bg-center lg:block">
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/35" />
                    <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                            <Sparkles size={14} />
                            Tailored safari
                        </div>
                        <div className="pb-10">
                            <h2 className="font-heading text-2xl font-extrabold leading-tight">Travel your style</h2>
                            <p className="mt-4 max-w-md text-base font-medium text-white/85">
                                Share your dates, budget, and travel preferences. We will shape the route around how you want to travel.
                            </p>
                            <div className="mt-8 space-y-3">
                                {["Contact details", "Dates & group size", "Budget & comfort", "Activities & requests"].map((label, i) => (
                                    <div key={label} className="flex items-center gap-3 text-sm">
                                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                                            step > i
                                                ? "border-emerald-400 bg-emerald-500 text-white"
                                                : step === i
                                                    ? "border-white bg-white/20 text-white"
                                                    : "border-white/30 text-white/50"
                                        }`}>
                                            {step > i ? <Check size={12} /> : i + 1}
                                        </span>
                                        <span className={step >= i ? "text-white" : "text-white/50"}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right panel */}
                <section className="overflow-y-auto px-4 py-8 md:px-8 lg:px-12">
                    <div className="mx-auto max-w-lg space-y-8 pb-20">
                        <div className="space-y-1">
                            <p className="text-sm font-bold font-heading tracking-widest uppercase text-emerald-600">
                                Plan your safari
                            </p>
                            <h2 className="font-heading text-xl font-extrabold text-neutral-900">
                                Build a custom itinerary
                            </h2>
                            <p className="text-sm font-medium leading-6 text-neutral-500">
                                Tell us the important details and our team will prepare a trip proposal.
                            </p>
                        </div>

                        {done ? (
                            <div className="flex flex-col items-center justify-center gap-6 rounded-[28px] border border-neutral-200 bg-white p-12 text-center shadow-sm">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                                    <PartyPopper className="text-emerald-600" size={36} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-heading text-2xl font-extrabold text-neutral-900">Request Submitted!</h2>
                                    <p className="max-w-sm text-sm font-medium text-neutral-500">
                                        Our team will review your details and reach out within 24 hours with a custom safari proposal.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => { setDone(false); setStep(0); form.reset(); }}
                                    variant="outline"
                                    className="rounded-full px-6"
                                >
                                    Submit another request
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 font-heading">
                                    <StepIndicator current={step} />

                                    {/* ── Step 0: Contact ── */}
                                    {step === 0 && (
                                        <div className="rounded-[28px] border border-neutral-200 bg-white card">
                                            <div className="px-6 py-5 border-b border-neutral-100">
                                                <h3 className="font-bold text-xl">Contact details</h3>
                                                <p className="text-sm text-neutral-500 mt-0.5">How we'll reach you</p>
                                            </div>
                                            <div className="grid gap-4 p-5 md:p-7">

                                                <div className="grid md:grid-cols-2 gap-2">
                                                    <FormField control={form.control} name="fullName" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={'pl-2 text-gray-600'}>Full name</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                    <Input {...field} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="Jane Doe" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={'pl-2 text-gray-600'}>Phone number</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                    <Input {...field} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="+254700000000" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>

                                                <FormField control={form.control} name="email" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Email address</FormLabel>

                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="email" className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="jane@example.com" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />



                                                <FormField control={form.control} name="destination" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Destination</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="Maasai Mara and Diani" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Step 1: Dates & Group ── */}
                                    {step === 1 && (
                                        <div className="rounded-[28px] border border-neutral-200 bg-white card">
                                            <div className="px-6 py-5 border-b border-neutral-100">
                                                <h3 className="font-bold text-xl">Travel dates and group size</h3>
                                                <p className="text-sm text-neutral-500 mt-0.5">When are you travelling and with who</p>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2 p-5 md:p-7">
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {/* Start Date */}
                                                    <FormField
                                                        control={form.control}
                                                        name="preferredStartDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="pl-2 text-gray-600">
                                                                    Start date
                                                                </FormLabel>

                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant="outline"
                                                                                className={cn(
                                                                                    "h-12 w-full rounded-2xl border-neutral-200 justify-start text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                <CalendarIcon className="mr-3 h-4 w-4 text-neutral-400" />

                                                                                {field.value ? (
                                                                                    format(new Date(field.value), "PPP")
                                                                                ) : (
                                                                                    <span>Select start date</span>
                                                                                )}
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>

                                                                    <PopoverContent
                                                                        className="w-auto rounded-2xl p-0"
                                                                        align="start"
                                                                    >
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={
                                                                                field.value
                                                                                    ? new Date(field.value)
                                                                                    : undefined
                                                                            }
                                                                            onSelect={(date) => {
                                                                                if (date) {
                                                                                    field.onChange(
                                                                                        format(date, "yyyy-MM-dd")
                                                                                    );
                                                                                }
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

                                                    {/* End Date */}
                                                    <FormField
                                                        control={form.control}
                                                        name="preferredEndDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="pl-2 text-gray-600">
                                                                    End date
                                                                </FormLabel>

                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant="outline"
                                                                                className={cn(
                                                                                    "h-12 w-full rounded-2xl border-neutral-200 justify-start text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                <CalendarIcon className="mr-3 h-4 w-4 text-neutral-400" />

                                                                                {field.value ? (
                                                                                    format(new Date(field.value), "PPP")
                                                                                ) : (
                                                                                    <span>Select end date</span>
                                                                                )}
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>

                                                                    <PopoverContent
                                                                        className="w-auto rounded-2xl p-0"
                                                                        align="start"
                                                                    >
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={
                                                                                field.value
                                                                                    ? new Date(field.value)
                                                                                    : undefined
                                                                            }
                                                                            onSelect={(date) => {
                                                                                if (date) {
                                                                                    field.onChange(
                                                                                        format(date, "yyyy-MM-dd")
                                                                                    );
                                                                                }
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
                                                    <FormItem className="md:col-span-2">
                                                        <FormControl>
                                                            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                                    className="size-4 rounded border-neutral-300 accent-emerald-600"
                                                                />
                                                                My travel dates are flexible
                                                            </label>
                                                        </FormControl>
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="numberOfDays" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Number of days</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="number" min={1} onChange={(e) => field.onChange(Number(e.target.value))} className="h-12 rounded-2xl border-neutral-200 pl-11" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="numberOfAdults" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Adults</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="number" min={1} onChange={(e) => field.onChange(Number(e.target.value))} className="h-12 rounded-2xl border-neutral-200 pl-11" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="numberOfChildren" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Children</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-12 rounded-2xl border-neutral-200 pl-11" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Step 2: Budget ── */}
                                    {step === 2 && (
                                        <div className="rounded-[28px] card">
                                            <div className="px-6 py-5 border-b border-neutral-100">
                                                <h3 className="font-bold text-xl">Budget and comfort</h3>
                                                <p className="text-sm text-neutral-500 mt-0.5">Your preferred tier and spending range</p>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2 p-5 md:p-7 font-heading">
                                                <FormField control={form.control} name="preferredPricingTier" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Pricing tier</FormLabel>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full py-6 rounded-2xl border-neutral-200 bg-white">
                                                                    <SelectValue placeholder="Select tier" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="rounded-3xl p-1">
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
                                                        <FormLabel className={'pl-2 text-gray-600'}>Currency</FormLabel>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full py-6 rounded-2xl border-neutral-200 bg-white">
                                                                    <SelectValue placeholder="Select currency" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="rounded-3xl p-1">
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
                                                        <FormLabel className={'pl-2 text-gray-600'}>Minimum budget</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="150000" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="budgetMax" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Maximum budget</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} type="number" min={0} onChange={(e) => field.onChange(Number(e.target.value))} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="250000" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="accommodationPreference" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Accommodation</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="Boutique lodges" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="transportationPreference" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={'pl-2 text-gray-600'}>Transportation</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                                                <Input {...field} className="h-12 rounded-2xl border-neutral-200 pl-11" placeholder="Land Cruiser" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Step 3: Activities ── */}
                                    {step === 3 && (
                                        <div className="rounded-[28px] bg-white card">
                                            <div className="px-7 py-6 border-b border-neutral-100">
                                                <h3 className="font-bold text-xl">Activities and requests</h3>
                                                <p className="text-sm text-neutral-500 mt-0.5">What you want to experience</p>
                                            </div>
                                            <div className="space-y-5 p-5 md:p-7">
                                                <FormField control={form.control} name="activities" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Activities</FormLabel>
                                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-1">
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
                                                                        className={`min-h-9 rounded-2xl border px-2 text-left text-sm font-semibold transition ${
                                                                            selected
                                                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                                                : "border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-emerald-50/60"
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

                                                <FormField control={form.control} name="specialRequests" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Special requests</FormLabel>
                                                        <FormControl>
                                                            <textarea
                                                                {...field}
                                                                className="min-h-32 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                                placeholder="Vegetarian meals, wheelchair access..."
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep((s) => Math.max(0, s - 1))}
                                            disabled={step === 0}
                                            className="h-11 rounded-full px-6 font-semibold"
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            type="button"
                                            onClick={handleContinue}
                                            disabled={isSubmitting}
                                            className="h-11 rounded-full bg-neutral-800 px-7 font-bold text-white hover:bg-neutral-700 disabled:opacity-60"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="animate-spin mr-2" size={16} />Sending...</>
                                            ) : isLast ? (
                                                <><Send size={16} className="mr-2" />Submit your custom request</>
                                            ) : (
                                                <>Continue</>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}