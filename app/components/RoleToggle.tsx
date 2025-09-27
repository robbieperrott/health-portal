import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Role } from "../types";
import { Switch } from "@radix-ui/react-switch";
import { PersonStanding, Stethoscope } from "lucide-react";

interface RoleSwitchProps {
    value: Role;
    onChange: (role: Role) => void;
}

export default function RoleToggle({value, onChange}: RoleSwitchProps) {
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