"use client";

import React, { useState } from "react";
import { Star, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createReview } from "@/lib/actions/review";
import { useToast } from "@/lib/core/toastContext";

const ReviewForm = ({ propertyId, tenantId }) => {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!tenantId) {
      setMessage("You must be logged in as a tenant to submit a review.");
      return;
    }

    if (!propertyId) {
      setMessage("Property information is missing.");
      return;
    }

    if (!rating) {
      setMessage("Please select a rating.");
      return;
    }

    if (!feedback.trim()) {
      setMessage("Please write your feedback.");
      return;
    }

    try {
      setLoading(true);

      const response = await createReview({
        propertyId,
        tenantId,
        rating,
        feedback,
      });

      if (!response.success) {
        setMessage(response.message || "Failed to submit review.");
        toast({
          message: response.message,
          type: "error",
        });
        return;
      }

      // Clear form
      setRating("");
      setFeedback("");

      setMessage("Review submitted successfully.");
      toast({
        message: "Your review submitted successfully !",
        type: "success",
      });
    } catch (error) {
      console.error("Review submission error:", error);
      toast({
        message: error.message,
        type: "error",
      });
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border bg-card p-5">
      {/* HEADER */}

      <div className="mb-5">
        <h2 className="text-lg font-semibold">Leave a Review</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Share your experience with this property.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ================================================
            RATING
            ================================================ */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>

          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">
                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-current" />
                  <span>1 - Poor</span>
                </div>
              </SelectItem>

              <SelectItem value="2">
                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-current" />
                  <span>2 - Fair</span>
                </div>
              </SelectItem>

              <SelectItem value="3">
                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-current" />
                  <span>3 - Good</span>
                </div>
              </SelectItem>

              <SelectItem value="4">
                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-current" />
                  <span>4 - Very Good</span>
                </div>
              </SelectItem>

              <SelectItem value="5">
                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-current" />
                  <span>5 - Excellent</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ================================================
            FEEDBACK
            ================================================ */}

        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Feedback
          </label>

          <Input
            id="feedback"
            type="text"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            className="h-11"
          />
        </div>

        {/* ================================================
            MESSAGE
            ================================================ */}

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        {/* ================================================
            SUBMIT
            ================================================ */}

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
