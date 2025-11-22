"use client"

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { week: "Week 1", consistency: 85 },
  { week: "Week 2", consistency: 88 },
  { week: "Week 3", consistency: 82 },
  { week: "Week 4", consistency: 90 },
  { week: "Week 5", consistency: 87 },
]

export function SubmissionTrendChart() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-[#0D0D0D] rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-white">Employee Consistency Trend</h2>
        <span className="text-sm text-[#86efac]">90% Average</span>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
            <XAxis dataKey="week" stroke="#666" />
            <YAxis stroke="#666" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px" }}
              cursor={{ stroke: "#86efac", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="consistency"
              stroke="#86efac"
              strokeWidth={3}
              dot={{ fill: "#86efac", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
