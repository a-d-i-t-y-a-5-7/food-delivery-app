import React, { useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";
import "./Review.css";

export const Reviews = ({ fetchReviews, entityId, emptyMessage }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews(entityId);
        setReviews(fetchedReviews);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [fetchReviews, entityId]);

  if (loading) return <p>Loading reviews...</p>;
  return (
    <div className="review-container">
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
        <p className="text-center">{emptyMessage}</p>
      )}
    </div>
  );
};
