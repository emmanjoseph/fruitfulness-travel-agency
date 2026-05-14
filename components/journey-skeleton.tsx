// components/trips-grid-skeleton.tsx
export function TripCardSkeleton() {
    return (
        <div className="group bg-white rounded-[35px] overflow-hidden border border-stone-300 animate-pulse">
            {/* Image Skeleton */}
            <div className="relative h-64 md:h-70 bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-6 space-y-3">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded w-3/4" />

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
            </div>
        </div>
    );
}

export function TripsGridSkeleton() {
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-4 mt-8">
            {[...Array(6)].map((_, i) => (
                <TripCardSkeleton key={i} />
            ))}
        </div>
    );
}