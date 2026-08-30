import React from "react";
import Image from "next/image";
import { getTopReview } from "@/lib/api/review";
import { getUserById } from "@/lib/api/users";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Star, MessageSquareQuote } from "lucide-react";

// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (dateString) => {
  if (!dateString) return "";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
};

// =====================================================
// STAR RATING
// =====================================================

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${
            index < Number(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

// =====================================================
// TOP REVIEW SECTION
// =====================================================

const TopReviewSection = async () => {
  let reviews = [];

  try {
    const reviewResponse = await getTopReview();

    reviews = reviewResponse?.data || reviewResponse?.[0]?.data || [];
  } catch (error) {
    console.error("Failed to fetch top reviews:", error);
  }

  // ===================================================
  // FETCH TENANT INFORMATION
  // ===================================================

  const reviewsWithUsers = await Promise.all(
    reviews.map(async (review) => {
      let user = null;

      if (review?.tenantId) {
        try {
          const userResponse = await getUserById(review.tenantId);

          user = userResponse?.data;
        } catch (error) {
          console.error(
            `Failed to fetch user for tenantId: ${review.tenantId}`,
            error,
          );
        }
      }

      return {
        ...review,
        user,
      };
    }),
  );

  console.log("review with user", reviewsWithUsers)

  return (
    <section className="bg-background py-16 text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        {/* =================================================
            SECTION HEADER
            ================================================= */}

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-3 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider"
          >
            Tenant Experiences
          </Badge>

          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Our Tenants Say
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Real feedback from verified tenants who found their ideal property
            through Nestify.
          </p>
        </div>

        {/* =================================================
            REVIEWS
            ================================================= */}

        {reviewsWithUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviewsWithUsers.map((review) => {
              // IMPORTANT:
              // User belongs to this review
              const user = review.user;
              console.log("user",user)

              const tenantName = user?.name || "Verified Tenant";

              const tenantEmail = user?.email || "tenant@nestify.com";

              const tenantImage = user?.image || null;

              return (
                <Card
                  key={review._id}
                  className="
                    flex
                    h-full
                    flex-col
                    justify-between
                    border
                    border-border
                    bg-card
                    transition-all
                    duration-300
                    hover:border-primary/40
                    hover:shadow-md
                  "
                >
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    {/* =====================================
                        TOP
                        ===================================== */}

                    <div>
                      {/* Rating + Date */}

                      <div className="mb-4 flex items-center justify-between gap-3">
                        <StarRating rating={review.rating} />

                        <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>

                      {/* Feedback */}

                      <p className="mb-6 text-sm font-medium italic leading-relaxed text-foreground">
                        &quot;{review.feedback}&quot;
                      </p>
                    </div>

                    {/* =====================================
                        TENANT
                        ===================================== */}

                    <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                      {/* IMAGE */}

                      {tenantImage ? (
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border">
                          <Image
                            src={tenantImage}
                            alt={tenantName}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {tenantName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      {/* NAME + EMAIL */}

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-bold text-card-foreground">
                          {tenantName}
                        </h4>

                        <p className="truncate text-xs text-muted-foreground">
                          {tenantEmail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* ================================================
             EMPTY STATE
             ================================================ */

          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
            <MessageSquareQuote className="mb-3 size-10 text-muted-foreground opacity-60" />

            <h3 className="mb-1 text-base font-bold text-card-foreground">
              No Reviews Yet
            </h3>

            <p className="text-xs text-muted-foreground">
              Be the first tenant to leave feedback on your rental experience.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopReviewSection;
