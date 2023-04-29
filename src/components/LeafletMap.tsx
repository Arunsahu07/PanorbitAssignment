import { Marker, TileLayer } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { Typography } from '@material-tailwind/react';

const LeafletMap = ({ lat, lng }: { lat: number; lng: number }) => {
  if (isNaN(lat) || isNaN(lng))
    return (
      <div className="bg-blue-gray-200 w-full h-96 flex items-center justify-center  rounded-xl">
        <Typography variant="h5" color="white">
          Invalid co-ordinates
        </Typography>
      </div>
    );
  return (
    <MapContainer
      key={`
        lat:${lat} long:${lng}
      `}
      center={[lat, lng]}
      zoom={13}
      //   scrollWheelZoom={false}
      zoomControl={false}
      className="bg-blue-gray-300 w-full h-96 "
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}></Marker>
    </MapContainer>
  );
};

export default LeafletMap;
