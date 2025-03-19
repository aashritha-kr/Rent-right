"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button"; // Shadcn button
import { Input } from "@/components/ui/input"; // Shadcn input
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn card

export default function UserAuthForm({title, role, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [loc, setLoc] = useState("");
  const [phone, setPhone] = useState("");
  const [accNo, setAccNo] = useState("");
  const [ifsc, setIFSC] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [accName, setAccName] = useState("");
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("Sign Up as " + role);
    console.log(email, password);
    if (!first_name || !last_name || !email || !password || !phone || !role) {
        console.error("All fields are required");
        return;  // Don't proceed if any field is missing
    }
    console.log(first_name, middle_name, last_name)
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        password,
        location: loc,
        role,
        account_no: accNo,
        ifsc_code: ifsc,
        bank_name: bank,
        bank_branch: branch,
        account_holder_name: accName,
        upi_id: upi
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
      } else {
        console.log('Signup successful', data);
      }
      setLoading(false);
      if(res.status===201)
        router.push("/" + role.toLowerCase() + "/home");
  };

  return (
    <Card className={"w-[400px]"} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Label>First Name</Label>
        <Input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
        />
        <Label>Middle Name</Label>
        <Input
            type="text"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Middle Name"
        />
        <Label>Last Name</Label>
        <Input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
        />
        <Label>Phone Number</Label>
        <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
            pattern="^[0-9]{10}$"
            title="10-digit phone number"
        />
        <Label>UPI ID</Label>
        <Input
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            placeholder="UPI ID"
            title="UPI ID"
        />
        <Label>Account Number</Label>
        <Input
            type="text"
            value={accNo}
            onChange={(e) => setAccNo(e.target.value)}
            placeholder="Account Number"
            required
            pattern="^[0-9]*$"
            title="Account number"
        />
        <Label>IFSC Code</Label>
        <Input
            type="text"
            value={ifsc}
            onChange={(e) => setIFSC(e.target.value)}
            placeholder="IFSC Code"
            required
            title="IFSC Code"
        />
        <Label>Bank Name</Label>
        <Input
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder="Bank Name"
            required
            title="Bank Name"
        />
        <Label>Bank Branch</Label>
        <Input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Bank Branch"
            required
            title="Bank Branch"
        />
        <Label>Account holder name</Label>
        <Input
            type="text"
            value={accName}
            onChange={(e) => setAccName(e.target.value)}
            placeholder="Account holder name"
            required
            title="Account holder name"
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
      </CardContent>
    </Card>
  );
}