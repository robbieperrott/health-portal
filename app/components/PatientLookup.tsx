"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {patients} from "../api/mockPatientData";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

export function PatientLookup() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("")

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 200)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm]);

    const filteredPatients = searchTerm
        ? patients.filter(patient =>
            Object.values(patient).some(
                value =>
                typeof value === "string" &&
                value.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
            )
        : patients

    return (
        <div className="space-y-6 w-full">
            <div className="space-y-3">
                <Label htmlFor="patient-search">Search Patients</Label>
                <Input
                    id="patient-search"
                    className="w-[500px]"
                    placeholder="Enter a patient's ID, name, phone number, or medical aid number..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="h-fill">
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
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map(patient => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.phone}</TableCell>
                            <TableCell>{patient.medicalAid}</TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No patients found.
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>    
        </div>
    )
}
