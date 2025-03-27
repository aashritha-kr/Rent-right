"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Header from "../../../../layout/adminHeader";
import {jwtDecode} from "jwt-decode";

export default function ViewMaintenanceRequests() {
  const [Requests, setRequests] = useState<Request[]>([]);
  interface Request {
    request_id: number;
    Service: string;
    Description: string;
    created_at: string;
    Tenantname: string;
    Tenantnumber: string;
    Status: string;
    staffMember: string;
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        try {
            const decodedToken = jwtDecode(token);
            var userId = decodedToken.userId;
            console.log("User ID:", userId);
        } catch (error) {
            console.error("Invalid token", error);
        }
        const response = await fetch("/api/maintenance", {
          method: "GET",
          headers: {
            "User_ID": userId,
          },
        });
        const data = await response.json();
        setRequests(data.adminRequests);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    propertyIndex: number
  ) => {
    setRequests((prev) =>
      prev.map((request, idx) =>
        idx === propertyIndex
          ? { ...request, staffMember: e.target.value, Status: "Assigned" }
          : request
      )
    );
  };

  return (
    <Header>
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        Your Maintenance Requests
      </h1>

      <div className="flex flex-col gap-6">
        {Requests.map((request, index) => (
          <Card key={request.request_id} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <p className="text-black-950">Service: {request.Service}</p>
              <p className="text-black-950">
                Description: {request.Description}
              </p>
              <p className="text-black-950">
                Request created at: {request.created_at}
              </p>

              <p className="text-black-950">
                Tenant Name: {request.Tenantname}
              </p>
              <p className="text-black-950">
                Tenant Phone Number: {request.Tenantnumber}
              </p>

              {request.Status === "Pending" ? (
                <div>
                  <p className="text-green-950 font-semibold bg-green-50">
                    Status: Pending
                  </p>
                  <div className="mt-4">
                    <label className="font-semibold">
                      Select a Staff Member:
                    </label>
                    <select
                      value={request.staffMember}
                      onChange={(e) => handleChange(e, index)}
                      className="p-2 border rounded-md w-full mt-2"
                    >
                      <option value="">-</option>
                      <option value="Raj">Raj</option>
                      <option value="Ram">Ram</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-green-950 font-semibold bg-green-50">
                    Status: {request.Status}
                  </p>
                  <p>Staff Member: {request.staffMember}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </Header>
  );
}
