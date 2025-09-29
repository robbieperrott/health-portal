import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealthMetricTitle } from "../utils";
import { HealthMetric } from "../types";
import TimeSeriesChart, { DateRange } from "./TimeSeriesChart";
import { useState } from "react";
import DateRangeSelect, { DateFilter } from "./DateFilterSelect";

interface DashboardChartCardProps {
    metric: HealthMetric;
}

export default function DashboardChartCard(props: DashboardChartCardProps) {
    const {metric} = props;

    const [dateFilter, setDateFilter] = useState<DateFilter>("all-time");

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);
    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(today.getDate() - 28);

    const getDateRange = (): DateRange | null => {
        if (dateFilter === "7-days") {
            return {startDate: sevenDaysAgo, endDate: today}
        } else if (dateFilter === "14-days") {
            return {startDate: fourteenDaysAgo, endDate: today}
        } else if (dateFilter === "28-days") {
            return {startDate: twentyEightDaysAgo, endDate: today}
        } else {
            return null;
        }
    }
    
    return <Card className="w-full h-full">
        <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-xl font-bold">{getHealthMetricTitle(metric)} Over Time</CardTitle>
            <DateRangeSelect value={dateFilter} onChange={setDateFilter}/>
        </CardHeader>
        <CardContent className="">
            
            <TimeSeriesChart
                dateRange={getDateRange()}
                selectedMetric={metric}
            />
        </CardContent>
    </Card>
}