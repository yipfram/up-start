import L from "leaflet";

export type Hotspot = {
  id: string;
  name: string;
  description: string;
  position: L.LatLngTuple;
};

export const hotspots: Hotspot[] = [
  {
    id: "coffee-lab",
    name: "Coffee Lab",
    description: "Artisanal brews & creators' hangout.",
    position: [48.8566, 2.3522]
  },
  {
    id: "spice-trail",
    name: "Spice Trail",
    description: "Modern street food with global flair.",
    position: [48.8686, 2.3212]
  },
  {
    id: "skyline-sushi",
    name: "Skyline Sushi",
    description: "Omakase bites with rooftop views.",
    position: [48.853, 2.3499]
  }
];
