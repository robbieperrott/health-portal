"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "../components/DashboardCard";
import { useState } from "react";
import { HealthMetric } from "../types";
import { getHealthMetricTitle } from "../utils";

export default function DashboardPage() {
    const [selectedMetric, setSelectedMetric] = useState<HealthMetric>("heart-rate");
    
    return <div className="w-full h-full flex flex-col gap-12">
        <div className="flex w-full gap-8 h-fit">
            <DashboardCard
                metric="heart-rate"
                value={70}
                selected={selectedMetric === "heart-rate"}
                onSelect={() => setSelectedMetric("heart-rate")}
            />
            <DashboardCard
                metric="step-count"
                value={10000}
                selected={selectedMetric === "step-count"}
                onSelect={() => setSelectedMetric("step-count")}
            />
            <DashboardCard
                metric="sleep-score"
                value={90}
                selected={selectedMetric === "sleep-score"}
                onSelect={() => setSelectedMetric("sleep-score")}
            />
        </div>
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{getHealthMetricTitle(selectedMetric)}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-end">
                (Chart)
            </CardContent>

        </Card>
    </div>
}

