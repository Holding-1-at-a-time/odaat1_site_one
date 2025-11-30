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