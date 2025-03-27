"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

export default function ViewMaintenanceRequests() {
  const [Requests, setRequests] = useState([
    {
      request_id: "342",
      address: "a-406,has apt",
      type: "Apartment",
      created_at: "12:01",
      Tenantname: "abc",
      Tenantnumber: "384720",
      Status: "Assigned",
      Service: "Plumbing",
      Description: "leaky faucet",
      staffMember: "asv",
    },
    {
      request_id: "3242",
      address: "a-406",
      type: "Villa",
      created_at: "12:03",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "Pending",
      Service: "Plumbing",
      Description: "leaky faucet",
      staffMember: "",
    },
  ]);

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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR MAINTENANCE REQUESTS
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
  );
}
