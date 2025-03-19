"use client"
import UserAuthForm from "../../../../layout/signupform";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const [Role, setRole] = useState("Tenant");

  return (
    <>
      <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen py-10">
        <div className="mb-6 w-full max-w-md mx-auto">
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg border border-gray-300">
            <Button
              variant={(Role === "Tenant") ? "outline" : "secondary"}
              onClick={() => setRole("Tenant")}
              className="px-6 py-2 w-full rounded-l-lg text-gray-800 border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 focus:outline-none"
            >
              {"Tenant"}
            </Button>
            <Button
              variant={(Role === "Admin") ? "outline" : "secondary"}
              onClick={() => setRole("Admin")}
              className="px-6 py-2 w-full rounded-l-lg text-gray-800 border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 focus:outline-none"
            >
              {"Landlord"}
            </Button>
            <Button
              variant={(Role === "Staff") ? "outline" : "secondary"}
              onClick={() => setRole("Staff")}
              className="px-6 py-2 w-full rounded-l-lg text-gray-800 border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 focus:outline-none"
            >
              {"Staff"}
            </Button>
          </div>
        </div>
        <br />
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300">
          <UserAuthForm title={"SignUp as " + Role} role={Role}/>
        </div>
      </div>
    </>
  );
}