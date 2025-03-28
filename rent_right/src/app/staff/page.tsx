"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from '../../../layout/staffHeader';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function StaffRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);  // Store the fetched staff requests
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (token) {
          try {
            const decodedToken = jwtDecode<any>(token);
            var userId = decodedToken.userId;
            console.log("User ID:", userId);

            const response = await fetch("/api/maintenance", {
              method: "GET",
              headers: {
                "User_ID": userId,
              },
            });
          }catch (error) {
            console.error("Invalid token", error);
          }
        }
        const response = await fetch("/api/maintenance", {
          method: "GET",
          headers: {
            "User_ID": userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch maintenance requests');
        }

        const data = await response.json();
        setRequests(data.staffRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <p>Loading requests...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Header>

              <Sheet>
                <SheetTrigger className="p-4">
                  <Menu size={30} />
                </SheetTrigger>
                <SheetContent side="left" className="p-6 w-70 bg-gray-100">
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
                  <nav className="flex flex-col gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/staff/allRequests")}
                      className="text-2xl bg-blue-100 mb-4 mt-8 hover:bg-blue-700:tsx
      Copy
      Edit
      "
                    >
                      All Requests
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/staff/profile")}
                      className="text-2xl bg-blue-100 my-4"
                    >
                      Profile
                    </Button>
                    
                    
                  </nav>
                </SheetContent>
              </Sheet>
      
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center p-6">
        Maintenance Requests
      </h1>

      <div className="flex flex-col gap-6">
        {requests.map((request, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Property: {request.Building_name}</CardTitle>
              <p className="text-gray-900 my-2">Service: {request.Service}</p>
              <p className="text-gray-900 my-2">Description: {request.Description}</p>
              <p className="text-gray-900 my-2">Created at: {new Date(request.Created_at).toLocaleString()}</p>
              <p className="text-green-700 font-semibold bg-green-100 p-2 rounded-md">
                Status: {request.Status}
              </p>
              <div className="mt-4">
                <p><strong>Tenant Name:</strong> {request.TenantName}</p>
                <p><strong>Tenant Phone:</strong> {request.TenantNumber}</p>
                <p><strong>Owner Name:</strong> {request.OwnerName}</p>
                <p><strong>Owner Phone:</strong> {request.OwnerPhone}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </Header>
  );
}
