"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { uploadPhoto } from "@/lib/core/uploadPhoto";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/lib/core/toastContext";
import { useRouter } from "next/navigation";

export function BusinessAccountPage({ trigger, open, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      image: null,
      password: "",
    },

    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        
        //  * Temporary ID for Supabase Storage.
        const temporaryUserId = crypto.randomUUID();

        let imageUrl = "";

        /** Upload owner profile photo.*/
        if (value.image instanceof File) {
          imageUrl = await uploadPhoto(value.image, temporaryUserId);
        }

        /** Better Auth registration.** `role: "owner"` requires your Better Auth* additional field to allow client input.*/
        const { data, error } = await authClient.signUp.email(
          {
            email: value.email.trim().toLowerCase(),
            password: value.password,
            name: value.name.trim(),
            image: imageUrl || undefined,
            role: "owner",
            mobileNumber: value.mobileNumber.trim(),
          },
          {
            onRequest: () => {
              setIsSubmitting(true);
            },

            onSuccess: (ctx) => {
              console.log("Business account created:", ctx);
              toast({
                message: "Business Account Created Successfully !!",
                type: "success",
              });
              router.refresh();
            },

            onError: (ctx) => {
              console.error("Better Auth error:", ctx.error);

              setSubmitError(
                ctx.error.message || "Unable to create your business account.",
              );
            },
          },
        );

        if (error) {
          throw new Error(
            error.message || "Unable to create your business account.",
          );
        }

        console.log("Business registration successful:", data);

        /** Reset form.*/
        form.reset();

        setPhotoPreview(null);
        setSubmitError("");
        setShowPassword(false);

        /** Close the Sheet.*/
        onOpenChange?.(false);
      } catch (error) {
        console.error("Business registration failed:", error);

        setSubmitError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  /** Clean up image preview URL.*/
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  /** Handle Sheet open/close.*/
  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);

    if (!nextOpen && !isSubmitting) {
      form.reset();

      setPhotoPreview(null);
      setSubmitError("");
      setShowPassword(false);
    }
  };

  /** Remove selected image.*/
  const removePhoto = (field) => {
    field.handleChange(null);
    setPhotoPreview(null);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger && <SheetTrigger render={trigger} />}

      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-lg"
      >
        {/* =========================================
            OWNER HERO
        ========================================== */}

        <div className="relative border-b bg-primary/5 px-6 py-7">
          {/* Animated decorative circles */}

          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 animate-pulse rounded-full bg-primary/20" />

          {/* <div className="overflow-hidden pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 animate-pulse rounded-full bg-primary/10 [animation-delay:700ms]" /> */}

          <div className="">
            <div className="mb-4 inline-flex animate-in items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm fade-in slide-in-from-top-2 duration-500">
              <Sparkles size={14} className="animate-pulse" />
              Property Owner
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 animate-in items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 zoom-in duration-500">
                <Building2 size={24} />
              </div>

              <div>
                <SheetTitle className="text-2xl font-bold tracking-tight">
                  Grow your property business
                </SheetTitle>

                <SheetDescription className="mt-1 max-w-md text-sm leading-6">
                  Create your owner account and start managing your properties,
                  tenants, and bookings from one place.
                </SheetDescription>
              </div>
            </div>

            {/* Owner benefits */}

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <OwnerBenefit
                icon={<Building2 size={15} />}
                text="List properties"
              />

              <OwnerBenefit
                icon={<ShieldCheck size={15} />}
                text="Secure payments"
              />

              <OwnerBenefit
                icon={<CheckCircle2 size={15} />}
                text="Manage bookings"
              />
            </div>
          </div>
        </div>

        {/* =========================================
            FORM
        ========================================== */}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            form.handleSubmit();
          }}
          className="flex min-h-full flex-col"
        >
          <div className="flex-1 px-6 py-6">
            <FieldGroup>
              {/* ===================================
                  NAME
              =================================== */}

              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const name = value.trim();

                    if (!name) {
                      return "Full name is required.";
                    }

                    if (name.length < 2) {
                      return "Name must be at least 2 characters.";
                    }

                    if (name.length > 80) {
                      return "Name must be less than 80 characters.";
                    }

                    return undefined;
                  },

                  onBlur: ({ value }) => {
                    if (!value.trim()) {
                      return "Full name is required.";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-invalid={isInvalid}
                        disabled={isSubmitting}
                      />

                      <FieldDescription>
                        Enter the name you use for your property business.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ===================================
                  EMAIL
              =================================== */}

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const email = value.trim();

                    if (!email) {
                      return "Email address is required.";
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailRegex.test(email)) {
                      return "Please enter a valid email address.";
                    }

                    return undefined;
                  },

                  onBlur: ({ value }) => {
                    if (!value.trim()) {
                      return "Email address is required.";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Business email
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="owner@example.com"
                        autoComplete="email"
                        aria-invalid={isInvalid}
                        disabled={isSubmitting}
                      />

                      <FieldDescription>
                        Use an email address you actively monitor.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ===================================
                  MOBILE
              =================================== */}

              <form.Field
                name="mobileNumber"
                validators={{
                  onChange: ({ value }) => {
                    const mobile = value.trim();

                    if (!mobile) {
                      return "Mobile number is required.";
                    }

                    const mobileRegex = /^\+?[0-9\s\-()]{7,20}$/;

                    if (!mobileRegex.test(mobile)) {
                      return "Enter a valid mobile number.";
                    }

                    return undefined;
                  },

                  onBlur: ({ value }) => {
                    if (!value.trim()) {
                      return "Mobile number is required.";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Mobile number
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="+880 1XXX-XXXXXX"
                        autoComplete="tel"
                        aria-invalid={isInvalid}
                        disabled={isSubmitting}
                      />

                      <FieldDescription>
                        We&apos;ll use this number for important property and
                        booking notifications.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ===================================
                  PHOTO
              =================================== */}

              <form.Field
                name="image"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Profile photo is required.";
                    }

                    if (!(value instanceof File)) {
                      return "Please select a valid image.";
                    }

                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];

                    if (!allowedTypes.includes(value.type)) {
                      return "Only JPG, PNG, and WebP images are allowed.";
                    }

                    if (value.size > 5 * 1024 * 1024) {
                      return "Image must be smaller than 5MB.";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Profile photo
                      </FieldLabel>

                      {!photoPreview ? (
                        <label
                          htmlFor={field.name}
                          className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                        >
                          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                            <ImagePlus size={21} />
                          </div>

                          <p className="text-sm font-semibold">
                            Upload your photo
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            JPG, PNG or WebP · Maximum 5MB
                          </p>

                          <Input
                            id={field.name}
                            name={field.name}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="sr-only"
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null;

                              field.handleChange(file);

                              if (file) {
                                setPhotoPreview(URL.createObjectURL(file));
                              }
                            }}
                            aria-invalid={isInvalid}
                            disabled={isSubmitting}
                          />
                        </label>
                      ) : (
                        <div className="relative overflow-hidden rounded-xl border bg-muted">
                          <Image
                            src={photoPreview}
                            alt="Owner profile preview"
                            width={100}
                            height={100}
                            className="object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removePhoto(field)}
                            disabled={isSubmitting}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                            aria-label="Remove photo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ===================================
                  PASSWORD
              =================================== */}

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Password is required.";
                    }

                    if (value.length < 8) {
                      return "Password must be at least 8 characters.";
                    }

                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain an uppercase letter.";
                    }

                    if (!/[a-z]/.test(value)) {
                      return "Password must contain a lowercase letter.";
                    }

                    if (!/[0-9]/.test(value)) {
                      return "Password must contain a number.";
                    }

                    return undefined;
                  },

                  onBlur: ({ value }) => {
                    if (!value) {
                      return "Password is required.";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          aria-invalid={isInvalid}
                          disabled={isSubmitting}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          disabled={isSubmitting}
                          className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>

                      <FieldDescription>
                        At least 8 characters, including uppercase, lowercase,
                        and a number.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            {/* =====================================
                ERROR
            ====================================== */}

            {submitError && (
              <div
                role="alert"
                className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {submitError}
              </div>
            )}

            {/* =====================================
                OWNER TRUST MESSAGE
            ====================================== */}

            <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Built for property owners
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your account will be registered as an owner account, giving
                    you access to property management and business features.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              FOOTER
          ========================================== */}

          <SheetFooter className="border-t bg-background px-6 py-5">
            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating owner account...
                </>
              ) : (
                <>
                  <Building2 size={17} />
                  Create Owner Account
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function OwnerBenefit({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary/10 bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur-sm">
      <span className="text-primary">{icon}</span>

      <span>{text}</span>
    </div>
  );
}
