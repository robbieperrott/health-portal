import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {patients} from "../api/mockPatientData";

export function PatientLookup() {
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Medical Aid Number</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {patients.map((patient) => (
                <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.medicalAid}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
