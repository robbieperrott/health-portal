"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "../components/DashboardCard";
import { useState } from "react";
import { HealthMetric } from "../types";
import { getHealthMetricTitle } from "../utils";
import DashboardChartCard from "../components/DashboardChartCard";

export default function DashboardPage() {
    const [selectedMetric, setSelectedMetric] = useState<HealthMetric>("heartRate");
    
    return <div className="w-full h-full flex flex-col gap-12">
        <div className="flex w-full gap-8 h-fit">
            <DashboardCard
                metric="heartRate"
                value={70}
                selected={selectedMetric === "heartRate"}
                onSelect={() => setSelectedMetric("heartRate")}
            />
            <DashboardCard
                metric="stepCount"
                value={10000}
                selected={selectedMetric === "stepCount"}
                onSelect={() => setSelectedMetric("stepCount")}
            />
            <DashboardCard
                metric="sleepScore"
                value={90}
                selected={selectedMetric === "sleepScore"}
                onSelect={() => setSelectedMetric("sleepScore")}
            />
        </div>
        <DashboardChartCard metric={selectedMetric}/>
    </div>
}

