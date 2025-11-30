import { v } from "convex/values";

/**
 * Validation utilities for ensuring data consistency
 * Particularly focused on required timestamps and field validation
 */

/**
 * Validates that a timestamp is a valid number and not in the future
 */
export const validateTimestamp = v.union(
  v.number(),
  v.string()
);

/**
 * Validates that updatedAt is always provided and is a valid timestamp
 */
export const validateUpdatedAt = v.number();

/**
 * Get the current epoch timestamp in milliseconds.
 *
 * @returns The current epoch time in milliseconds since the Unix epoch.
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Determines whether a timestamp is not more than 5 seconds ahead of the current time.
 *
 * @param timestamp - Epoch milliseconds to validate.
 * @returns `true` if `timestamp` is less than or equal to the current time plus a 5-second tolerance, `false` otherwise.
 */
export function validateTimestampNotFuture(timestamp: number): boolean {
  const currentTime = Date.now();
  const tolerance = 5000; // 5 seconds
  return timestamp <= (currentTime + tolerance);
}

/**
 * Determines whether `updatedAt` is greater than or equal to `createdAt`.
 *
 * @returns `true` if `updatedAt` is greater than or equal to `createdAt`, `false` otherwise.
 */
export function validateUpdatedAtAfterCreatedAt(
  updatedAt: number, 
  createdAt: number
): boolean {
  return updatedAt >= createdAt;
}

/**
 * Validates presence and logical correctness of `createdAt` and `updatedAt` timestamps.
 *
 * Checks that both fields are present, are not in the future (with tolerance), and that
 * `updatedAt` is greater than or equal to `createdAt`. If any check fails, throws an Error
 * containing a comma-separated list of validation failures.
 *
 * @param data - An object containing optional `createdAt` and `updatedAt` timestamps (milliseconds since epoch)
 * @throws Error - When one or more timestamp validations fail; message format: `Timestamp validation failed: <errors>`
 */
export function validateRequiredTimestamps(data: {
  createdAt?: number;
  updatedAt?: number;
}): void {
  const errors: string[] = [];

  if (!data.createdAt) {
    errors.push("createdAt is required");
  }

  if (!data.updatedAt) {
    errors.push("updatedAt is required");
  }

  if (data.createdAt && !validateTimestampNotFuture(data.createdAt)) {
    errors.push("createdAt cannot be in the future");
  }

  if (data.updatedAt && !validateTimestampNotFuture(data.updatedAt)) {
    errors.push("updatedAt cannot be in the future");
  }

  if (data.createdAt && data.updatedAt && 
      !validateUpdatedAtAfterCreatedAt(data.updatedAt, data.createdAt)) {
    errors.push("updatedAt must be greater than or equal to createdAt");
  }

  if (errors.length > 0) {
    throw new Error(`Timestamp validation failed: ${errors.join(", ")}`);
  }
}

/**
 * Provide a timestamp to use for `updatedAt`, defaulting to the current time when none is supplied.
 *
 * @param timestamp - Optional existing `updatedAt` value to use instead of generating a new one
 * @returns The provided `timestamp` if defined, otherwise the current epoch time in milliseconds
 */
export function ensureUpdatedAt(timestamp?: number): number {
  return timestamp || getCurrentTimestamp();
}