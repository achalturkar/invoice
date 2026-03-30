
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 150000 },
  { month: "Mar", revenue: 110000 },
  { month: "Apr", revenue: 180000 },
  { month: "May", revenue: 220000 },
];

const RevenueChart = () => (
  <div className="bg-white p-6 rounded-2xl border shadow-sm">
    <h3 className="font-semibold mb-4">Revenue Overview</h3>

    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueChart;
