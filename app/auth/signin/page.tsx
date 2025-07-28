"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import {
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLogin } from "./_partials/useLogin";
import Link from "next/link";
import Image from "next/image";
import GoogleButton from "./_partials/GoogleButton";
import GithubButton from "./_partials/GithubButton";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>();

  const { mutate: store, isError } = useLogin();

  const submit = async (data: LoginProps) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (response?.user) {
        const token = await response.user.getIdToken();
        store(token);
      }

      return true;
    } catch (error: any) {
      toast.error(error.message);
      reset({ password: "" });
    }
  };

  const signinWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      if (response?.user) {
        const token = await response.user.getIdToken();
        store(token);
      }
    } catch (error: any) {
      toast.error(error.message);
      reset({ password: "" });
    }
  };

  const signinWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const response = await signInWithPopup(auth, provider);

      if (response?.user) {
        const token = await response.user.getIdToken();
        store(token);
      }
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential")
        return toast("Please login with google");

      toast.error(error.message);
      reset({ password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white p-6 rounded-xl border border-gray-200 shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
        <p className="text-sm text-gray-500 mb-6">
          Welcome to TBA, please sign in to continue.
        </p>

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

        <div className="space-y-1 mb-4">
          <div className="flex justify-between items-center">
            <Label>Password</Label>
            <Link href={"/auth/signup"}>
              <Button type="button" variant="link" className="w-full sm:w-auto">
                Forgot Password?
              </Button>
            </Link>
          </div>
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

        {/* Remember me */}
        <div className="flex items-center gap-2 mb-6">
          <Checkbox id="rememberme" />
          <Label htmlFor="rememberme" className="text-sm">
            Remember me?
          </Label>
        </div>

        {/* Submit */}
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <GoogleButton login={signinWithGoogle} />
            <GithubButton login={signinWithGithub} />
          </div>
          <div>
            <Link href={"/auth/signup"}>
              <Button type="button" variant="link" className="w-full sm:w-auto">
                <span className="underline">Register</span>
              </Button>
            </Link>

            <Button type="submit" className="w-full sm:w-auto">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
