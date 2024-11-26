import React, { useEffect, useState } from "react";
import { fetchReviewsByRestaurant } from "../../Helper/RestaurantHelper";
import { ReviewCard } from "../Review/ReviewCard";

export const ReviewsByRestaurant = ({ restaurantId = 2 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchReviewsByRestaurant(restaurantId);
        setReviews(fetchedReviews);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="d-flex mt-4">
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No reviews available for this restaurant.</p>
      )}
    </div>
  );
};
