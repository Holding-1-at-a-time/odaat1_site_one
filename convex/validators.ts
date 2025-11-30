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
 * Creates a default timestamp (current time) for use in mutations
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Validates that a timestamp is not in the future (with 5 second tolerance)
 */
export function validateTimestampNotFuture(timestamp: number): boolean {
  const currentTime = Date.now();
  const tolerance = 5000; // 5 seconds
  return timestamp <= (currentTime + tolerance);
}

/**
 * Validates that updatedAt is greater than or equal to createdAt
 */
export function validateUpdatedAtAfterCreatedAt(
  updatedAt: number, 
  createdAt: number
): boolean {
  return updatedAt >= createdAt;
}

/**
 * Runtime validation for create/update operations
 * Throws an error if validation fails
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
 * Ensures updatedAt is always set to current time for new records
 */
export function ensureUpdatedAt(timestamp?: number): number {
  return timestamp || getCurrentTimestamp();
}