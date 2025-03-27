"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function YourRequestsPage() {
  const [status, setStatus] = useState<{ [propertyIndex: number]: string }>({});

  const currentRequests = [
    {
      address: "a-406, has apt",
      Type: "Apartment",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "Assigned",
      created_at:"4:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
    {
      address: "a-406",
      Type: "Villa",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "In Progress",
      created_at:"34:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, propertyIndex: number) => {
    setStatus((prev) => ({
      ...prev,
      [propertyIndex]: e.target.value,
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center p-6">
        YOUR ACTIVE MAINTENANCE REQUESTS
      </h1>

      <div className="flex flex-col gap-6">
        {currentRequests.map((request, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address: {request.address}</CardTitle>
              <p className="text-gray-900 my-2">Type: {request.Type}</p>
              <p className="text-gray-900 my-2">Service: {request.Service}</p>
              <p className="text-gray-900 my-2">created_at: {request.created_at}</p>
              <p className="text-gray-900 mb-2">Description: {request.Description}</p>
              <p className="text-green-700 font-semibold bg-green-100 p-2 rounded-md">
                Status: {status[index] || request.Status}
              </p>
              <div className="mt-4">
                <label className="font-semibold">Change status:</label>
                <select
                  value={status[index]}
                  onChange={(e) => handleChange(e, index)}
                  className="p-2 border rounded-md w-full mt-2"
                >
                  <option value="">-</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress </option>
                  <option value="Resolved">Resolved</option>

                </select>
              </div >
              <p className="text-gray-900 my-3">Owner Name: {request.Ownername}</p>
              <p className="text-gray-900">Owner Phone Number: {request.Ownernumber}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
