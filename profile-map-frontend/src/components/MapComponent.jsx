import { useEffect, useState } from "react";

const MapComponent = ({ address }) => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    setMapUrl(`https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(address)}`);
  }, [address]);

  return (
    <div className="max-w-5xl flex justify-center mt-6">
      <iframe
        width="90%"
        height="400"
        className="rounded-lg shadow-lg border"
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapComponent;
