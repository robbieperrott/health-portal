"use client"

import DashboardCard from "./DashboardCard";
import { useState } from "react";
import { HealthMetric } from "../types";
import DashboardChartCard from "./DashboardChartCard";
import {timeSeriesData} from "../api/mockTimeSeriesData";

export default function Dashboard() {
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

