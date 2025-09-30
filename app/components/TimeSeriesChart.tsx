"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { timeSeriesData } from "../api/mockTimeSeriesData";
import { DateRange, HealthMetric, TimeSeriesData } from "../types";
import { getHealthMetricTitle, getHealthMetricUnit } from "../utils";

interface Props {
  dateRange: DateRange | null;
  selectedMetric: HealthMetric;
}

const MARGIN = { top: 40, right: 40, bottom: 40, left: 60 };
const ASPECT_RATIO = 18 / 5;
const MIN_HEIGHT = 260;
const MAX_HEIGHT = 520;

export default function TimeSeriesChart({ dateRange, selectedMetric }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: MIN_HEIGHT,
  });

  // Observe parent width and compute height automatically
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const nextWidth = Math.floor(rect.width);
      let nextHeight =
        nextWidth > 0 ? nextWidth / ASPECT_RATIO : MIN_HEIGHT;
      nextHeight = Math.max(
        MIN_HEIGHT,
        Math.min(MAX_HEIGHT, Math.round(nextHeight))
      );

      setSize((prev) =>
        prev.width !== nextWidth || prev.height !== nextHeight
          ? { width: nextWidth, height: nextHeight }
          : prev
      );
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = useMemo<TimeSeriesData[]>(
    () =>
      timeSeriesData.filter(
        (d) =>
          dateRange === null ||
          (d.date >= dateRange.startDate && d.date <= dateRange.endDate)
      ),
    [dateRange]
  );

  useEffect(() => {
    const { width, height } = size;
    if (!svgRef.current || width <= 0 || height <= 0 || data.length === 0) return;

    const innerWidth = Math.max(0, width - MARGIN.left - MARGIN.right);
    const innerHeight = Math.max(0, height - MARGIN.top - MARGIN.bottom);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    const xExtent = d3.extent(data, (d) => d.date);
    if (!xExtent[0] || !xExtent[1]) return;
    const x = d3.scaleTime().domain([xExtent[0], xExtent[1]]).range([0, innerWidth]);

    const yMax = d3.max(data, (d) => d[selectedMetric]) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<TimeSeriesData>()
      .x((d) => x(d.date))
      .y((d) => y(d[selectedMetric]))
      .curve(d3.curveMonotoneX);

    const colorMap: Record<HealthMetric, string> = {
      heartRate: "var(--chart-1)",
      stepCount: "var(--chart-2)",
      sleepScore: "var(--chart-3)",
    };

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(Math.max(3, Math.floor(innerWidth / 160))));
    g.append("g").call(d3.axisLeft(y));

    // Line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colorMap[selectedMetric])
      .attr("stroke-width", 2)
      .attr("d", line);

    // Circles with tooltips
    const tooltipSel = d3.select(tooltipRef.current);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d[selectedMetric]))
      .attr("r", 4)
      .attr("fill", colorMap[selectedMetric])
      .on("mouseover", (event, d) => {
        tooltipSel
          .style("opacity", 1)
          .html(
            `<strong>${d.date.toDateString()}</strong><br/>${getHealthMetricTitle(
              selectedMetric
            )}: ${d[selectedMetric]} ${getHealthMetricUnit(selectedMetric)}`
          );
      })
      .on("mousemove", (event) => {
        const host = containerRef.current;
        if (!host) return;
        const rect = host.getBoundingClientRect();
        const left = event.clientX - rect.left + 10;
        const top = event.clientY - rect.top - 28;
        tooltipSel.style("left", `${left}px`).style("top", `${top}px`);
      })
      .on("mouseout", () => {
        tooltipSel.style("opacity", 0);
      });
  }, [size, data, selectedMetric]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <svg ref={svgRef} />
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
    </div>
  );
}
