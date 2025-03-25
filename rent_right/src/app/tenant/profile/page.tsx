"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {jwtDecode} from "jwt-decode";

export default function tprofile() {
    const [editstatus, seteditstatus] = useState(false);
    const [tenantdetails, settenantdetails] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        email: "",
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
            settenantdetails({
                first_name: data.user.first_name,
                middle_name: data.user.middle_name,
                last_name: data.user.last_name,
                phone: data.user.phone,
                email: data.user.email,
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
                    body: JSON.stringify(tenantdetails)
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
                                value={tenantdetails.first_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.first_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Middle Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="middleName"
                                value={tenantdetails.middle_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.middle_name
                        )}
                    </p>

                    <p className="text-gray-600">
                        <strong>Last Name:</strong>
                        {editstatus ? (
                            <Input
                                type="text"
                                name="lastName"
                                value={tenantdetails.last_name}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.last_name
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
                                value={tenantdetails.email}
                                onChange={handleEdit}
                            />
                        ) : (
                            tenantdetails.email
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
