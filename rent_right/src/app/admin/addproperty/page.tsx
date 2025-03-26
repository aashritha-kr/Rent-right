"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddProp() {
  const [property, setproperty] = useState({
    address: "",
    Type: "",
    Availability: "",
    Description: "",
    tenant_name: "",
    Property_ID: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setproperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-seminbold my-3">Add property details</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <div className="mb-4">
              <label font-semibold>Address</label>
              <input
                type="text"
                name="address"
                value={property.address}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div>
              <label font-semibold>Type</label>
              <input
                type="text"
                name="Type"
                value={property.Type}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div>
              <label font-semibold>Availability</label>
              <input
                type="text"
                name="Availability"
                value={property.Availability}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>

            <div>
              <label font-semibold>Description</label>
              <input
                type="text"
                name="Description"
                value={property.Description}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>

            <div>
              <label font-semibold>tenant_name</label>
              <input
                type="text"
                name="tenant_name"
                value={property.tenant_name}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div>
              <label font-semibold>Property_ID</label>
              <input
                type="text"
                name="Property_ID"
                value={property.Property_ID}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <button type="submit" className="bg-green-700 text-2xl text-white my-3 rounded"> Save</button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}