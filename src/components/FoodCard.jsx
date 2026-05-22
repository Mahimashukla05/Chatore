function FoodCard({ place, distance }) {

  return (

    <div className="food-card">

      <h2 className="food-title">

        {place.name}

      </h2>

      <p className="food-meta">

        🍜 {place.type}

      </p>

      <p className="food-meta rating">

        ⭐ {place.rating}

      </p>

      <p className="food-meta">

        📍 {distance} km away

      </p>

    </div>
  );
}

export default FoodCard;