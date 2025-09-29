import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DateFilter = "7-days" | "14-days" | "28-days" | "all-time";

interface DateRangeSelectProps {
    value: DateFilter;
    onChange: (dateRange: DateFilter) => void;
}

export default function DateRangeSelect(props: DateRangeSelectProps) {
    const {value, onChange} = props;

    return <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date Range</SelectLabel>
          <SelectItem value="7-days">7 days</SelectItem>
          <SelectItem value="14-days">14 days</SelectItem>
          <SelectItem value="28-days">28 days</SelectItem>
          <SelectItem value="all-time">All time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}