"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import SignInButton from "./components/SignInButton";

export default function Home() {
  const {user} = useAuth();
  
  if (user === undefined) return null;

  if (user === null) {
    return (
      <div className="flex w-full h-2/3 items-center justify-center"><Card className="max-w-2xs h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Welcome to the health portal</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 justify-center">
          <p>Please sign in to view and manage your health data.</p>
          <SignInButton autofocus variant="default"/>
        </CardContent>
      </Card></div>
    );
  }

  return <Dashboard />
}

