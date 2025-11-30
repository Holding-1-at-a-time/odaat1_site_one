// file: components/reviews/review-form.tsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { StarRating } from "./star-rating";
import { Loader2 } from "lucide-react";

interface ReviewFormProps {
  serviceSlug: string;
}

/**
 * Renders a review submission form for a given service and manages its local state and submission flow.
 *
 * The form collects a star rating, the reviewer's name, and a feedback comment; it submits the data to the reviews API,
 * shows a loading state while submitting, and displays a confirmation panel after a successful submission.
 *
 * @param serviceSlug - The identifier of the service being reviewed.
 * @returns The component's rendered React element.
 */
export function ReviewForm({ serviceSlug }: ReviewFormProps) {
  const submitReview = useMutation(api.reviews.submitReview);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setIsSubmitting(true);
    try {
      await submitReview({
        serviceSlug,
        customerName: name,
        rating,
        comment,
      });
      setIsSuccess(true);
      setName("");
      setComment("");
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-900/50 border border-green-500/20 rounded-xl p-6 text-center">
        <h3 className="text-green-500 font-bold mb-2">Thank you for your feedback!</h3>
        <p className="text-slate-400 text-sm">
          Your review helps us maintain our high standards.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs text-[#00ae98] hover:underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-white">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00ae98]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-slate-400 mb-1">Feedback</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00ae98] resize-none"
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00ae98] hover:bg-[#009b86] text-white font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Review"}
      </button>
    </form>
  );
}