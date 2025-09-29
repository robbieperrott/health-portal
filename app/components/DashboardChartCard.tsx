import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealthMetricTitle } from "../utils";
import { HealthMetric } from "../types";
import TimeSeriesChart from "./TimeSeriesChart";

interface TimeSeriesData {
    date: Date;
    value: number;
}

interface DashboardChartCardProps {
    metric: HealthMetric;
}

export default function DashboardChartCard(props: DashboardChartCardProps) {
    const {metric} = props;

    const today = new Date();
    const yesterday = new Date();
    const dayBeforeYesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    dayBeforeYesterday.setDate(yesterday.getDate() - 1);

    return <Card className="h-full">
        <CardHeader>
            <CardTitle className="text-xl font-bold">{getHealthMetricTitle(metric)} Over Time</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
            <TimeSeriesChart
                selectedMetric={metric}
            />
        </CardContent>
    </Card>
}