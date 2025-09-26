"use client"

import { Switch } from "@/components/ui/switch";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "firebase/auth";
import { Role } from "../types";
import { PersonStanding, Stethoscope } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Navbar() {
    const {user} = useAuth();

    const {role, setRole} = useRole();

    return <div className="flex items-center justify-between border-b h-20 px-6">
        <div className="w-1/8 flex justify-start">
            {role ? <RoleSwitch value={role} onChange={setRole}/> : <></>}
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

interface RoleSwitchProps {
    value: Role;
    onChange: (role: Role) => void;
}

function RoleSwitch({value, onChange}: RoleSwitchProps) {
    const handleChange = () => {
        if (value === "patient") {
            onChange("clinician")
        } else if (value === "clinician") {
            onChange("patient");
        } else {
            throw Error("Unsupported role")
        }
    }

    return <div className="flex flex-row items-center gap-3">
        <Tooltip>
            <TooltipTrigger asChild>
                <PersonStanding onClick={() => onChange("patient")} className={value === "patient" ? "" : "text-muted"} size={18}/>
            </TooltipTrigger>
            <TooltipContent>
                <p>Patient</p>
            </TooltipContent>
        </Tooltip>
        <Switch className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary" checked={value === "clinician"} onCheckedChange={handleChange}/>
        <Tooltip>
            <TooltipTrigger asChild>
                <Stethoscope onClick={() => onChange("clinician")} className={value === "clinician" ? "" : "text-muted"} size={18}/>
            </TooltipTrigger>
            <TooltipContent>
                <p>Clinician</p>
            </TooltipContent>
        </Tooltip>
    </div>
}