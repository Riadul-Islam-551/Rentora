"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, ImagePlus, Loader2, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

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

import { uploadPhoto } from "@/lib/core/uploadPhoto";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useToast } from "@/lib/core/toastContext";
import { useRouter } from "next/navigation";

export function RegistrationPage({ trigger, open, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      photo: null,
      password: "",
    },

    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        //Generate temporary ID for Supabase Storage
        const temporaryUserId = crypto.randomUUID();

        let imageUrl = "";

        // Upload profile image

        if (value.photo instanceof File) {
          imageUrl = await uploadPhoto(value.photo, temporaryUserId);
        }

        //  Create Better Auth account

        const { data, error } = await authClient.signUp.email({
          email: value.email.trim().toLowerCase(),
          password: value.password,
          name: value.name.trim(),
          image: imageUrl || undefined,
          callbackURL: "/dashboard",
        });

        if (error) {
          throw new Error(error.message || "Unable to create your account.");
        }

        toast({
          message: "You Register Successfully!!",
          type: "success",
        });

        console.log("Registration successful:", data);

        router.refresh();
        form.reset();
        setPhotoPreview(null);
        setSubmitError("");
        onOpenChange?.(false);
      } catch (error) {
        console.error("Registration failed:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.";

        setSubmitError(errorMessage);
        toast({
          message: errorMessage,
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  //  Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  // Reset the form when Sheet closes.
  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);

    if (!nextOpen && !isSubmitting) {
      form.reset();
      setPhotoPreview(null);
      setSubmitError("");
      setShowPassword(false);
    }
  };

  /**
   * Google registration.
   */
  // const handleGoogleSignup = async () => {
  //   setSubmitError("");

  //   try {
  //     await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/dashboard",
  //     });
  //   } catch (error) {
  //     console.error("Google signup failed:", error);

  //     setSubmitError(
  //       error instanceof Error
  //         ? error.message
  //         : "Unable to continue with Google.",
  //     );
  //   }
  // };

  /**
   * Remove selected photo.
   */
  const handleRemovePhoto = (field) => {
    field.handleChange(null);
    setPhotoPreview(null);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger && <SheetTrigger render={trigger} />}

      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b pb-5">
          <SheetTitle className="text-2xl">Create your account</SheetTitle>

          <SheetDescription>
            Join Rentora to discover verified properties, book your next home,
            and manage everything securely.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            form.handleSubmit();
          }}
          className="flex flex-1 flex-col"
        >
          <div className="flex-1 space-y-6 px-4 py-6">
            <FieldGroup>
              {/* ================= NAME ================= */}
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
                        aria-invalid={isInvalid}
                        placeholder="John Doe"
                        autoComplete="name"
                        disabled={isSubmitting}
                      />

                      <FieldDescription>
                        Enter your first and last name.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ================= EMAIL ================= */}

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
                        Email address
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
                        aria-invalid={isInvalid}
                        placeholder="john@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                      />

                      <FieldDescription>
                        We&apos;ll use this email for account access and
                        important notifications.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ================= PHOTO ================= */}

              <form.Field
                name="photo"
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

                    const maxSize = 5 * 1024 * 1024;

                    if (value.size > maxSize) {
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
                          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:bg-muted/60"
                        >
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <ImagePlus size={22} />
                          </div>

                          <p className="text-sm font-medium">
                            Upload your profile photo
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            JPG, PNG or WebP up to 5MB
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
                            alt="Selected profile preview"
                            height={100}
                            width={100}
                            className="object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(field)}
                            disabled={isSubmitting}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                            aria-label="Remove profile photo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}

                      <FieldDescription>
                        Your profile photo helps property owners recognize your
                        account.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* ================= PASSWORD ================= */}

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
                          aria-invalid={isInvalid}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          disabled={isSubmitting}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          disabled={isSubmitting}
                          className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
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
                        Use at least 8 characters with uppercase, lowercase, and
                        a number.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            {/* ================= SERVER ERROR ================= */}

            {submitError && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {submitError}
              </div>
            )}

            {/* ================= TERMS ================= */}

            <p className="text-center text-xs leading-5 text-muted-foreground rounded-xl bg-primary/5 p-2 ">
              By creating an account, you agree to Rentora&apos;s terms of
              service and privacy policy.
            </p>
          </div>

          {/* ================= FOOTER ================= */}

          <SheetFooter className="border-t bg-background px-4 py-5">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              // onClick={handleGoogleSignup}
              disabled={isSubmitting}
            >
              <FcGoogle size={18} />
              Continue with Google
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
