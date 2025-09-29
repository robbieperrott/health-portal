import { HealthMetric } from "./types";

export function getHealthMetricTitle(metric: HealthMetric) {
  if (metric === "heartRate") {
    return "Average Heart Rate";
  } else if (metric === "stepCount") {
    return "Step Count";
  } else if (metric === "sleepScore") {
    return "Sleep Score";
  }
}

export function getHealthMetricUnit(metric: HealthMetric) {
  if (metric === "heartRate") {
    return "BPM";
  } else if (metric === "stepCount") {
    return "steps";
  } else if (metric === "sleepScore") {
    return "%";
  }
}
