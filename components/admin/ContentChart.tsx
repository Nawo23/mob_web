"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type ChartDataItem = {
    name: string;
    count: number;
};

const COLORS = ["#0A0A0A", "#FF1F3D", "#0A0A0A", "#FF1F3D", "#0A0A0A", "#FF1F3D"];

export default function ContentChart({ data }: { data: ChartDataItem[] }) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#0A0A0A99", fontFamily: "var(--font-inter)" }}
                    axisLine={{ stroke: "#0000000d" }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: "#0A0A0A99", fontFamily: "var(--font-inter)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <Tooltip
                    cursor={{ fill: "#0A0A0A08" }}
                    contentStyle={{
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.06)",
                        fontFamily: "var(--font-inter)",
                        fontSize: 13,
                        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.12)",
                    }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={44}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}