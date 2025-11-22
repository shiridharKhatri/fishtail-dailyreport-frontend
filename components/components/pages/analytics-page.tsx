"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const submissionData = [
  { day: "Mon", submitted: 42, target: 45 },
  { day: "Tue", submitted: 41, target: 45 },
  { day: "Wed", submitted: 43, target: 45 },
  { day: "Thu", submitted: 40, target: 45 },
  { day: "Fri", submitted: 44, target: 45 },
  { day: "Sat", submitted: 30, target: 30 },
  { day: "Sun", submitted: 28, target: 30 },
]

const consistencyData = [
  { week: "Week 1", consistency: 95 },
  { week: "Week 2", consistency: 88 },
  { week: "Week 3", consistency: 92 },
  { week: "Week 4", consistency: 85 },
  { week: "Week 5", consistency: 90 },
]

const missingData = [
  { name: "Submitted", value: 280, color: "#86efac" },
  { name: "Missing", value: 20, color: "#f87171" },
]

export function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-[#919191] text-sm">View comprehensive analytics and trends</p>
      </div>

      {/* Daily Submission Activity */}
      <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
        <h2 className="text-xl font-bold text-white mb-4">Daily Submission Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={submissionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis dataKey="day" stroke="#919191" />
            <YAxis stroke="#919191" />
            <Tooltip contentStyle={{ backgroundColor: "#1F1F1F", border: "1px solid #333" }} />
            <Legend />
            <Bar dataKey="submitted" fill="#86efac" />
            <Bar dataKey="target" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Employee Consistency Trends */}
      <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
        <h2 className="text-xl font-bold text-white mb-4">Employee Consistency Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={consistencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis dataKey="week" stroke="#919191" />
            <YAxis stroke="#919191" />
            <Tooltip contentStyle={{ backgroundColor: "#1F1F1F", border: "1px solid #333" }} />
            <Line type="monotone" dataKey="consistency" stroke="#86efac" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Missing Submission Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
          <h2 className="text-xl font-bold text-white mb-4">Missing Submission Frequency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={missingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {missingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Report Submission Averages */}
        <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
          <h2 className="text-xl font-bold text-white mb-4">Report Submission Averages</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#919191] text-sm">Daily Average</span>
                <span className="text-white font-bold">42.7</span>
              </div>
              <div className="w-full bg-[#1F1F1F] rounded-full h-2">
                <div className="bg-[#86efac] h-2 rounded-full" style={{ width: "95%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#919191] text-sm">Weekly Average</span>
                <span className="text-white font-bold">285</span>
              </div>
              <div className="w-full bg-[#1F1F1F] rounded-full h-2">
                <div className="bg-[#60a5fa] h-2 rounded-full" style={{ width: "88%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#919191] text-sm">Monthly Average</span>
                <span className="text-white font-bold">1,140</span>
              </div>
              <div className="w-full bg-[#1F1F1F] rounded-full h-2">
                <div className="bg-[#fbbf24] h-2 rounded-full" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
