import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8000';


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const res = await fetch(`${API_URL}/api/journeys/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("Journey fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch journey" },
      { status: 500 }
    );
  }
}