"use client"

import DashboardCard from "../components/DashboardCard";
import { useState } from "react";
import { HealthMetric } from "../types";
import DashboardChartCard from "../components/DashboardChartCard";
import {timeSeriesData} from "../api/mockData";

export default function DashboardPage() {
    const [selectedMetric, setSelectedMetric] = useState<HealthMetric>("heartRate");

    const todaysData = timeSeriesData[timeSeriesData.length - 1];
    
    return <div className="w-full h-full flex flex-col gap-12">
        <div className="flex w-full gap-8 h-fit">
            <DashboardCard
                metric="heartRate"
                value={todaysData.heartRate}
                selected={selectedMetric === "heartRate"}
                onSelect={() => setSelectedMetric("heartRate")}
            />
            <DashboardCard
                metric="stepCount"
                value={todaysData.stepCount}
                selected={selectedMetric === "stepCount"}
                onSelect={() => setSelectedMetric("stepCount")}
            />
            <DashboardCard
                metric="sleepScore"
                value={todaysData.sleepScore}
                selected={selectedMetric === "sleepScore"}
                onSelect={() => setSelectedMetric("sleepScore")}
            />
        </div>
        <DashboardChartCard metric={selectedMetric}/>
    </div>
}

