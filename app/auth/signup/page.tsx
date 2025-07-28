"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RegisterProps = {
  email: string;
  password: string;
  password_confirmation: string;
};

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<RegisterProps>();

  const submit = async (data: RegisterProps) => {
    if (data?.password != data?.password_confirmation) {
      setError("password_confirmation", {
        type: "manual",
        message: "Passwords Did not match",
      });
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/auth/signin");

      toast.success("User Registered");
      return true;
    } catch (error: any) {
      toast.error("Something went wrong, please try again!");
      reset({ password: "", password_confirmation: "" });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white p-6 rounded-xl border border-gray-200 shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign Up</h1>
        <p className="text-sm text-gray-500 mb-6">
          Welcome to TBA, please sign up to continue.
        </p>

        {/* Email */}
        <div className="space-y-1 mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", { required: "Email Field is Required" })}
            placeholder="bernard@hackwell.com"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1 mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            {...register("password", {
              required: "Password Field is Required",
            })}
            placeholder="********"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1 mb-4">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            {...register("password_confirmation", {
              required: "Password Confirmation Field is Required",
            })}
            placeholder="********"
          />
          {errors.password_confirmation && (
            <span className="text-xs text-red-500">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <Checkbox id="rememberme" />
          <Label htmlFor="rememberme" className="text-sm">
            Accept Terms and Conditions?
          </Label>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Link href={"/auth/signin"}>
            <Button type="button" variant="link" className="w-full sm:w-auto">
              Already Have An Account? <span className="underline">Login</span>
            </Button>
          </Link>
          <Button type="submit" className="w-full sm:w-auto">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
