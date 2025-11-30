// file: components/admin/status-badge.tsx
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
}

/**
 * Renders a compact status badge styled according to the provided status.
 *
 * @param status - The status label to display. Recognized values: "pending", "confirmed", "completed", "cancelled". Unrecognized values use a default slate style.
 * @returns A JSX span element containing the `status` text with classes applied for the corresponding status style (or the default style for unknown statuses).
 */
export function StatusBadge({ status }: StatusBadgeProps) {
    const styles: Record<string, string> = {
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        completed: "bg-green-500/10 text-green-500 border-green-500/20",
        cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <span
            className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                styles[status] || "bg-slate-800 text-slate-400 border-slate-700"
            )}
        >
            {status}
        </span>
    );
}