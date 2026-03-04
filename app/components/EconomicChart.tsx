"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  value: number;
}

type YFormat = "number" | "number2dp" | "percent" | "percent1dp";

interface EconomicChartProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  yDomain?: [number | "auto", number | "auto"];
  yFormat?: YFormat;
  source?: string;
  seriesId?: string;
  fetchedAt?: string;
  color?: string;
}

function formatValue(value: number, format?: YFormat): string {
  if (format === "percent") return `${value}%`;
  if (format === "percent1dp") return `${value.toFixed(1)}%`;
  if (format === "number2dp") return value.toFixed(2);
  return value.toFixed(0);
}

export default function EconomicChart({
  title,
  subtitle,
  data,
  yDomain,
  yFormat,
  source,
  seriesId,
  fetchedAt,
  color = "#1d4ed8",
}: EconomicChartProps) {
  const yTickFormatter = (v: number) => formatValue(v, yFormat);
  const latestDate = data.length > 0 ? data[data.length - 1].date : null;
  const fredUrl = seriesId ? `https://fred.stlouisfed.org/series/${seriesId}` : "https://fred.stlouisfed.org";
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* FRED header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            backgroundColor: "#1a4480",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 2,
            letterSpacing: 0.5,
          }}
        >
          FRED
        </div>
        <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{title}</span>
      </div>

      {subtitle && (
        <div style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.3 }}>{subtitle}</div>
      )}

      {/* Chart */}
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              domain={yDomain ?? ["auto", "auto"]}
              tickFormatter={yTickFormatter}
              width={40}
            />
            <Tooltip
              contentStyle={{ fontSize: 11, padding: "4px 8px", border: "1px solid #d1d5db" }}
              labelStyle={{ fontWeight: 600, color: "#111827" }}
              formatter={(value: number | undefined) => [formatValue(value ?? 0, yFormat), "Value"]}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 6, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
        <div style={{ fontSize: 9, color: "#9ca3af", lineHeight: 1.4 }}>
          {source && <div>{source}</div>}
          <a
            href={fredUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            View on FRED ↗
          </a>
        </div>
        <div style={{ fontSize: 9, color: "#9ca3af", textAlign: "right", flexShrink: 0 }}>
          {latestDate && <div>Latest data: {latestDate}</div>}
          {fetchedAt && <div>Fetched: {fetchedAt}</div>}
        </div>
      </div>
    </div>
  );
}
