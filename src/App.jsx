import { useState } from "react";

import "./App.css";

import MapView from "./components/MapView";

import FoodCard from "./components/FoodCard";

import foodPlaces from "./data/foodPlaces";

import calculateDistance from "./utils/distance";

function App() {

  const nitLat = 21.2493;

  const nitLng = 81.6052;

  const [selectedType, setSelectedType] = useState("All");

  const [minimumRating, setMinimumRating] = useState(0);

  // SELECTED PLACE

  const [selectedPlace, setSelectedPlace] = useState(null);

  // FILTERS

  const filteredPlaces = foodPlaces.filter((place) => {

    const matchesType =

      selectedType === "All" ||

      place.type === selectedType;

    const matchesRating =

      place.rating >= minimumRating;

    return matchesType && matchesRating;
  });

  // SORTING

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {

    const distanceA = calculateDistance(
      nitLat,
      nitLng,
      a.lat,
      a.lng
    );

    const distanceB = calculateDistance(
      nitLat,
      nitLng,
      b.lat,
      b.lng
    );

    return distanceA - distanceB;
  });

  // SHOW ONLY SELECTED CARD

  const displayedCards =

    selectedPlace

      ? [selectedPlace]

      : sortedPlaces;

  return (

    <div className="app">

      {/* SIDEBAR */}

      <div className="sidebar">
      <div className="logo-box">

  <div className="logo-circle">

    😋

  </div>

  <h1 className="logo glitter-logo">

    𝘾𝙝𝙖𝙩𝙤𝙧𝙚

  </h1>

</div>

        <p className="subtitle">

          Find the tastiest places near NIT Raipur

        </p>

        {/* FILTERS */}

        {

          !selectedPlace && (

            <div className="filters">

              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value)
                }
              >

                <option value="All">
                  All Food
                </option>

                <option value="Momos">
                  Momos
                </option>

                <option value="Rolls">
                  Rolls
                </option>

                <option value="Biryani">
                  Biryani
                </option>

                <option value="Cafe">
                  Cafe
                </option>

              </select>

              <select
                value={minimumRating}
                onChange={(e) =>
                  setMinimumRating(
                    Number(e.target.value)
                  )
                }
              >

                <option value={0}>
                  All Ratings
                </option>

                <option value={4}>
                  4+ Rating
                </option>

                <option value={4.5}>
                  4.5+ Rating
                </option>

              </select>

            </div>

          )

        }

        {/* RESET BUTTON */}

        {

          selectedPlace && (

            <button
            className="back-btn"
          
            onClick={() =>
              setSelectedPlace(null)
            }
          >
            ← Back To Results
          </button>
          )

        }

        {/* FOOD CARDS */}

        {

          displayedCards.map((place) => (

            <div
              key={place.id}

              onClick={() =>
                setSelectedPlace(place)
              }
            >

              <FoodCard
                place={place}

            distance={
  (
    calculateDistance(
      nitLat,
      nitLng,
      place.lat,
      place.lng
    ) * 1.8
  ).toFixed(1)
}
              />

            </div>

          ))

        }

      </div>

      {/* MAP */}

      <div className="map-container">

        <MapView
          places={displayedCards}
          selectedPlace={selectedPlace}
        />

      </div>

    </div>
  );
}

export default App;
