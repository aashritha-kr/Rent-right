"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {jwtDecode} from "jwt-decode";

export default function sprofile() {
    const [editstatus, seteditstatus] = useState(false);
    const [admindetails, setadmindetails] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        email: "",
        account_no:"",
        ifsc_code:"",
        bank_name:"",
        bank_branch:"",
        account_holder_name:"",
        upi_id:""
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
                    first_name: data.user.first_name,
                    middle_name: data.user.middle_name,
                    last_name: data.user.last_name,
                    phone: data.user.phone,
                    email: data.user.email,
                    account_no:data.adminDetails.account_no, 
                    ifsc_code:data.adminDetails.ifsc_code,
                    bank_name:data.adminDetails.bank_name,
                    bank_branch:data.adminDetails.bank_branch,
                    account_holder_name:data.adminDetails.account_holder_name,
                    upi_id:data.adminDetails.upi_id
                });
        
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        useEffect(() => {
            fetchProfile();
        }, []);

        const updateProfile = async () => {
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
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'User_ID': userId
                    },
                    body: JSON.stringify(admindetails)
                });
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };

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
                                value={admindetails.first_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.first_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Middle Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="middleName"
                                value={admindetails.middle_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.middle_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Last Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="lastName"
                                value={admindetails.last_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.last_name
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
                                value={admindetails.email}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.email
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account number:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccNo"
                                value={admindetails.account_no}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.account_no
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>IFSC Code:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="IFSCcode"
                                value={admindetails.ifsc_code}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.ifsc_code
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankName"
                                value={admindetails.bank_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.bank_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Bank Branch :</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="BankBranch"
                                value={admindetails.bank_branch}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.bank_branch
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Account holder name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="AccHolderName"
                                value={admindetails.account_holder_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.account_holder_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>UPI ID:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="UPIid"
                                value={admindetails.upi_id}
                                onChange={handleEdit}
                            />
                        ) : (
                            admindetails.upi_id
                        )}
                    </p>


                    <Button onClick={() => {
                        seteditstatus(!editstatus);
                        if(editstatus){
                            updateProfile();
                        }
                    }}>
                        {editstatus ? "Save" : "Edit"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
