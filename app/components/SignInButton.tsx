"use client"

import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function SignInButton({variant, autofocus} : {variant: "default" | "secondary", autofocus?: boolean}) {
    const { signIn } = useAuth();

    return <Button autoFocus={autofocus} variant={variant} onClick={signIn}>Sign in</Button>
}