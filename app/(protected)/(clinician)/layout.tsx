import ClinicianGuard from "./ClinicianGuard";

export default function ClinicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClinicianGuard>{children}</ClinicianGuard>;
}