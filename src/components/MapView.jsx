import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import calculateDistance from "../utils/distance";

import L from "leaflet";

import "leaflet-color-markers";

function MapView({ places, selectedPlace }) {

  const nitLat = 21.2493;

  const nitLng = 81.6052;

  const [route, setRoute] = useState([]);

  // BLUE ICON

  const blueIcon = new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],

    iconAnchor: [12, 41]
  });

  // RED ICON

  const redIcon = new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],

    iconAnchor: [12, 41]
  });

  // PINK ICON

  const pinkIcon = new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],

    iconAnchor: [12, 41]
  });

  // AUTO ROUTE DRAW

  useEffect(() => {

    if (selectedPlace) {

      getRoute(selectedPlace);
    }
    else{

      setRoute([]);
    }

  }, [selectedPlace]);

  // GET ROUTE

  async function getRoute(place) {

    const url =
      `https://router.project-osrm.org/route/v1/driving/${nitLng},${nitLat};${place.lng},${place.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url);

    const data = await response.json();

    const routeCoordinates =
      data.routes[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]]
      );

    setRoute(routeCoordinates);
  }

  return (

    <MapContainer
      center={[21.2493, 81.6052]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* NIT MARKER */}

      <Marker
        position={[21.2493, 81.6052]}
        icon={blueIcon}
      >

        <Popup>
          NIT Raipur Main Gate 😌
        </Popup>

      </Marker>

      {/* FOOD MARKERS */}

      {

        places.map((place) => (

          <Marker
            key={place.id}

            position={[place.lat, place.lng]}

            icon={
              selectedPlace

                ? redIcon

                : pinkIcon
            }
          >

            <Popup>

              <div>

                <h2 style={{ color: "#FF4D2E" }}>

                  {place.name}

                </h2>

                <p>

                  🍜 {place.type}

                </p>

                <p>

                  ⭐ Rating: {place.rating}

                </p>

                <p>

                  📍 Distance:

                  {
                    calculateDistance(
                      nitLat,
                      nitLng,
                      place.lat,
                      place.lng
                    ).toFixed(2)
                  }

                  km

                </p>

              </div>

            </Popup>

          </Marker>

        ))

      }

      {/* ROUTE */}

      {

        route.length > 0 && (

          <Polyline
            positions={route}
            color="#FF4D2E"
            weight={5}
          />

        )

      }

    </MapContainer>
  );
}

export default MapView;