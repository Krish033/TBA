import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          token,
        },
        { withCredentials: true }
      );
    },

    onSuccess: () => {
      toast.success("Logged in!");
      router.push("/");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error))
        throw new Error(error?.response?.data?.message);

      throw error;
    },
  });
};
