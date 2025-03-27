// "use client";

// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function AllRequestsPage() {

//   const currentRequests = [
//     {
//         address: "a-406",
//         Type: "Villa",
//         Ownername: "abc",
//         Ownernumber: "384720",
//         Status: "In Progress",
//         created_at:"34:23",
//         Service: "Plumbing",
//         Description: "Leaky faucet",
//     },
//     {

//         address: "a-406",
//         Type: "Villa",
//         Ownername: "abc",
//         Ownernumber: "384720",
//         Status: "In Progress",
//         created_at:"34:23",
//         Service: "Plumbing",
//         Description: "Leaky faucet",
//     },
//   ];

//   const pastRequests = [
//     {
//       address: "a-406, has apt",
//       type: "Apartment",
//       Ownername: "abc",
//       Ownernumber: "384720",
//       Status: "Resolved",
//       maintenance_id: "123",
//       Service: "Plumbing",
//       Description: "Leaky faucet",
//     },
//     {
//       address: "a-406",
//       type: "Villa",
//       Ownername: "abc",
//       Ownernumber: "384720",
//       Status: "Resolved",
//       maintenance_id: "124",
//       Service: "Plumbing",
//       Description: "Leaky faucet",
//     },
//   ];

//     return (
//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
//             ALL REQUESTS
//           </h1>
//           <h2 className="text-2xl font-semibold text-blue-750 p-4">Active Requests</h2>
//           <div className="flex flex-col gap-6">
//           {currentRequests.map((request, index) => (
//                     <Card key={index} className="p-4 shadow-md rounded-lg">
//                       <CardContent>
//                         <CardTitle className="text-lg">Address: {request.address}</CardTitle>
//                         <p className="text-gray-900 my-2">Type: {request.Type}</p>
//                         <p className="text-gray-900 my-2">Service: {request.Service}</p>
//                         <p className="text-gray-900 my-2">created_at: {request.created_at}</p>
//                         <p className="text-gray-900 mb-2">Description: {request.Description}</p>

//          <h2 className="text-2xl font-semibold text-blue-750 p-4">Past Requests</h2>
//          <div className="flex flex-col gap-6">
//           {pastRequests.map((request, index) => (
//                     <Card key={index} className="p-4 shadow-md rounded-lg">
//                       <CardContent>
//                         <CardTitle className="text-lg">Address: {request.address}</CardTitle>
//                         <p className="text-gray-900 my-2">Type: {request.Type}</p>
//                         <p className="text-gray-900 my-2">Service: {request.Service}</p>
//                         <p className="text-gray-900 my-2">created_at: {request.created_at}</p>
//                         <p className="text-gray-900 mb-2">Description: {request.Description}</p>

//                           </CardContent>

//                           </Card>
"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AllRequestsPage() {
  const currentRequests = [
    {
      address: "a-406",
      Type: "Villa",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "In Progress",
      created_at: "34:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
    {
      address: "a-406",
      Type: "Villa",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "In Progress",
      created_at: "34:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
  ];

  const pastRequests = [
    {
      address: "a-406",
      Type: "Villa",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "Resolved",
      created_at: "34:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
    {
      address: "a-406",
      Type: "Villa",
      Ownername: "abc",
      Ownernumber: "384720",
      Status: "Resolved",
      created_at: "34:23",
      Service: "Plumbing",
      Description: "Leaky faucet",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-750 text-center p-6">
        ALL REQUESTS
      </h1>

      <h2 className="text-2xl font-semibold text-blue-750 p-4  bg-blue-200">
        Active Requests
      </h2>
      <div className="flex flex-col gap-6">
        {currentRequests.map((request, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">
                Address: {request.address}
              </CardTitle>
              <p className="text-gray-900 my-2">Type: {request.Type}</p>
              <p className="text-gray-900 my-2">Service: {request.Service}</p>
              <p className="text-gray-900 my-2">
                Created At: {request.created_at}
              </p>
              <p className="text-gray-900 my-2">Status: {request.Status}</p>
              <p className="text-gray-900 mb-2">
                Description: {request.Description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-blue-750 p-4 bg-blue-200 mt-4">
        Past Requests
      </h2>
      <div className="flex flex-col gap-6">
        {pastRequests.map((request, index) => (
          <Card key={index} className="p-4 shadow-md rounded-lg">
            <CardContent>
              <CardTitle className="text-lg">
                Address: {request.address}
              </CardTitle>
              <p className="text-gray-900 my-2">Type: {request.Type}</p>
              <p className="text-gray-900 my-2">Service: {request.Service}</p>
              <p className="text-gray-900 my-2">
                Created At: {request.created_at}
              </p>
              <p className="text-gray-900 my-2">Status: {request.Status}</p>
              <p className="text-gray-900 mb-2">
                Description: {request.Description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
