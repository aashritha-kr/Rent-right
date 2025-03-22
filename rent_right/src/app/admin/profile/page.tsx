"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {jwtDecode} from "jwt-decode";

export default function sprofile() {
    const [editstatus, seteditstatus] = useState(false);
    const [admindetails, setadmindetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        emailId: "",
        AccNo:"",
        IFSCcode:"",
        BankName:"",
        BankBranch:"",
        AccHolderName:"",
        UPIid:""
    });

    const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        var userId = decodedToken.userId;
                        console.log("User ID:", userId);
                    } catch (error) {
                        console.error("Invalid token", error);
                    }
                }
                const response = await fetch('/api/profile', { method: 'GET' , headers:{'User_ID': userId}});
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
        
                const data = await response.json();
                setadmindetails({
                    firstName: data.user.first_name,
                    middleName: data.user.middle_name,
                    lastName: data.user.last_name,
                    phone: data.user.phone,
                    emailId: data.user.email,
                    AccNo:data.adminDetails.account_no, 
                    IFSCcode:data.adminDetails.ifsc_code,
                    BankName:data.adminDetails.bank_name,
                    BankBranch:data.adminDetails.bank_branch,
                    AccHolderName:data.adminDetails.account_holder_name,
                    UPIid:data.adminDetails.upi_id
                });
        
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        useEffect(() => {
            fetchProfile();
        }, []);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setadmindetails({ ...admindetails, [e.target.name]: e.target.value });
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
                                value={admindetails.firstName}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.firstName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Middle Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="middleName"
                                value={admindetails.middleName}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.middleName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Last Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="lastName"
                                value={admindetails.lastName}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.lastName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Phone:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="phone"
                                value={admindetails.phone}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.phone
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Email:</strong>
                        {editstatus ? (
                            <Input
                                type="email"
                                name="emailId"
                                value={admindetails.emailId}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.emailId
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account number:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccNo"
                                value={admindetails.AccNo}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.AccNo
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>IFSC Code:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="IFSCcode"
                                value={admindetails.IFSCcode}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.IFSCcode
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankName"
                                value={admindetails.BankName}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.BankName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Branch :</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankBranch"
                                value={admindetails.BankBranch}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.BankBranch
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account holder name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccHolderName"
                                value={admindetails.AccHolderName}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.AccHolderName
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>UPI ID:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="UPIid"
                                value={admindetails.UPIid}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.UPIid
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
