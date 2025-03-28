"use client";

import Image from "next/image";
export default function MyComponent() {
    return (
      <div
        className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900"
        style={{
          backgroundImage: "url('/s.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#BFDBFE" // Background color in case the image doesn’t cover the full screen
        }}
      >
        
      </div>
    );
  }
  