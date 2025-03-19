"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YourRentalsPage() {
  const current_rentals = [
    {
      address: "a-406,has apt",
      type: "Apartment",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      Ownername: "abc",
      Ownernumber: "384720",
    },
    {
      address: "a-402,has",
      type: "Villa",
      startDate: "2022-06-01",
      endDate: "2023-05-31",
      Ownername: "dbc",
      Ownernumber: "824872",
    },
  ];

  const past_rentals = [
    {
      address: "a-406,has apt",
      type: "Apartment",
      startDate: "2000-02-06",
      endDate: "2000-12-31",
      Ownername: "abc",
      Ownernumber: "384720",
    },
    {
      address: "a-402,has",
      type: "Villa",
      startDate: "2000-06-01",
      endDate: "2000-05-31",
      Ownername: "dbc",
      Ownernumber: "824872",
    },
  ];

  const [current_index, setcurrent_index] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setcurrent_index(null);
    setDescription("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR RENTALS
      </h1>
      <h2 className="text-2xl font-semibold text-blue-750 p-4">Current Rentals</h2>
      <div className="flex flex-col gap-6">
        {current_rentals.map((rental, index) => (
          <Card key={rental.address} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address: {rental.address}</CardTitle>
              <p className="text-blue-950">Type: {rental.type}</p>
              <p className="text-blue-950">Start date of lease: {rental.startDate}</p>
              <p className="text-blue-950">End date of lease: {rental.endDate}</p>
              <p className="text-blue-950">Owner Name: {rental.Ownername}</p>
              <p className="text-blue-950">Owner Phone Number: {rental.Ownernumber}</p>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Button className="w-fit px-4 py-2 text-sm">View Property</Button>
                <Button
                  className="w-fit px-4 py-2 text-sm bg-green-700 hover:bg-green-700 text-white"
                  onClick={() => setcurrent_index(index === current_index ? null : index)}
                >
                  Raise a maintenance ticket
                </Button>
              </div>
              {current_index === index && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <label className="block text-gray-700 mb-2">
                    Describe the issue (max: 300 characters):
                  </label>
                  <Input
                    type="text"
                    placeholder=""
                    className="w-full p-2 border rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button type="submit" className="mt-2 bg-blue-800 text-white">
                    Submit Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold text-blue-750 p-4">Past Rentals</h2>
      <div className="flex flex-col gap-6">
        {past_rentals.map((rental) => (
          <Card key={rental.address} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">Address: {rental.address}</CardTitle>
              <p className="text-blue-950">Type: {rental.type}</p>
              <p className="text-blue-950">Start date of lease: {rental.startDate}</p>
              <p className="text-blue-950">End date of lease: {rental.endDate}</p>
              <p className="text-blue-950">Owner Name: {rental.Ownername}</p>
              <p className="text-blue-950">Owner Phone Number: {rental.Ownernumber}</p>
              <div className="flex flex-col items-start gap-2 mt-4">
                <Button className="w-fit px-4 py-2 text-sm">View Property</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
