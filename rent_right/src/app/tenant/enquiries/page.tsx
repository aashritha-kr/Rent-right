"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

const propdetails = [
    {
        address: "ad",
        Ownername: "ans",
        OwnerNumber: "3234802",
        account_no: "sdasi",
        upi_id: "32948",
        Approval_status: "Approved",
        ifsc_code:"asd",
        bank_name:"asd",
        bank_branch:"ads",
        account_holder_name:"asd",
        
    },
    {
        address: "ad",
        Ownername: "ans",
        OwnerNumber: "323er4802",
        account_no: "sdasieqeq",
        upi_id: "32948",
        Approval_status: "rejected",
        ifsc_code:"asd",
        bank_name:"assd",
        bank_branch:"ads",
        account_holder_name:"asd",
    },
    {
        address: "ad",
        Ownername: "ans",
        OwnerNumber: "32sa34802",
        account_no: "sdasi",
        upi_id: "32948",
        Approval_status: "Pending",
        ifsc_code:"asd",
        bank_name:"asd",
        bank_branch:"ads",
        account_holder_name:"asd",
    }
];

export default function TenantEnquiriesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        YOUR OWNER APPROVAL REQUESTS
      </h1>
      <div className="flex flex-col gap-6">
        {propdetails.map((prop, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg ">
            <CardTitle >
            Address: {prop.address}
            </CardTitle>
            <CardContent>
              {/* <p className="text-blue-950">Address: {prop.address}</p> */}
              <Button className="w-fit px-4 py-2 text-sm my-4 bg-green-700">
                View Property
              </Button>
              <p>Approval status: {prop.Approval_status}</p>
              {prop.Approval_status === "Approved" && (
                <div>
                  <p>Owner Name: {prop.Ownername}</p>
                  <p>Owner Phone Number: {prop.OwnerNumber}</p>
                  <p>Owner Account No: {prop.account_no}</p>
                  <p>Owner UPI ID: {prop.upi_id}</p>
                  <p>Owner IFSC Code: {prop.ifsc_code}</p>
                  <p>Owner Bank Name: {prop.bank_name}</p>
                  <p>Owner Bank Branch: {prop.bank_branch}</p>
                  <p>Owner Account Holder Name: {prop.account_holder_name}</p>
                  {/* <p>Approval status: {prop.Approval_status}</p> */}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}