"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function tprofile() {
    const [editstatus, seteditstatus] = useState(false);
    const [tenantdetails, settenantdetails] = useState({
        firstName: "Kuk",
        middleName: "Aashritha",
        lastName: "Reddy",
        phone: "9347457764",
        emailId: "a@gmail.com",
    });

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        settenantdetails({ ...tenantdetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="text-center space-y-4">
                    <CardTitle className="text-2xl font-bold">{"Your profile"}</CardTitle>

                    <p className="text-gray-600">
                        <strong>First Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="firstName"
                                value={tenantdetails.firstName}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.firstName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Middle Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="middleName"
                                value={tenantdetails.middleName}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.middleName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Last Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="lastName"
                                value={tenantdetails.lastName}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.lastName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Phone:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="phone"
                                value={tenantdetails.phone}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.phone
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Email:</strong>
                        {editstatus ? (
                            <Input
                                type="email"
                                name="emailId"
                                value={tenantdetails.emailId}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.emailId
                        )}
                    </p>

                    <Button onClick={() => seteditstatus(!editstatus)}>
                        {editstatus ? "Save" : "Edit"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
