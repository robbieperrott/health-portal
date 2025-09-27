import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
    title: string;
    value: number;
    unit: string;
}

export default function DashboardCard(props: DashboardCardProps) {
    const {title, value, unit} = props;

    return <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 items-end">
        <div className="font-bold text-4xl">
            {value}
        </div>
        {unit}
      </CardContent>
    </Card>
}