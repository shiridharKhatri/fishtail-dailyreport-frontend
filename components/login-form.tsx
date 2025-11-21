"use client";

import type React from "react";
import dynamic from "next/dynamic";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import { useState, useRef, useEffect } from "react";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import BearCharacter from "./bear-character";
import GoogleSignButton from "./google-sign-button";
import axiosInstance from "../services/axiosInstance";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
export default function LoginForm() {
  let router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn } = useAuth();
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email) return;
      setStep("password");
    } finally {
      setIsLoading(false);
    }
  };

  const responseGoogle = async (res: TokenResponse | { code?: string }) => {
    try {
      if ("code" in res && res.code) {
        const code = res.code;

        const { data } = await axiosInstance.post(
          `/api/auth/employee/login`,
          {
            code,
          }
          // {
          //   withCredentials: true,
          //   headers: {
          //     'auth-token' : Cookies.get("employee_token")
          //   },
          // }
        );
        if (data.success) {
          toast.success("Login successful!");
          Cookies.set("employee_token", data.token, { expires:7 });
          router.push(data.redirect);
          window.location.reload();
        }else{
          toast.error(data.message);
        }
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleGoogleError = (error: unknown) => {
    console.log("Google OAuth Error:", error);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: handleGoogleError,
    flow: "auth-code",
  });
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Authenticating with:", email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setPassword("");
  };

  // useEffect(()=>{
  //   if(isLoggedIn){
  //     router.push()
  //   }
  // },[isLoggedIn])

  return (
    <>
      <div className="space-y-2">
        <div className="text-center mb-8 flex flex-col items-center">
                      <Image src={"/logo.png"} alt="Logo" width={150} height={150} className="mb-6"/>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your account to continue
          </p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 glow-green">

          {step === "password" && (
            <BearCharacter
              isPasswordVisible={showPassword}
              passwordValue={password}
              // inputRef={passwordInputRef}
            />
          )}

          {step === "email" && (
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={handleLogin}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLogin();
                  }
                }}
              >
                <GoogleSignButton />
              </div>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground block"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
              >
                {isLoading ? "Signing in..." : "Continue with email"}
              </button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground block"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                onClick={handleBackToEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-input hover:bg-input/80 text-foreground font-medium text-sm transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to email
              </button>
            </form>
          )}

          {/* <p className="text-xs text-muted-foreground text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </p> */}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          <div className="w-1 h-1 rounded-full bg-primary/50" />
          <p className="text-xs text-muted-foreground">
            Secured by enterprise-grade encryption
          </p>
          <div className="w-1 h-1 rounded-full bg-primary/50" />
        </div>
      </div>
      <Toaster richColors={true} />
    </>
  );
}
