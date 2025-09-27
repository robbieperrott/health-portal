import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
    return <div className="flex w-full gap-8 h-fit">
        <DashboardCard
            title="Average Heart Rate"
            value={70}
            unit="BPM"
        />
        <DashboardCard
            title="Step Count"
            value={10000}
            unit="steps"
        />
        <DashboardCard
            title="Sleep Score"
            value={90}
            unit="%"
        />
    </div>
}

