"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type Props = { children: ReactNode };

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setChecking(false);
      if (!user) {
        router.replace("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Checking session…
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

