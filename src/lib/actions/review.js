import { serverPost } from "../core/server";

export const createReview = async ({
  propertyId,
  tenantId,
  rating,
  feedback,
}) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }

  if (!rating) {
    throw new Error("Rating is required");
  }

  if (!feedback?.trim()) {
    throw new Error("Feedback is required");
  }

  return serverPost("/api/reviews", {
    propertyId,
    tenantId,
    rating: Number(rating),
    feedback: feedback.trim(),
  });
};
