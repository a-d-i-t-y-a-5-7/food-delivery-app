import React, { useEffect, useState } from "react";
import { ReviewCard } from "../Review/ReviewCard";
import { fetchReviewsBydeliveryPartner } from "../../Helper/RestaurantHelper";

export const ReviewsByDeliveryPartner = ({ partnerId = 1 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchReviewsBydeliveryPartner(partnerId);
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
        <p className="text-center">
          No reviews available for this delivery partner.
        </p>
      )}
    </div>
  );
};
