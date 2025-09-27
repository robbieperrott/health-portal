import { HealthMetric } from "./types";

export function getHealthMetricTitle(metric: HealthMetric) {
  if (metric === "heart-rate") {
    return "Heart Rate";
  } else if (metric === "step-count") {
    return "Step Count";
  } else if (metric === "sleep-score") {
    return "Sleep Score";
  }
}

export function getHealthMetricUnit(metric: HealthMetric) {
  if (metric === "heart-rate") {
    return "BPM";
  } else if (metric === "step-count") {
    return "Steps";
  } else if (metric === "sleep-score") {
    return "%";
  }
}
