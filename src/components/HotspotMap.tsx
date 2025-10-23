import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { hotspots } from "../data/hotspots";
import "leaflet/dist/leaflet.css";

const mapMarkerIcon = L.icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='48' viewBox='0 0 32 48'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23fc5218'/%3E%3Cstop offset='100%25' stop-color='%23ff8a3d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23grad)' d='M16 0C7.2 0 0 7.2 0 16c0 11.4 16 32 16 32s16-20.6 16-32C32 7.2 24.8 0 16 0z'/%3E%3Cpath fill='%23fff' d='M21.5 18h-2.2l1.2-5.1c.3-1.1-.6-2.1-1.7-1.9l-5.6 1c-1 .2-1.6 1.2-1.4 2.2l.9 4.2H10c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h11.5c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1z'/%3E%3C/svg%3E",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -44]
});

const center: L.LatLngTuple = [48.8566, 2.3522];

function HotspotMap() {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="Food hotspots map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotspots.map((place) => (
        <Marker position={place.position} key={place.id} icon={mapMarkerIcon}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default HotspotMap;
