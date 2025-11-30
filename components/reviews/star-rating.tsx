// file: components/reviews/star-rating.tsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0-5
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  className?: string;
}

/**
 * Render an interactive star rating control.
 *
 * Renders `maxRating` star buttons where stars with a position less than or equal to `rating`
 * appear filled. When `readonly` is false, clicking a star invokes `onRatingChange` with the
 * selected star value. Each star includes an accessible `aria-label`.
 *
 * @param rating - Current rating value (1 through `maxRating`, or 0 for none)
 * @param maxRating - Total number of stars to display (default: 5)
 * @param onRatingChange - Callback invoked with the new rating when a star is clicked
 * @param readonly - When true, disables interaction and hover/focus styles (default: false)
 * @param className - Additional CSS classes applied to the root container
 * @returns The rendered star rating element
 */
export function StarRating({
  rating,
  maxRating = 5,
  onRatingChange,
  readonly = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onRatingChange?.(starValue)}
            className={cn(
              "transition-all focus:outline-none focus:ring-2 focus:ring-[#00ae98] rounded-sm",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
              isFilled ? "text-yellow-400" : "text-slate-700"
            )}
            aria-label={`Rate ${starValue} stars`}
          >
            <Star
              className={cn(
                "w-5 h-5",
                isFilled ? "fill-current" : "stroke-current"
              )}
            />
          </button>
        );
      })}
    </div>
  );
} 