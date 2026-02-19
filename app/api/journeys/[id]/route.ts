// app/api/journeys/[id]/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; 

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const url = `${API_URL}/api/journeys/${id}`;
    // console.log('🔍 Fetching from:', url); // Debug log

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // console.log('📊 Response status:', res.status); // Debug log

    const data = await res.json();
    // console.log('📦 Response data:', data); // Debug log

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ Journey fetch error:", error);
    console.error("❌ Error details:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { message: "Failed to fetch journey", error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}