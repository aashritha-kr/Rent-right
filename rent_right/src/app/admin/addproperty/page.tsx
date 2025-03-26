"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddProp() {
  const [property, setproperty] = useState({
    Door_no: "",
    Date_of_construction:"",
    Building_name:"",
    Street_name:"",
    Area:"",
    Area_in_sqft:"",
    Facing:"",
    Type: "",
    Description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setproperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-semibold my-3">Add property details</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
          <div className="mb-4">
              <label font-semibold>Date of Construction</label>
              <input
                type="text"
                name=""
                value={property.Date_of_construction}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Door_no</label>
              <input
                type="text"
                name="Door_no"
                value={property.Door_no}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Building_name</label>
              <input
                type="text"
                name="Building_name"
                value={property.Building_name}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Street_name</label>
              <input
                type="text"
                name="Street_name"
                value={property.Street_name}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Area</label>
              <input
                type="text"
                name="Area"
                value={property.Area}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Area_in_sqft</label>
              <input
                type="text"
                name="Area_in_sqft"
                value={property.Area_in_sqft}
                onChange={handleChange}
                className="border p-2 w-full "
              />
            </div>
            <div className="mb-4">
              <label font-semibold>Facing</label>
              <input
                type="text"
                name="Facing"
                value={property.Facing}
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
              <label font-semibold>Description</label>
              <input
                type="text"
                name="Description"
                value={property.Description}
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