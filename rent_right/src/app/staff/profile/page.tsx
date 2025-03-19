"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function sprofile() {
    const [editstatus, seteditstatus] = useState(false);
    const [staffdetails, setstaffdetails] = useState({
        firstName: "Kuk",
        middleName: "Aashritha",
        lastName: "Reddy",
        phone: "9347457764",
        emailId: "a@gmail.com",
        AccNo:"3284209",
        service:"plumber",
        IFSCcode:"234082",
        BankName:"ICICI",
        BankBranch:"Kandi",
        AccHolderName:"aash",
        UPIid:"3427099"
    });

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setstaffdetails({ ...staffdetails, [e.target.name]: e.target.value });
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
                                value={staffdetails.firstName}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.firstName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Middle Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="middleName"
                                value={staffdetails.middleName}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.middleName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Last Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="lastName"
                                value={staffdetails.lastName}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.lastName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Phone:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="phone"
                                value={staffdetails.phone}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.phone
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Email:</strong>
                        {editstatus ? (
                            <Input
                                type="email"
                                name="emailId"
                                value={staffdetails.emailId}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.emailId
                        )}
                    </p>

                    <p className="text-gray-600">
                    <strong>Service: </strong>
                            {staffdetails.service}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account number:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccNo"
                                value={staffdetails.AccNo}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.AccNo
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>IFSC Code:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="IFSCcode"
                                value={staffdetails.IFSCcode}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.IFSCcode
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankName"
                                value={staffdetails.BankName}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.BankName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Branch :</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankBranch"
                                value={staffdetails.BankBranch}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.BankBranch
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account holder name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccHolderName"
                                value={staffdetails.AccHolderName}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.AccHolderName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>UPI ID:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="UPIid"
                                value={staffdetails.UPIid}
                                onChange={handleEdit}
                            />
                        ) : (
                            staffdetails.UPIid
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
