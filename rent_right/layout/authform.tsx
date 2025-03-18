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
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = async () => {
    // Handle login
    console.log("Logging in as " + role);
    setLoading(true);
    console.log(email, password);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.push("/" + role + "/home");
    }
    , 1000);
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
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleLogin}>Login</Button>
      </CardContent>
    </Card>
  );
}