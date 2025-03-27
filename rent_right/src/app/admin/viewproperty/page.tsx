
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

  const [finalTenant, setFinalTenant] = useState<{ [propertyIndex: number]: string }>({});
  
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>,propertyIndex:number) => {
      setFinalTenant((prev) => ({
          ...prev,
          [propertyIndex]: e.target.value,
        }));  };

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
                {editStatus === index ? (
                  <input
                    type="text"
                    name="BHK_Type"
                    value={prop.BHK_Type}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.BHK_Type
                )}
              </p>
              <p className="text-blue-950">
                <strong>Furnishing: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Furnishing"
                    value={prop.Furnishing}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Furnishing
                )}
              </p>
              <p className="text-blue-950">
                <strong>Price: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Price"
                    value={prop.Price}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Price
                )}
              </p>
              <p className="text-blue-950">
                <strong>Advance Amount: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Advance_amount"
                    value={prop.Advance_amount}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Advance_amount
                )}
              </p>
              <p className="text-blue-950">
                <strong>Negotiability: </strong>
                {editStatus === index ? (
                  <input
                    type="text"
                    name="Negotiability"
                    value={prop.Negotiability}
                    onChange={(e) => handleEdit(e, index)}
                  />
                ) : (
                  prop.Negotiability
                )}
              </p>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Button
                  onClick={() => {
                    setEditStatus(editStatus === index ? null : index);
                  }}
                >
                  {editStatus === index ? "Save" : "Edit property"}
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

