const API_URL = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8000';

export const fetchJourneys = async () => {
  try {    
    const res = await fetch(`${API_URL}/api/journeys`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch journeys: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching journeys:", error);
    return []; // Return empty array on error
  }
};

export const fetchJourneyById = async (id:string)=>{
    try {
        const res = await fetch(`${API_URL}/api/journeys/${id}`);
         if (!res.ok) {
      throw new Error(`Failed to fetch details: ${res.status}`);
      
    }
    const data = await res.json();
    return data;
  } catch (error) {
        console.error("Error fetching journey details:", error);
    }
}
export type TripsQuery = {
  page?: number;
  limit?: number;
  tags?: string;
  country?: string;
  search?: string;
  minRating?: number;
};

export async function getAllTrips(query: TripsQuery) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) params.append(k, String(v));
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/journeys?${params.toString()}`,
    { cache: "no-store" } // tourism data changes often
  );

  if (!res.ok) throw new Error("Failed to fetch journeys");

  return res.json();
}



export const requestBooking = async (payload: {
  fullName: string;
  email: string;
  phone: string;
  journeyId: string;
  travelDate: string;
  numberOfGuests: number;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to request booking: ${res.status}`
      );
    }

    const data = await res.json();
    return data; // return booking response
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
};

export const fetchJourneyByCountry = async (country:string) => {
  try {
    const res = await fetch(`${API_URL}/api/journeys/country/${country}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch journeys by ${country}: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching journeys:", error);
    return []; // Return empty array on error
  }
}

export const fetchJourneyByTags = async (tag:string) => {
  try {
    const res = await fetch(`${API_URL}/api/journeys/tag/${tag}`,
      { cache: "no-store" }
    );
     if (!res.ok) {
      throw new Error(`Failed to fetch journeys by ${tag}: ${res.status}`,
        
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching journeys:", error);
    return []; // Return empty array on error
  }
}