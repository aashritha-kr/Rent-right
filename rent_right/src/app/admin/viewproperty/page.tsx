"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewPropAdmin() {
  const [approvalStatus, setApprovalStatus] = useState<{
    [propertyIndex: number]: { [descriptionKey: string]: string };
  }>({});
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [propdetails, setpropdetails] = useState([
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
      tenant_description1: "I am good",
      tenant_description2: "I am bad",
    },
    
  ]);

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

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updated_details = [...propdetails];
    updated_details[index] = {
      ...updated_details[index],
      [e.target.name]: e.target.value,
    };
    setpropdetails(updated_details);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-850 text-center p-6">
        PROPERTIES
      </h1>
      <div className="flex flex-col gap-6">
        {propdetails.map((prop, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <p className="text-blue-950">
                <strong>Sale Type: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Sale_type"
                    value={prop.Sale_type}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Sale_type
                )}
              </p>
              <p className="text-blue-950">
                <strong>Type: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Type"
                    value={prop.Type}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Type
                )}
              </p>
              <p className="text-blue-950">
              <strong>BHK Type: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="BHK_Type"
                    value={prop.BHK_Type}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.BHK_Type
                )}</p>
              <p className="text-blue-950">
              <strong>Furnishing: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Furnishing"
                    value={prop.Furnishing}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Furnishing
                )}</p>
              <p className="text-blue-950">
              <strong>Price: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Price"
                    value={prop.Price}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Price
                )}</p>

              <p className="text-blue-950">
              <strong>Advance Amount: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Advance_amount"
                    value={prop.Advance_amount}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Advance_amount
                )}</p>
              
              <p className="text-blue-950">
              <strong>Negotiability: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Negotiability"
                    value={prop.Negotiability}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Negotiability
                )}</p>
                <p className="text-blue-950">
              <strong>Two_wheeler_parking: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Two_wheeler_parking"
                    value={prop.Two_wheeler_parking}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Two_wheeler_parking
                )}</p>
<p className="text-blue-950">
              <strong>Four_wheeler_parking: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Four_wheeler_parking"
                    value={prop.Four_wheeler_parking}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Four_wheeler_parking
                )}</p>
                <p className="text-blue-950">
              <strong>Bathrooms: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Bathrooms"
                    value={prop.Bathrooms}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Bathrooms
                )}</p>
<p className="text-blue-950">
              <strong>Floor: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Floor"
                    value={prop.Floor}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Floor
                )}</p>
<p className="text-blue-950">
              <strong>Lift_service: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Lift_service"
                    value={prop.Lift_service}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Lift_service
                )}</p>
                

              <p>
                <strong>Tenant Request 1 :</strong> {prop.tenant_description1}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  className="px-4 py-2 bg-green-700"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description1 !== "Approved" &&
                    handleApprove(index, "tenant_description1")
                  }
                >
                  Approve
                </Button>
                <Button
                  className="px-4 py-2 bg-red-700"
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
                  className="px-4 py-2 bg-green-700"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description2 !== "Approved" &&
                    handleApprove(index, "tenant_description2")
                  }
                >
                  Approve
                </Button>
                <Button
                  className="px-4 py-2 bg-red-700"
                  onClick={() =>
                    approvalStatus[index]?.tenant_description2 !== "Rejected" &&
                    handleReject(index, "tenant_description2")
                  }
                >
                  Reject
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Button
                  onClick={() => {
                    setEditStatus(editStatus === index ? null : index);
                  }}
                >
                  {editStatus === index ? "Save" : "Edit property"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
