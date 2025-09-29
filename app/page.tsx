"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const {user, signIn} = useAuth();
  
  if (user === undefined) return;

  if (user === null) {
    return (
      <Card className="max-w-sm h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Welcome to the health portal</CardTitle>
        </CardHeader>
        <CardContent>
          <>Please <a className="hover:text-primary font-bold cursor-pointer" onClick={signIn}>sign in</a> to view and manage your health data.</>
        </CardContent>
      </Card>
    );
  }

  return <Dashboard />
}

