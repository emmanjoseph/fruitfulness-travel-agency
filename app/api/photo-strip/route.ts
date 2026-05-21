import { NextResponse } from "next/server";
import { getPhotoStripFallback, normalizePhotoStripSlides } from "@/lib/photo-strip";

const PEXELS_API_KEY =
  process.env.PEXELS_API_KEY ||
  process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "East Africa";
  const fallbackSlides = getPhotoStripFallback({ location });

  if (!PEXELS_API_KEY) {
    return NextResponse.json({
      data: fallbackSlides,
      slides: fallbackSlides,
      source: "fallback",
    });
  }

  try {
    const query = encodeURIComponent(`${location} safari`);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=9&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!res.ok) {
      return NextResponse.json({
        data: fallbackSlides,
        slides: fallbackSlides,
        source: "fallback",
        upstreamStatus: res.status,
      });
    }

    const data = await res.json();
    const slides = normalizePhotoStripSlides(data?.photos, location);
    const resolvedSlides = slides.length > 0 ? slides : fallbackSlides;

    return NextResponse.json({
      data: resolvedSlides,
      slides: resolvedSlides,
      source: slides.length > 0 ? "pexels" : "fallback",
    });
  } catch (error) {
    console.error("Photo strip fetch error:", error);

    return NextResponse.json({
      data: fallbackSlides,
      slides: fallbackSlides,
      source: "fallback",
    });
  }
}
