"use client"

import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function SignOutButton({variant} : {variant: "default" | "secondary"}) {
    const { signOut} = useAuth();

    return <Button variant={variant} onClick={signOut}>Sign out</Button>
}