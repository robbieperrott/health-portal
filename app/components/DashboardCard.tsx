"use client"

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

    return <Card
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${getHealthMetricTitle(metric)}: ${value} ${getHealthMetricUnit(metric)}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // prevent page scroll on Space
          onSelect();
        }
      }}
      className={`
        w-full gap-2 outline-none rounded-lg transition
        ${selected ? "bg-muted" : "hover:bg-accent hover:text-accent-foreground"}
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        focus-visible:outline-none
      `}
    >
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