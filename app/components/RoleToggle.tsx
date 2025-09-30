"use client"

import { PersonStanding, Stethoscope } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRole } from "../context/RoleContext";

export default function RoleToggle() {
    const {role, setRole} = useRole();

    const Icon = ({className} : {className: string}) => {
        return role === "clinician" ? <Stethoscope className={className}/> : <PersonStanding className={className}/>;
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
            <Icon className="h-[1.2rem] w-[1.2rem]"/>
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setRole("patient")}>
            Patient
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("clinician")}>
            Clinician
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}