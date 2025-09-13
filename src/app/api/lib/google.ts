const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  // throw new Error("GOOGLE_MAPS_API_KEY must be set in env");
}

export type PlaceResult = {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  place_id?: string;
  embed_url?: string;
  directions_url?: string;
};

export async function searchPlacesText(
  query: string,
  limit = 5
): Promise<{ query_used: string; places: PlaceResult[] }> {
  if (!GOOGLE_API_KEY) throw new Error("GOOGLE_MAPS_API_KEY missing");

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/textsearch/json"
  );
  url.searchParams.set("query", query);
  url.searchParams.set("key", GOOGLE_API_KEY);

  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Google Places error: ${t}`);
  }

  const data = await res.json();
  const places = (data.results || []).slice(0, limit).map((r: any) => {
    const loc = r.geometry?.location ?? {};
    const lat = loc.lat;
    const lng = loc.lng;
    const place_id = r.place_id;
    const name = r.name;
    const address = r.formatted_address;

    // Embed uses server key (kept server-side here)
    const embed_url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${encodeURIComponent(
      place_id
    )}`;

    const directions_url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    return {
      name,
      address,
      lat,
      lng,
      place_id,
      embed_url,
      directions_url,
    } as PlaceResult;
  });

  return { query_used: query, places };
}
