import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const GoogleButton = ({ login }: { login: () => void }) => {
  return (
    <Button
      variant="ghost"
      onClick={login}
      type="button"
      className="flex items-center gap-3 px-2 py-3 border border-gray-300  rounded-lg transition-all duration-200 ease-in-out"
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width={10}
        height={20}
        className="w-5 h-5"
      />
    </Button>
  );
};

export default GoogleButton;
