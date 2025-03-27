
"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "../../../../layout/tenantHeader";

export default function ViewPropTenant() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true); 
        setCurrentIndex(null);
        setDescription("");
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
            Approval_status:"Approved",
        }
    ];

    return (
        <Header>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-blue-850 text-center p-6">
                    PROPERTIES
                </h1>
                <div className="flex flex-col gap-6">
                    {propdetails.map((prop, index) => (
                        <Card key={index} className="p-4 shadow-md rounded-lg">
                            <CardContent>
                                <p className="text-blue-950">Sale Type: {prop.Sale_type}</p>
                                <p className="text-blue-950">Type: {prop.Type}</p>
                                <p className="text-blue-950">BHK Type: {prop.BHK_Type}</p>
                                <p className="text-blue-950">Furnishing: {prop.Furnishing}</p>
                                <p className="text-blue-950">Price: {prop.Price}</p>
                                <p className="text-blue-950">Advance Amount: {prop.Advance_amount}</p>
                                <p className="text-blue-950">Negotiability: {prop.Negotiability}</p>
                                <p className="text-blue-950">
                                    Two-Wheeler Parking: {prop.Two_wheeler_parking}
                                </p>
                                <p className="text-blue-950">
                                    Four-Wheeler Parking: {prop.Four_wheeler_parking}
                                </p>
                                <p className="text-blue-950">Bathrooms: {prop.Bathrooms}</p>
                                <p className="text-blue-950">Floor: {prop.Floor}</p>
                                <p className="text-blue-950">Lift Service: {prop.Lift_service}</p>

                                {!submitted ? (
                                    <div className="flex flex-col items-start gap-2 mt-4">
                                        <Button
                                            className="w-fit px-4 py-2 text-sm bg-green-700 hover:bg-green-700 text-white"
                                            onClick={() => setCurrentIndex(index === currentIndex ? null : index)}
                                        >
                                            Request to contact the owner
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-blue-950 mt-4">Owner Approval Status: {prop.Approval_status}</p>
                                )}

                                {currentIndex === index && !submitted && (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-4 p-4 border rounded-lg bg-gray-100"
                                    >
                                        <label className="block text-gray-700 mb-2">
                                            Send the owner a message:
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder=""
                                            className="w-full p-2 border rounded-md"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <Button
                                            type="submit"
                                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Header>
    );
}
