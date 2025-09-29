export interface TimeSeriesData {
  date: Date;
  heartRate: number;
  stepCount: number;
  sleepScore: number;
}

export const timeSeriesData: TimeSeriesData[] = Array.from(
  { length: 50 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    return {
      date,
      heartRate: Math.floor(60 + Math.random() * 60), // 60–100 bpm
      stepCount: Math.floor(3000 + Math.random() * 7000), // 3k–10k steps
      sleepScore: Math.floor(50 + Math.random() * 50), // 50–100 score
    };
  }
).reverse();
