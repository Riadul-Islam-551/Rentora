"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RegistrationPage } from "./Registration";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/core/toastContext";

export function LoginPage({ trigger }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // --------------------------------------------------
  // Validation
  // --------------------------------------------------

  const validateEmail = (email) => {
    const value = email.trim();

    if (!value) {
      return "Email is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  };

  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  const isFormValid =
    formData.email.trim() !== "" &&
    formData.password !== "" &&
    !errors.email &&
    !errors.password;

  // --------------------------------------------------
  // Input handlers
  // --------------------------------------------------

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Remove server error as soon as the user edits the form.
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleBlur = (field) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  // --------------------------------------------------
  // Reset form
  // --------------------------------------------------

  const resetLoginForm = () => {
    setFormData({
      email: "",
      password: "",
    });

    setTouched({
      email: false,
      password: false,
    });

    setSubmitError("");
  };

  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    setSubmitError("");

    if (!isFormValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await authClient.signIn.email({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) {
        console.error("Better Auth login error:", error);

        setSubmitError(
          error.message ||
            "Unable to log in. Please check your email and password.",
        );

        return;
      }
      toast({
        message: "You Sign in successfully !",
        type: "success",
      });
      router.refresh();
      console.log("Login successful:", data);

      resetLoginForm();
      setLoginOpen(false);

      // If you want to redirect after login:
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while logging in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // Google login
  // --------------------------------------------------

  const handleGoogleSignin = async () => {
    try {
      setIsGoogleLoading(true);
      setSubmitError("");

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        console.error("Google login error:", error);

        setSubmitError(error.message || "Unable to continue with Google.");
      }
    } catch (error) {
      console.error("Google login failed:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to continue with Google.",
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // --------------------------------------------------
  // Open registration
  // --------------------------------------------------

  const handleRegistration = () => {
    setLoginOpen(false);
    setRegistrationOpen(true);
  };

  // --------------------------------------------------
  // Login sheet closed
  // --------------------------------------------------

  const handleLoginOpenChange = (open) => {
    setLoginOpen(open);

    if (!open) {
      resetLoginForm();
    }
  };

  return (
    <>
      {/* ==================================================
          LOGIN SHEET
      ================================================== */}

      <Sheet open={loginOpen} onOpenChange={handleLoginOpenChange}>
        {trigger && <SheetTrigger render={trigger} />}

        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="border-b pb-5">
            <SheetTitle className="text-2xl font-semibold">
              Welcome back
            </SheetTitle>

            <SheetDescription>
              Log in to your account to continue exploring properties.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-1 flex-col overflow-y-auto"
          >
            <div className="flex-1 px-4 py-6">
              <FieldGroup>
                {/* =========================================
                    EMAIL
                ========================================= */}

                <Field data-invalid={touched.email && Boolean(errors.email)}>
                  <FieldLabel htmlFor="login-email">Email address</FieldLabel>

                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    onBlur={() => handleBlur("email")}
                    aria-invalid={touched.email && Boolean(errors.email)}
                    placeholder="john@example.com"
                    autoComplete="email"
                    disabled={isSubmitting || isGoogleLoading}
                  />

                  <FieldDescription>
                    Enter the email address associated with your account.
                  </FieldDescription>

                  {touched.email && errors.email && (
                    <FieldError errors={[errors.email]} />
                  )}
                </Field>

                {/* =========================================
                    PASSWORD
                ========================================= */}

                <Field
                  data-invalid={touched.password && Boolean(errors.password)}
                >
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>

                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                    aria-invalid={touched.password && Boolean(errors.password)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isSubmitting || isGoogleLoading}
                  />

                  <FieldDescription>
                    Your password must contain at least 8 characters.
                  </FieldDescription>

                  {touched.password && errors.password && (
                    <FieldError errors={[errors.password]} />
                  )}
                </Field>

                {/* =========================================
                    SERVER ERROR
                ========================================= */}

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
                  >
                    {submitError}
                  </div>
                )}

                {/* =========================================
                    LOGIN BUTTON
                ========================================= */}

                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting || isGoogleLoading}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>

                {/* =========================================
                    DIVIDER
                ========================================= */}

                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* =========================================
                    GOOGLE
                ========================================= */}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignin}
                  disabled={isSubmitting || isGoogleLoading}
                  className="w-full"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FcGoogle className="mr-2 h-5 w-5" />
                  )}

                  {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                </Button>

                {/* =========================================
                    REGISTRATION
                ========================================= */}

                <div className="pt-2 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={handleRegistration}
                    disabled={isSubmitting || isGoogleLoading}
                    className="font-semibold text-primary underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
                  >
                    Create an account
                  </button>
                </div>
              </FieldGroup>
            </div>

            {/* =========================================
                FOOTER
            ========================================= */}

            <SheetFooter className="border-t px-4 py-4">
              <SheetClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isSubmitting || isGoogleLoading}
                  >
                    Cancel
                  </Button>
                }
              />
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* ==================================================
          REGISTRATION SHEET
      ================================================== */}

      <RegistrationPage
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
      />
    </>
  );
}
