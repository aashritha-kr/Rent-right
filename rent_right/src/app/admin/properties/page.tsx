"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "../../../../layout/tenantHeader";

export default function YourRentalsPage() {
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [propdetails, setpropdetails] = useState([
    {
      address: "flat 305, hasa apt",
      Type: "apt",
      Date_of_construction:"3",
      Facing:"e",
      Availability: "available",
      Description: "describe house",
      tenant_name: "ashj",
      Property_ID: 12,
    },
    {
      address: "flat 2110, med apt",
      Type: "apt",
      Date_of_construction:"3",
      Facing:"e",
      Availability: "available",
      Description: "describe house",
      tenant_name: "ashj",
      Property_ID: 13,
    },
  ]);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updated_details = [...propdetails];
    //save the prev state
    updated_details[index][e.target.name] = e.target.value;
    //dynamically update
    setpropdetails(updated_details);
    //set it 
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR PROPERTIES
      </h1>
      <div className="flex flex-col gap-6">
        {propdetails.map((prop, index) => (
          <Card key={prop.Property_ID} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address:  {prop.address}</CardTitle>

              <p className="text-blue-950">
                <strong>Type: </strong>
                {editStatus == index ? (
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
                <strong>Availability: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Availability"
                    value={prop.Availability}
                    
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Availability
                )}
              </p>
              <p className="text-blue-950">
                <strong>Description: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Description"
                    value={prop.Description}
                    
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Description
                )}
              </p>
              <p className="text-blue-950">
                <strong>Date of Construction: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Date_of_construction"
                    value={prop.Date_of_construction}
                    
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Date_of_construction
                )}
              </p>
              <p className="text-blue-950">
                <strong>Facing: </strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="Facing"
                    value={prop.Facing}
                    
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Facing
                )}
              </p>
              <p className="text-blue-950">
                <strong>Tenant Name:</strong>
                {editStatus == index ? (
                  <input
                    type="text"
                    name="tenant_name"
                    value={prop.tenant_name}
                    
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.tenant_name
                )}
              </p>
              <div className="flex flex-col items-start gap-2 mt-4">
              <Button
                onClick={() => {
                  setEditStatus(editStatus === index ? null : index);
                }}
              >
                {editStatus == index ? "Save" : "Edit property"}
              </Button>
                <Button className="w-fit px-4 py-2 text-sm my-4 bg-green-700">
                  View Property
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
