// components/trips-list.tsx
import { getAllTrips } from "@/lib/api";
import TripsGrid from "./trips-grid";

type TripsListProps = {
    page: number;
    tags?: string;
    country?: string;
    search?: string;
    category?: string;
    month?: string;
};

export async function TripsList({
                                    page,
                                    tags,
                                    country,
                                    search,
                                    category,
                                    month,
                                }: TripsListProps) {
    const trips = await getAllTrips({
        page,
        limit: 9,
        tags: category || tags,
        country,
        search,
    });

    if (!trips?.data || trips.data.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No trips found matching your criteria.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl text-gray-600 font-heading text-center font-bold py-2">Explore handpicked trips</h1>
                <p className="text-gray-600 font-semibold">
          <span className="text-emerald-600 font-bold">
            {trips.meta.total || 0}
          </span>{" "}
                    experiences available
                </p>
            </div>

            <TripsGrid trips={trips.data} />
        </div>
    );
}