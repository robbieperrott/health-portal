import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
    const { signOut} = useAuth();

    return <NavigationMenuLink onClick={signOut} asChild className={navigationMenuTriggerStyle()}>
        <Button variant="secondary">Sign out</Button>
    </NavigationMenuLink>
}