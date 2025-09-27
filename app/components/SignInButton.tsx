import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAuth } from "../context/AuthContext";

export default function SignInButton() {
    const { signIn } = useAuth();

    return <NavigationMenuLink asChild onClick={signIn} className={navigationMenuTriggerStyle()}>
        <div>Sign in</div>
    </NavigationMenuLink>
}