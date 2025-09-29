import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { timeSeriesData } from "../api/mockTimeSeriesData";
import { DateRange, HealthMetric, TimeSeriesData } from "../types";
import { getHealthMetricTitle, getHealthMetricUnit } from "../utils";

interface Props {
  dateRange: DateRange | null;
  selectedMetric: HealthMetric;
}

export default function TimeSeriesChart({ dateRange, selectedMetric }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const data = timeSeriesData.filter(dataPoint => dateRange === null || (
        dataPoint.date >= dateRange.startDate && dataPoint.date <= dateRange.endDate
    ))

    if (!data || data.length === 0) return;

    const width = 1200;
    const height = 350;
    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    // Scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[selectedMetric])!])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<TimeSeriesData>()
      .x((d) => x(d.date))
      .y((d) => y(d[selectedMetric]))
      .curve(d3.curveMonotoneX);

    const colorMap: Record<typeof selectedMetric, string> = {
      heartRate: "var(--chart-1)",
      stepCount:  "var(--chart-2)",
      sleepScore:  "var(--chart-3)",
    };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6));

    g.append("g").call(d3.axisLeft(y));

    // Line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colorMap[selectedMetric])
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Circles with tooltips
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d[selectedMetric]))
      .attr("r", 4)
      .attr("fill", colorMap[selectedMetric])
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.date.toDateString()}</strong><br/>
             ${getHealthMetricTitle(selectedMetric)}: ${d[selectedMetric]} ${getHealthMetricUnit(selectedMetric)}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", (event) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("opacity", 0);
      });
  }, [timeSeriesData, selectedMetric, dateRange]);

  return <div>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          background: "var(--primary)",
          color: "var(--background)",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </div>;
}
