import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthMetric } from "../types";
import { getHealthMetricTitle, getHealthMetricUnit } from "../utils";

interface DashboardCardProps {
    metric: HealthMetric;
    value: number;
    selected: boolean;
    onSelect: () => void;
}

export default function DashboardCard(props: DashboardCardProps) {
    const {metric, value, selected, onSelect} = props;

    return <Card className={`w-full gap-2 ${!selected && "hover:shadow-lg"} ${selected && "bg-muted"}`} onClick={onSelect}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{getHealthMetricTitle(metric)}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 items-end">
        <div className="font-bold text-4xl">
            {value}
        </div>
        {getHealthMetricUnit(metric)}
      </CardContent>
    </Card>
}