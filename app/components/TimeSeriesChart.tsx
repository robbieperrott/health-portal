import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { timeSeriesData as data } from "../api/mockData";
import { HealthMetric } from "../types";
import { getHealthMetricTitle, getHealthMetricUnit } from "../utils";

export type TimeSeriesData = {
    date: Date;
    heartRate: number;
    stepCount: number;
    sleepScore: number;
}

interface Props {
  selectedMetric: HealthMetric;
}

export default function TimeSeriesChart({ selectedMetric: selectedHealthMetric }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 1000;
    const height = 400;
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
      .domain([0, d3.max(data, (d) => d[selectedHealthMetric])!])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<TimeSeriesData>()
      .x((d) => x(d.date))
      .y((d) => y(d[selectedHealthMetric]))
      .curve(d3.curveMonotoneX);

    const colorMap: Record<typeof selectedHealthMetric, string> = {
      heartRate: "#e63946",
      stepCount: "#457b9d",
      sleepScore: "#2a9d8f",
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
      .attr("stroke", colorMap[selectedHealthMetric])
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Circles with tooltips
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d[selectedHealthMetric]))
      .attr("r", 4)
      .attr("fill", colorMap[selectedHealthMetric])
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.date.toDateString()}</strong><br/>
             ${getHealthMetricTitle(selectedHealthMetric)}: ${d[selectedHealthMetric]} ${getHealthMetricUnit(selectedHealthMetric)}`
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
  }, [data, selectedHealthMetric]);

  return <div>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          background: "var(--primary)",
          color: "white",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          transition: "opacity 0.2s ease",
        }}
      />
    </div>;
}
