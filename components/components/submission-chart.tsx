"use client"

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { date: "Mon", submitted: 40, target: 42 },
  { date: "Tue", submitted: 41, target: 42 },
  { date: "Wed", submitted: 39, target: 42 },
  { date: "Thu", submitted: 42, target: 42 },
  { date: "Fri", submitted: 38, target: 42 },
]

export function SubmissionChart() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-[#0D0D0D] rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-white">Daily Submission Activity</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#86efac]"></div>
            <span className="text-sm text-gray-400">Submitted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#666]"></div>
            <span className="text-sm text-gray-400">Target</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px" }}
              cursor={{ fill: "rgba(134, 239, 172, 0.1)" }}
            />
            <Bar dataKey="submitted" fill="#86efac" radius={[8, 8, 0, 0]} />
            <Bar dataKey="target" fill="#666" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
