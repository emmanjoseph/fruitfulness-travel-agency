// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import reviewsData from "@/lib/reviews";

export const revalidate = 86400;

export async function GET() {
    return NextResponse.json(reviewsData);
}
