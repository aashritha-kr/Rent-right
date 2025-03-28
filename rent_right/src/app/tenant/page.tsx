"use client";
import Header from "../../../layout/tenantHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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
  { address:"flat-342,has apt",
    due_date:"23-2-21",
    Amount:"231",
    OwnerName:"Aashritha",
    OwnerNumber:"23812830",
  },
  { address:"flat-2,has apt",
    due_date:"23-2-25",
    Amount:"21",
    OwnerName:"Anusha",
    OwnerNumber:"34232",
  },
];

const pastReminders = [
  { address:"flat-2,has apt",
    due_date:"23-2-18",
    Amount:"1",
    OwnerName:"Aadqritha",
    OwnerNumber:"812830",
  },
  { address:"flat-2,has apt",
    due_date:"23-11-25",
    Amount:"21",
    OwnerName:"Anushdqa",
    OwnerNumber:"34232432",
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
    <Header>
      <div className="p-8 flex gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
            View Properties
          </h1>
          <div className="flex flex-col gap-6">
            {propdetails.map((prop) => (
              <Card key={prop.property_id} className="p-4 shadow-md rounded-lg">
                <CardContent>
                  <CardTitle className="text-lg">
                    Address: {prop.door_no}, {prop.building_name}, {prop.street_name}, {prop.area}
                  </CardTitle>
                  <p className="text-blue-950">
                    <strong>Type: </strong>
                    {prop.type}
                  </p>
                  <p className="text-blue-950">
                    <strong>Availability: </strong>
                    {prop.availability}
                  </p>
                  <p className="text-blue-950">
                    <strong>Description: </strong>
                    {prop.description}
                  </p>
                  <p className="text-blue-950">
                    <strong>Area (sqft): </strong>
                    {prop.area_in_sqft}
                  </p>
                  <div className="flex flex-col items-start gap-2 mt-4">
                    <Button
                      className="w-fit px-4 py-2 text-sm my-4 bg-green-700"
                      onClick={() => router.push(`/properties/${prop.property_id}`)}
                    >
                      View Property
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-1/4">
          <Card className="p-4 shadow-md lg bg-pink-100">
            <CardContent>
              <CardTitle className="text-lg text-center">Your Reminders</CardTitle>
              <h2 className="text-md font-semibold mt-4 text-center">Upcoming Reminders</h2>
              <div className="mt-2 text-blue-950">
                {upcomingReminders.map((reminder,index) => (
                  <Card key={index} className="mb-4" bg-blue-100>
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
              <h2 className="text-md font-semibold mt-4 text-center">Past Due Reminders</h2>

              <div className="mt-2 text-blue-950">
                {upcomingReminders.map((reminder,index) => (
                  <Card key={index} className="mb-4 bg-pink-50" >
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
    </Header>
  );
}
