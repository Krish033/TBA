import { Button } from "@/components/ui/button";
import React from "react";

const GithubButton = ({ login }: { login: () => void }) => {
  return (
    <Button
      variant="ghost"
      onClick={login}
      type="button"
      className="flex items-center gap-3 px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-200 ease-in-out"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.386-1.333-1.754-1.333-1.754-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.996.107-.776.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.044.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.63-5.475 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    </Button>
  );
};

export default GithubButton;
