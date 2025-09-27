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
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const {user} = useAuth();
    const {role, setRole} = useRole();

    return <div className="flex items-center justify-between border-b h-16 px-4">
        <NavigationMenu>
            <NavigationMenuList className="flex p-2 w-full">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Dashboard</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {role === "clinician" && <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Patient Lookup</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">AI Assistant</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList className="flex gap-2 w-full">
                {user === undefined ? <></> : user === null ? <NavigationMenuItem><SignInButton /></NavigationMenuItem> : <NavigationMenuItem><SignedIn user={user}/></NavigationMenuItem>}
                {role ? <NavigationMenuItem><RoleToggle/></NavigationMenuItem> : <></>}
                <ThemeToggle/>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
}

interface SignedInProps {
    user: User;
}

function SignedIn(props: SignedInProps) {
    const {user} = props;

    return <div className="flex gap-2 items-center">
        <Avatar>
            <AvatarImage src={user.photoURL ?? ""} alt="@shadcn" />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <SignOutButton/>
    </div>
}
