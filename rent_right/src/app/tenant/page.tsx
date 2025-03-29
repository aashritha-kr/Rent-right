"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type PropertyDetails = {
  property_id: number;
  owner_id: number;
  date_of_construction: string;
  create_at: string;
  update_at: string;
  door_no: string;
  building_name: string;
  street_name: string;
  area: string;
  type: string;
  area_in_sqft: number;
  facing: string;
  availability: string;
  past_tenant_count: number;
  description: string;
};

const upcomingReminders = [
  {
    address: "flat-342,has apt",
    due_date: "23-2-21",
    Amount: "231",
    OwnerName: "Aashritha",
    OwnerNumber: "23812830",
  },
  {
    address: "flat-2,has apt",
    due_date: "23-2-25",
    Amount: "21",
    OwnerName: "Anusha",
    OwnerNumber: "34232",
  },
];

const pastReminders = [
  {
    address: "flat-2,has apt",
    due_date: "23-2-18",
    Amount: "1",
    OwnerName: "Aadqritha",
    OwnerNumber: "812830",
  },
  {
    address: "flat-2,has apt",
    due_date: "23-11-25",
    Amount: "21",
    OwnerName: "Anushdqa",
    OwnerNumber: "34232432",
  },
];

export default function TenantHome() {
  const [propdetails, setpropdetails] = useState<PropertyDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        let userId = "";
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.userId;
            console.log("User ID:", userId);
          } catch (error) {
            console.error("Invalid token", error);
          }
        }
        const response = await fetch("/api/properties", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            User_ID: userId,
          },
        });

        const data = await response.json();
        if (data.properties) {
          setpropdetails(data.properties);
        } else {
          console.error("No properties found in the response.");
        }
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, []);

return (
  <div className="flex h-screen">
    <Sheet>
      <SheetTrigger className="p-4 fixed z-50 top-4 left-4">
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side="left" className="p-6 w-64 bg-gray-100">
        <SheetTitle className="text-center">Rent Right</SheetTitle>
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Profile Pic" width={80} height={80} className="rounded-full" />
        </div>
        <nav className="flex flex-col gap-3">
          <Button variant="ghost" onClick={() => router.push("/tenant/rentals")} className="text-lg bg-blue-100 my-2">
            Rentals
          </Button>
          <Button variant="ghost" onClick={() => router.push("/tenant/maintenance")} className="text-lg bg-blue-100 my-2">
            Maintenance Requests
          </Button>
          <Button variant="ghost" onClick={() => router.push("/tenant/enquiries")} className="text-lg bg-blue-100 my-2">
            Approval Requests
          </Button>
          <Button variant="ghost" onClick={() => router.push("/tenant/profile")} className="text-lg bg-blue-100 my-2">
            Profile
          </Button>
          <Button variant="ghost" onClick={() => router.push("/logout")} className="text-lg bg-blue-100 my-2">
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>

    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center text-blue-900">View Properties</h1>
      <div className="grid grid-cols-1 gap-6 mt-6">
        {propdetails.map((prop) => (
          <Card key={prop.property_id} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">
                Address: {prop.door_no}, {prop.building_name}, {prop.street_name}, {prop.area}
              </CardTitle>
              <p><strong>Type: </strong>{prop.type}</p>
              <p><strong>Availability: </strong>{prop.availability}</p>
              <p><strong>Description: </strong>{prop.description}</p>
              <p><strong>Area (sqft): </strong>{prop.area_in_sqft}</p>
              <Button
                className="mt-4 bg-green-700"
                onClick={() => router.push(`/tenant/properties/${prop.property_id}`)}
              >
                View Property
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <div className="w-80 bg-gray-50 shadow-lg p-6 overflow-y-auto h-full">
      <Card className="p-4 shadow-md bg-pink-100">
        <CardContent>
          <CardTitle className="text-lg text-center">Your Reminders</CardTitle>
          <h2 className="text-md font-semibold mt-4 text-center">Upcoming Reminders</h2>
          {upcomingReminders.map((reminder, index) => (
            <Card key={index} className="mb-4 bg-white">
              <CardContent>
                <p>Address: {reminder.address}</p>
                <p>Due Date: {reminder.due_date}</p>
                <p>Amount: {reminder.Amount}</p>
                <p>Owner Name: {reminder.OwnerName}</p>
                <p>Owner Number: {reminder.OwnerNumber}</p>
              </CardContent>
            </Card>
          ))}
          <h2 className="text-md font-semibold mt-4 text-center">Past Due Reminders</h2>
          {pastReminders.map((reminder, index) => (
            <Card key={index} className="mb-4 bg-pink-50">
              <CardContent>
                <p>Address: {reminder.address}</p>
                <p>Due Date: {reminder.due_date}</p>
                <p>Amount: {reminder.Amount}</p>
                <p>Owner Name: {reminder.OwnerName}</p>
                <p>Owner Number: {reminder.OwnerNumber}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);
}