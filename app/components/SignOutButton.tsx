"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function SignOutButton() {
    const {signOut} = useAuth();

    return <Button onClick={signOut}>Sign out</Button>
}