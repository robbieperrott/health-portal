"use client"

import { Switch } from "@/components/ui/switch";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "firebase/auth";

export default function Navbar() {
    const {user} = useAuth();

    const {role, setRole} = useRole();

    const handleSwitchRole = () => {
        if (role === "patient") {
            setRole("clinician")
        } else if (role === "clinician") {
            setRole("patient");
        } else {
            throw Error("Unsupported role")
        }
    }

    return <div className="flex items-center justify-between border-b h-20 px-6">
        <div className="w-1/8 flex justify-start">
            {role ? <Switch checked={role === "clinician"} onCheckedChange={handleSwitchRole}/> : <></>}
        </div>
        <div className="w-3/4 flex justify-center text-xl font-bold">Health Portal</div>
        <div className="w-1/8 flex justify-end">
            {user === undefined ? <></> : user === null ? <SignInButton /> : <SignedIn user={user}/>}
        </div>
    </div>
}

interface SignedInProps {
    user: User;
}

function SignedIn(props: SignedInProps) {
    const {user} = props;

    return <div className="flex gap-4 items-center">
        <Avatar>
            <AvatarImage src={user.photoURL ?? ""} alt="@shadcn" />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <SignOutButton/>
    </div>
}