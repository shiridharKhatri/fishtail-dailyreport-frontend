"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp, AlertCircle, CheckCircle, Search } from "lucide-react"

interface EmployeePerformance {
  id: string
  name: string
  department: string
  email: string
  submissionRate: number
  missedCount: number
  onTimeCount: number
  missedDates: string[]
  lastSubmitted: string
  status: "excellent" | "good" | "warning"
}

const performanceData: EmployeePerformance[] = [
  {
    id: "1",
    name: "Kan kaneki",
    department: "Engineering",
    email: "kaneki@example.com",
    submissionRate: 98,
    missedCount: 1,
    onTimeCount: 49,
    missedDates: ["2025-11-15"],
    lastSubmitted: "2025-11-22",
    status: "excellent",
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Marketing",
    email: "jane@example.com",
    submissionRate: 92,
    missedCount: 4,
    onTimeCount: 46,
    missedDates: ["2025-11-10", "2025-11-17", "2025-11-18", "2025-11-21"],
    lastSubmitted: "2025-11-22",
    status: "good",
  },
  {
    id: "3",
    name: "Mike Johnson",
    department: "Sales",
    email: "mike@example.com",
    submissionRate: 88,
    missedCount: 6,
    onTimeCount: 44,
    missedDates: ["2025-11-08", "2025-11-12", "2025-11-14", "2025-11-19", "2025-11-20", "2025-11-22"],
    lastSubmitted: "2025-11-21",
    status: "warning",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    department: "HR",
    email: "sarah@example.com",
    submissionRate: 100,
    missedCount: 0,
    onTimeCount: 50,
    missedDates: [],
    lastSubmitted: "2025-11-22",
    status: "excellent",
  },
  {
    id: "5",
    name: "David Brown",
    department: "Engineering",
    email: "david@example.com",
    submissionRate: 86,
    missedCount: 7,
    onTimeCount: 43,
    missedDates: ["2025-11-09", "2025-11-13", "2025-11-16", "2025-11-17", "2025-11-19", "2025-11-20", "2025-11-22"],
    lastSubmitted: "2025-11-21",
    status: "warning",
  },
]

export function EmployeePerformancePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-[#86efac]/10 border-[#86efac]/30"
      case "good":
        return "bg-[#60a5fa]/10 border-[#60a5fa]/30"
      case "warning":
        return "bg-[#fbbf24]/10 border-[#fbbf24]/30"
      default:
        return "bg-[#1F1F1F]/50 border-[#1F1F1F]"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-5 w-5 text-[#86efac]" />
      case "good":
        return <TrendingUp className="h-5 w-5 text-[#60a5fa]" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-[#fbbf24]" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "Excellent"
      case "good":
        return "Good"
      case "warning":
        return "Needs Improvement"
      default:
        return "Unknown"
    }
  }

  const filteredPerformanceData = performanceData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Employee Performance</h1>
        <p className="text-[#919191] text-sm">Track submission rates, on-time performance, and missed report dates</p>
      </div>

      <div className="flex items-center gap-3 bg-[#0D0D0D] rounded-2xl px-4 py-3 border border-[#1F1F1F]">
        <Search className="h-5 w-5 text-[#919191]" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none placeholder-[#919191] text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#919191] text-sm mb-2">Excellent Performers</p>
              <p className="text-3xl font-bold text-[#86efac]">2</p>
            </div>
            <CheckCircle className="h-8 w-8 text-[#86efac]" />
          </div>
        </div>
        <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#919191] text-sm mb-2">Good Performers</p>
              <p className="text-3xl font-bold text-[#60a5fa]">1</p>
            </div>
            <TrendingUp className="h-8 w-8 text-[#60a5fa]" />
          </div>
        </div>
        <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#919191] text-sm mb-2">Needs Improvement</p>
              <p className="text-3xl font-bold text-[#fbbf24]">2</p>
            </div>
            <AlertCircle className="h-8 w-8 text-[#fbbf24]" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredPerformanceData.map((employee) => (
          <div key={employee.id} className={`rounded-2xl border transition-all ${getStatusColor(employee.status)}`}>
            <button
              onClick={() => setExpandedId(expandedId === employee.id ? null : employee.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-black/20 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(employee.status)}
                <div className="text-left flex-1">
                  <h3 className="text-white font-semibold">{employee.name}</h3>
                  <p className="text-[#919191] text-sm">{employee.department}</p>
                </div>
                <div className="flex items-center gap-6 mr-4">
                  <div className="text-right">
                    <p className="text-[#919191] text-xs mb-1">Submission Rate</p>
                    <p className="text-white font-bold">{employee.submissionRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#919191] text-xs mb-1">On-Time</p>
                    <p className="text-[#86efac] font-bold">{employee.onTimeCount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#919191] text-xs mb-1">Missed</p>
                    <p className="text-[#f87171] font-bold">{employee.missedCount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#919191] text-xs mb-1">Status</p>
                    <span className="text-white text-sm font-medium">{getStatusLabel(employee.status)}</span>
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#919191] transition-transform ${
                  expandedId === employee.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedId === employee.id && (
              <div className="border-t border-current/20 px-6 py-4 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#86efac]" />
                      Last Submitted
                    </h4>
                    <p className="text-[#919191]">{employee.lastSubmitted}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-[#fbbf24]" />
                      Missed Report Dates ({employee.missedCount})
                    </h4>
                    {employee.missedDates.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {employee.missedDates.map((date) => (
                          <span
                            key={date}
                            className="px-3 py-1 bg-[#f87171]/20 border border-[#f87171]/50 text-[#f87171] text-xs rounded-lg"
                          >
                            {date}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#86efac]">No missed reports</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
