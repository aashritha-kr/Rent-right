"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const propdetails = [
  {
    address: "ad",
    tenant_description1: "good",
    tenant_description2: "bad",
  },
  {
    address: "ad",
    tenant_description1: "good",
    tenant_description2: "bad",
  },
  {
    address: "ad",
    tenant_description1: "good",
    tenant_description2: "bad",
  },
];

export default function AdminEnquiriesPage() {
  const [approvalStatus, setApprovalStatus] = useState<{
    [propertyIndex: number]: { [descriptionKey: string]: string };
  }>({});

const [finalTenant, setFinalTenant] = useState<{ [propertyIndex: number]: string }>({});


  const handleApprove = (propertyIndex: number, descriptionKey: string) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [propertyIndex]: {
        ...prev[propertyIndex],
        [descriptionKey]: "Approved",
      },
    }));
  };

  const handleReject = (propertyIndex: number, descriptionKey: string) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [propertyIndex]: {
        ...prev[propertyIndex],
        [descriptionKey]: "Rejected",
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>,propertyIndex:number) => {
    setFinalTenant((prev) => ({
        ...prev,
        [propertyIndex]: e.target.value,
      }));  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR PROPERTY APPROVAL REQUESTS
      </h1>
      <div className="flex flex-col gap-6">
        {propdetails.map((prop, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardTitle>Address: {prop.address}</CardTitle>
            <CardContent>
              <Button className="w-fit px-4 py-2 text-sm my-4 bg-blue-900">
                View Property
              </Button>

              <p>
                <strong>Tenant Request 1 :</strong> {prop.tenant_description1}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  className="px-4 py-2 bg-green-800"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description1 !== "Approved" &&
                    handleApprove(index, "tenant_description1")
                  }
                >
                  Approve
                </Button>
                <Button
                  className="px-4 py-2 bg-red-800"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description1 !== "Rejected" &&
                    handleReject(index, "tenant_description1")
                  }
                >
                  Reject
                </Button>
              </div>

              <p>
                <strong>Tenant Request 2:</strong> {prop.tenant_description2}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  className="px-4 py-2 bg-green-800"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description2 !== "Approved" &&
                    handleApprove(index, "tenant_description2")
                  }
                >
                  Approve
                </Button>
                <Button
                  className="px-4 py-2 bg-red-800"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description2 !== "Rejected" &&
                    handleReject(index, "tenant_description2")
                  }
                >
                  Reject
                </Button>
              </div>

              <div className="mt-4">
                <label className="font-semibold">Select a Tenant:</label>
                <select
                  value={finalTenant[index]}
                  onChange={(e) => handleChange(e, index)}

                  className="p-2 border rounded-md w-full mt-2"
                >
                  <option value="">-</option>
                  <option value="tenant1">Tenant 1</option>
                  <option value="tenant2">Tenant 2</option>

                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
