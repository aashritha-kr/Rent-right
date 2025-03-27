"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

export default function YourRequestsPage() {
  interface MaintenanceRequest {
    request_id: string;
    building_name: string;
    status: string;
    created_at: string;
    Ownername: string;
    Ownernumber: string;
    Status: string;
    tenant_name: string;
    tenant_number: string;
    Service: string;
    Description: string;
  }

  const [currentRequests, setCurrentRequests] = useState<MaintenanceRequest[]>([]);
  const [pastRequests, setPastRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        console.log("User ID:", decodedToken.userId);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchRequests = async () => {
        try {
          const response = await fetch("/api/maintenance", {
            method: "GET",
            headers: {
              "User_ID": userId,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setCurrentRequests(data.currentRequests || []);
          setPastRequests(data.pastRequests || []);
        } catch (error) {
          console.error("Error fetching requests:", error);
          setError("Failed to load requests");
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();
    }
  }, [userId]);

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/maintenance/update-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await response.json();

      setCurrentRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.request_id === updatedRequest.request_id
            ? { ...request, status: updatedRequest.status }
            : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR MAINTENANCE REQUESTS
      </h1>

      <h2 className="text-2xl font-semibold text-blue-750 p-4 bg-blue-100">
        Current Maintenance Requests
      </h2>
      <div className="flex flex-col gap-6">
        {currentRequests.map((request) => (
          <Card key={request.request_id} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address: {request.building_name}</CardTitle>
              <p className="text-black-950">Service: {request.Service}</p>
              <p className="text-black-950">Description: {request.Description}</p>
              <p className="text-black-950">Request created at: {request.created_at}</p>
              <p className="text-green-950 font-semibold bg-green-50">Status: {request.Status}</p>
              <p className="text-black-950">Staff Member: {request.tenant_name}</p>
              <p className="text-black-950">Staff Member Phone Number: {request.tenant_number}</p>
              <p className="text-black-950">Owner Name: {request.Ownername}</p>
              <p className="text-black-950">Owner Phone Number: {request.Ownernumber}</p>
              <p className="text-black-950">Status: {request.status}</p>

              {request.Status === "Pending" && (
                <div className="mt-4">
                  <Button
                    onClick={() => handleStatusUpdate(request.request_id, "Ongoing")}
                    className="bg-blue-500 text-white mr-4"
                  >
                    Mark as Ongoing
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(request.request_id, "Resolved")}
                    className="bg-green-500 text-white"
                  >
                    Mark as Resolved
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-blue-750 p-4 bg-blue-100 mt-4">
        Past Maintenance Requests
      </h2>
      <div className="flex flex-col gap-6">
        {pastRequests.map((request) => (
          <Card key={request.request_id} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address: {request.building_name}</CardTitle>
              <p className="text-black-950">Service: {request.Service}</p>
              <p className="text-black-950">Description: {request.Description}</p>
              <p className="text-black-950">Request created at: {request.created_at}</p>
              <p className="text-green-950 font-semibold bg-green-50">Status: {request.Status}</p>
              <p className="text-black-950">Staff Member: {request.tenant_name}</p>
              <p className="text-black-950">Staff Member Phone Number: {request.tenant_number}</p>
              <p className="text-black-950">Owner Name: {request.Ownername}</p>
              <p className="text-black-950">Owner Phone Number: {request.Ownernumber}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
