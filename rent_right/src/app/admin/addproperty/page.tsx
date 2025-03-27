"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Header from "../../../../layout/tenantHeader";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

export default function AddProp() {
  const [property, setProperty] = useState({
    Door_no: "",
    Date_of_construction:"",
    Building_name:"",
    Street_name:"",
    Area:"",
    Area_in_sqft:"",
    Facing:"",
    Type: "",
    Description: "",
    images: [] as File[],
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { value: string; name: string }) => {
    if (e && 'value' in e) {
      setProperty({ ...property, [e.name]: e.value });
    } else {
      setProperty({ ...property, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProperty({
        ...property,
        images: Array.from(e.target.files), // Convert FileList to array
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      if(!token){
        console.error("Token not found");
        return;
      }
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.userId;
      const formData = new FormData();
      formData.append("Door_no", property.Door_no);
      formData.append("Date_of_construction", property.Date_of_construction);
      formData.append("Building_name", property.Building_name);
      formData.append("Street_name", property.Street_name);
      formData.append("Area", property.Area);
      formData.append("Area_in_sqft", property.Area_in_sqft);
      formData.append("Facing", property.Facing);
      formData.append("Type", property.Type);
      formData.append("Description", property.Description);
      
      property.images.forEach((file, index) => {
        formData.append(`images`, file);
      });
      formData.forEach((value, key) => {
        console.log(key, value);
    });
      const res=await fetch("/api/properties", {
        method: "POST",
        headers: {
          "User_ID": userId
        },
        body: formData,
      });
      if(!res.ok){
        console.error("Error adding property");
      }
      // router.push("/admin/properties");
    }catch(error){
      console.error("Error adding property:", error);
    }
  };

  return (
    <Header>
      <div className="p-6">
        <h1 className="text-3xl text-center font-semibold my-3">Add property details</h1>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
            <div className="mb-4">
                <label className="font-semibold">Date of Construction</label>
                <Input
                  type="date"
                  name="Date_of_construction"
                  value={property.Date_of_construction}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Door_no</label>
                <Input
                  type="text"
                  name="Door_no"
                  value={property.Door_no}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Building_name</label>
                <Input
                  type="text"
                  name="Building_name"
                  value={property.Building_name}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Street_name</label>
                <Input
                  type="text"
                  name="Street_name"
                  value={property.Street_name}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Area</label>
                <Input
                  type="text"
                  name="Area"
                  value={property.Area}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Area_in_sqft</label>
                <Input
                  type="number"
                  name="Area_in_sqft"
                  value={property.Area_in_sqft}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Facing</label>
                <Select name="Facing" value={property.Facing} onValueChange={(value) => handleChange({ name: "Facing", value })}>
                  <SelectTrigger className="border p-2 w-full md:w-auto">
                    <SelectValue placeholder="Facing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                    <SelectItem value="North-East">North-East</SelectItem>
                    <SelectItem value="North-West">North-West</SelectItem> 
                    <SelectItem value="South-East">South-East</SelectItem>
                    <SelectItem value="South-West">South-West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-semibold">Type</label>
                <Select name="Type" value={property.Type} onValueChange={(value) => handleChange({ name: "Type", value })}>
                  <SelectTrigger className="border p-2 w-full md:w-auto">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commercial Building">Commercial Building</SelectItem>
                    <SelectItem value="Residential Building">Residential Building</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="font-semibold">Description</label>
                <Input
                  type="text"
                  name="Description"
                  value={property.Description}
                  onChange={handleChange}
                  className="border p-2 w-full "
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Upload Property Images</label>
                <Input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  className="border p-2 w-full "
                />
              </div>
              <Button type="submit" className="bg-blue-600 text-2xl text-white my-3 rounded"> Save</Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </Header>
  );
}