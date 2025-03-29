"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

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

export default function YourRentalsPage() {
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [propdetails, setpropdetails] = useState<PropertyDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode<any>(token);
            const userId = decodedToken.userId;

            const response = await fetch("/api/properties", {
              method: "GET",
              headers: { User_ID: userId },
            });

            const data = await response.json();
            if (data.properties) {
              setpropdetails(data.properties);
            } else {
              console.error("No properties found in the response.");
            }
          } catch (error) {
            console.error("Invalid token", error);
          }
        } else {
          console.error("Token not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };
    fetchProperties();
  }, []);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updated_details: PropertyDetails[] = [...propdetails];
    updated_details[index][e.target.name as keyof PropertyDetails] =
      e.target.value;
    setpropdetails(updated_details);
  };

  const updateProperty = async (
    property_id: number,
    updated_details: PropertyDetails
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }

      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.userId;
      console.log("User ID:", userId);

      const response = await fetch("/api/properties", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          User_ID: userId || "",
        },
        body: JSON.stringify({ property_id, updated_details }),
      });

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      const data = await response.json();
      console.log("Property updated successfully:", data);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleAddProperty = () => {
    router.push("/admin/addproperty");
  };

  return (
    <div className="flex">
      <Sheet>
        <SheetTrigger className="p-4 fixed z-50 top-4 left-4">
          <Menu size={30} />
        </SheetTrigger>
        <SheetContent side="left" className="p-6 w-70 bg-gray-100">
          {/* <VisuallyHidden> */}
          <SheetTitle className="text-center">Rent Right</SheetTitle>
          {/* </VisuallyHidden> */}

          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Profile Pic"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <nav className="flex flex-col gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/properties")}
              className="text-2xl bg-blue-100 mb-4 mt-8 hover:bg-blue-700"
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/maintenance")}
              className="text-2xl bg-blue-100 my-4"
            >
              Maintenance Requests
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/enquiries")}
              className="text-2xl bg-blue-100 my-4"
            >
              Approval Requests
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/profile")}
              className="text-2xl bg-blue-100 my-4"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-2xl bg-blue-100 my-4"
            >
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="p-8 flex-1  bg-gradient-to-b from-blue-50 to-blue-300 min-h-screen">

        <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
          Your Properties
        </h1>
        <div className="flex flex-col gap-6">
          {propdetails.map((prop, index) => (
            <Card key={prop.property_id} className="p-4 shadow-md rounded-lg">
              <CardContent>
                <CardTitle className="text-lg">
                  Address: {prop.door_no}, {prop.building_name},{" "}
                  {prop.street_name}, {prop.area}
                </CardTitle>
                <p className="text-blue-950">
                  <strong>Type: </strong>
                  {editStatus === index ? (
                    <Input
                      type="text"
                      name="type"
                      value={prop.type}
                      onChange={(e) => handleEdit(e, index)}
                    />
                  ) : (
                    prop.type
                  )}
                </p>
                <p className="text-blue-950">
                  <strong>Availability: </strong>
                  {editStatus === index ? (
                    <Input
                      type="text"
                      name="availability"
                      value={prop.availability}
                      onChange={(e) => handleEdit(e, index)}
                    />
                  ) : (
                    prop.availability
                  )}
                </p>
                <p className="text-blue-950">
                  <strong>Description: </strong>
                  {editStatus === index ? (
                    <Input
                      type="text"
                      name="description"
                      value={prop.description}
                      onChange={(e) => handleEdit(e, index)}
                    />
                  ) : (
                    prop.description
                  )}
                </p>
                <p className="text-blue-950">
                  <strong>Area (sqft): </strong>
                  {prop.area_in_sqft}
                </p>
                <div className="flex flex-col items-start gap-2 mt-4">
                  <Button
                    onClick={() => {
                      setEditStatus(editStatus === index ? null : index);
                      if (editStatus === index) {
                        updateProperty(prop.property_id, prop);
                      }
                    }}
                  >
                    {editStatus === index ? "Save" : "Edit Property"}
                  </Button>
                  <Button
                    className="w-fit px-4 py-2 text-sm my-4 bg-green-700"
                    onClick={() =>
                      router.push(`/admin/properties/${prop.property_id}`)
                    }
                  >
                    View Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-80 fixed right-0 top-0 h-full p-6 overflow-y-auto bg-gray-50 shadow-lg">
        <Card className="p-4 shadow-md bg-pink-100">
          <CardContent>
            <CardTitle className="text-lg text-center">
              Your Reminders
            </CardTitle>
            <h2 className="text-md font-semibold mt-4 text-center">
              Upcoming Reminders
            </h2>
            <div className="mt-2 text-blue-950">
              {upcomingReminders.map((reminder, index) => (
                <Card key={index} className="mb-4 ">
                  <CardContent>
                    <p>Address: {reminder.address}</p>
                    <p>Due Date: {reminder.due_date}</p>
                    <p>Amount: {reminder.Amount}</p>
                    <p>Owner Name: {reminder.OwnerName}</p>
                    <p>Owner Number: {reminder.OwnerNumber}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <h2 className="text-md font-semibold mt-4 text-center">
              Past Due Reminders
            </h2>
            <div className="mt-2 text-blue-950">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
