"use client";

import { useState } from "react";
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
import { FcGoogle } from "react-icons/fc";

import { RegistrationPage } from "./Registration";

export function LoginPage({ trigger }) {
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

  // ------------------------------------------
  // Validation
  // ------------------------------------------

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    return "";
  };

  // ------------------------------------------
  // Current errors
  // ------------------------------------------

  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  const isFormValid =
    !errors.email && !errors.password && formData.email && formData.password;

  // ------------------------------------------
  // Handle input changes
  // ------------------------------------------

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ------------------------------------------
  // Handle blur
  // ------------------------------------------

  const handleBlur = (field) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  // ------------------------------------------
  // Handle login
  // ------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show all validation errors
    setTouched({
      email: true,
      password: true,
    });

    if (!isFormValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      console.log("Login data:", formData);

      // ------------------------------------------
      // API request goes here
      // ------------------------------------------

      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Login failed");
      // }

      // ------------------------------------------
      // Successful login
      // ------------------------------------------

      setFormData({
        email: "",
        password: "",
      });

      setTouched({
        email: false,
        password: false,
      });

      setLoginOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignin = () => {
    console.log("Google button is clicked ")
  }
  // ------------------------------------------
  // Open registration
  // ------------------------------------------

  const handleRegistration = () => {
    setLoginOpen(false);

    setTimeout(() => {
      setRegistrationOpen(true);
    }, 150);
  };

  return (
    <>
      {/* Login Sheet */}
      <Sheet open={loginOpen} onOpenChange={setLoginOpen}>
        {trigger && <SheetTrigger render={trigger} />}

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Log in</SheetTitle>

            <SheetDescription>
              Enter your account information to continue.
            </SheetDescription>
          </SheetHeader>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1  gap-6 px-4 pb-6"
          >
            <FieldGroup>
              {/* Email */}
              <Field data-invalid={touched.email && !!errors.email}>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>

                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  onBlur={() => handleBlur("email")}
                  aria-invalid={touched.email && !!errors.email}
                  placeholder="john@example.com"
                  autoComplete="email"
                />

                <FieldDescription>
                  Enter the email associated with your account.
                </FieldDescription>

                {touched.email && errors.email && (
                  <FieldError errors={[errors.email]} />
                )}
              </Field>

              {/* Password */}
              <Field data-invalid={touched.password && !!errors.password}>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>

                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  aria-invalid={touched.password && !!errors.password}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />

                <FieldDescription>
                  Your password must be at least 8 characters.
                </FieldDescription>

                {touched.password && errors.password && (
                  <FieldError errors={[errors.password]} />
                )}
              </Field>

              {/* Registration */}
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={handleRegistration}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Create one
                </button>
              </div>
              <div>
                <Button onClick={handleGoogleSignin} variant="outline" className="w-full py-2 "><FcGoogle /> <span>Signin with Google</span></Button>
              </div>
            </FieldGroup>

            {/* Actions */}
            <SheetFooter className='px-0 '>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>

              <SheetClose
                render={
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                }
              />
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Registration Sheet */}
      <RegistrationPage
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
      />
    </>
  );
}
