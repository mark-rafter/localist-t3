import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Coordinates } from "@/helpers/distance";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export function PostMap({ lat, long }: Coordinates) {
  return (
    <div>
      <MapContainer
        center={[lat, long]}
        attributionControl={false}
        zoom={10}
        scrollWheelZoom={false}
        style={{ width: "300px", height: "200px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, long]} />
      </MapContainer>
    </div>
  );
}
