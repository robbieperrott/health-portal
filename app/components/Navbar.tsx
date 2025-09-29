"use client"

import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "firebase/auth";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import SignInButton from "./SignInButton";
import RoleToggle from "./RoleToggle";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const {user} = useAuth();
    const {role} = useRole();

    return <div className="flex items-center justify-between border-b h-16 px-4">
        {(user !== undefined) && <>
       <NavigationMenu>
            {role && 
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/ai-assistant">AI Assistant</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {role === "clinician" && <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/patient-lookup">Patient Lookup</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>}
            </NavigationMenuList>}
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList className="flex gap-2 w-full">
                <NavigationMenuItem><RoleToggle/></NavigationMenuItem>
                <ThemeToggle/>
                <NavigationMenuItem>
                    {user === null ? <SignInButton /> : <SignedIn user={user}/>}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu></>}
    </div>
}

interface SignedInProps {
    user: User;
}

function SignedIn(props: SignedInProps) {
    const {user} = props;

    return <div className="flex gap-2 items-center">
        <SignOutButton/>
         <Avatar>
            <AvatarImage src={user.photoURL ?? ""} alt="@shadcn" />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
    </div>
}
