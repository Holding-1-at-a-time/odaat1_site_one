// file: components/reviews/review-list.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { StarRating } from "./star-rating";
import { formatDistanceToNow } from "date-fns";

interface ReviewListProps {
  serviceSlug: string;
}

export function ReviewList({ serviceSlug }: ReviewListProps) {
  const reviews = useQuery(api.reviews.getByService, { serviceSlug });

  if (!reviews) {
    return <div className="text-slate-500 italic">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-slate-500 italic text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800 border-dashed">
        No reviews yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-bold text-white">{review.customerName}</div>
              <div className="text-xs text-slate-500">
                {formatDistanceToNow(review.createdAt, { addSuffix: true })}
              </div>
            </div>
            <StarRating rating={review.rating} readonly className="scale-75 origin-top-right" />
          </div>
          <p className="text-slate-300 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}