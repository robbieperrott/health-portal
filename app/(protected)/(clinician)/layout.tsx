"use client";
import { useEffect } from "react";
import { useRole } from "@/app/context/RoleContext";
import { useRouter } from "next/navigation";

export default function ClinicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "clinician") {
      router.replace("/");
    }
  }, [role, router]);

  if (role === null || role !== "clinician") {
    return null;
  }

  return <>{children}</>;
}