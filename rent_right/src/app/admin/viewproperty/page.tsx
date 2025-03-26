"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewPropTenant() {
  const [approvalStatus, setApprovalStatus] = useState<{
    [propertyIndex: number]: { [descriptionKey: string]: string };
  }>({});

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

  const propdetails = [
    {
      Sale_type: "buy",
      Type: "villa",
      BHK_Type: "3",
      Furnishing: "Fully furnished",
      Price: "100.23",
      Advance_amount: "54.4",
      Negotiability: "No",
      Two_wheeler_parking: "Yes",
      Four_wheeler_parking: "Yes",
      Bathrooms: 2,
      Floor: 3,
      Lift_service: "Yes",
      description1: "I am good",
      description2: "I am bad",
    },
    {
      Sale_type: "buy",
      Type: "villa",
      BHK_Type: "3",
      Furnishing: "Fully furnished",
      Price: "100.23",
      Advance_amount: "54.4",
      Negotiability: "No",
      Two_wheeler_parking: "Yes",
      Four_wheeler_parking: "Yes",
      Bathrooms: 2,
      Floor: 3,
      Lift_service: "Yes",
      description1: "I am good",
      description2: "I am bad",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-850 text-center p-6">
        PROPERTIES
      </h1>
      <div className="flex flex-col gap-6">
        {propdetails.map((prop, propertyIndex) => (
          <Card key={propertyIndex} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <p className="text-blue-950">Sale Type: {prop.Sale_type}</p>
              <p className="text-blue-950">Type: {prop.Type}</p>
              <p className="text-blue-950">BHK Type: {prop.BHK_Type}</p>
              <p className="text-blue-950">Furnishing: {prop.Furnishing}</p>
              <p className="text-blue-950">Price: {prop.Price}</p>
              <p className="text-blue-950">
                Advance Amount: {prop.Advance_amount}
              </p>
              <p className="text-blue-950">
                Negotiability: {prop.Negotiability}
              </p>
              <p className="text-blue-950">
                Two-Wheeler Parking: {prop.Two_wheeler_parking}
              </p>
              <p className="text-blue-950">
                Four-Wheeler Parking: {prop.Four_wheeler_parking}
              </p>
              <p className="text-blue-950">Bathrooms: {prop.Bathrooms}</p>
              <p className="text-blue-950">Floor: {prop.Floor}</p>
              <p className="text-blue-950">Lift Service: {prop.Lift_service}</p>

              <div className="mt-4 bg-gray-100 p-3 rounded-md">
                <div>
                  <p>
                    <strong>Description 1:</strong> {prop.description1}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Button
                      className="px-4 py-2 bg-green-700"
                      onClick={() =>
                        approvalStatus[propertyIndex]?.description1 !==
                          "Approved" &&
                        handleApprove(propertyIndex, "description1")
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      className="px-4 py-2 bg-red-700"
                      onClick={() =>
                        approvalStatus[propertyIndex]?.description1 !==
                          "Approved" &&
                        handleApprove(propertyIndex, "description1")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Description 2:</strong> {prop.description2}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Button
                      className="px-4 py-2 bg-green-700"
                      onClick={() =>
                        approvalStatus[propertyIndex]?.description1 !==
                          "Approved" &&
                        handleApprove(propertyIndex, "description1")
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      className="px-4 py-2 bg-red-700"
                      onClick={() =>
                        approvalStatus[propertyIndex]?.description1 !==
                          "Rejected" &&
                        handleReject(propertyIndex, "description1")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
