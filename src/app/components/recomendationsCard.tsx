import React from "react";
import { MapPin, ExternalLink, Map } from "lucide-react";

// Define the type for the place data.
interface PlaceResult {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  place_id?: string;
  embed_url?: string;
  directions_url?: string;
}

// Reusable component for displaying a single recommendation card.
export const RecomendationsCard: React.FC<{ place: PlaceResult }> = ({
  place,
}) => {
  const { name, address, directions_url, embed_url, lat, lng } = place;

  return (
    <div className="bg-slate-800 min-w-[300px] p-4 rounded-2xl my-2">
      <div className="flex items-start justify-between">
        <h2 className="font-semibold text-[#FCA311] mb-2">{name}</h2>
      </div>
      <p className="text-gray-100 text-sm mb-4 flex items-center">
        <MapPin className="inline-block mr-2" size={16} />
        {address}
      </p>

      {/* Interactive buttons */}
      <div className="flex justify-between items-center mb-4">
        <a
          href={directions_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center space-x-2 text-[#FCA311] hover:text-orange-200 transition-colors"
        >
          <Map size={20} />
          <span>Get Directions</span>
        </a>
        <a
          href={embed_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center space-x-2 text-[#FCA311] hover:text-orange-200 transition-colors"
        >
          <ExternalLink size={20} />
          <span>View Map</span>
        </a>
      </div>

      <div className="w-full h-40 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
        <iframe
          title={`Map of ${name}`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="border-none"
        ></iframe>
      </div>
    </div>
  );
};
