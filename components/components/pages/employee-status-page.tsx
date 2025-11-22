"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface MissingEmployee {
  id: string
  name: string
  department: string
  lastSubmission: string
}

const missingToday: MissingEmployee[] = [
  {
    id: "1",
    name: "Sarah Davis",
    department: "HR",
    lastSubmission: "2025-11-21",
  },
  {
    id: "2",
    name: "Tom Wilson",
    department: "Sales",
    lastSubmission: "2025-11-20",
  },
]

const missingWeek: MissingEmployee[] = [
  {
    id: "1",
    name: "Sarah Davis",
    department: "HR",
    lastSubmission: "2025-11-21",
  },
  {
    id: "2",
    name: "Tom Wilson",
    department: "Sales",
    lastSubmission: "2025-11-18",
  },
  {
    id: "3",
    name: "Lisa Brown",
    department: "Operations",
    lastSubmission: "2025-11-19",
  },
]

const missingMonth: MissingEmployee[] = [
  {
    id: "1",
    name: "Sarah Davis",
    department: "HR",
    lastSubmission: "2025-11-21",
  },
  {
    id: "2",
    name: "Tom Wilson",
    department: "Sales",
    lastSubmission: "2025-11-15",
  },
  {
    id: "3",
    name: "Lisa Brown",
    department: "Operations",
    lastSubmission: "2025-11-10",
  },
]

type TimeFrame = "today" | "week" | "month"

export function EmployeeStatusPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("today")

  const getDisplayData = () => {
    switch (timeFrame) {
      case "week":
        return missingWeek
      case "month":
        return missingMonth
      default:
        return missingToday
    }
  }

  const displayData = getDisplayData()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Employee Status</h1>
        <p className="text-[#919191] text-sm">Track employees who haven't submitted today</p>
      </div>

      {/* Time Frame Toggle */}
      <div className="flex gap-4">
        {(["today", "week", "month"] as TimeFrame[]).map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeFrame(frame)}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              timeFrame === frame
                ? "bg-[#86efac] text-black"
                : "bg-[#0D0D0D] text-[#919191] border border-[#1F1F1F] hover:text-white"
            }`}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        ))}
      </div>

      {/* Missing Employees */}
      <div className="space-y-3">
        {displayData.map((emp) => (
          <div
            key={emp.id}
            className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F] flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <AlertCircle className="h-6 w-6 text-[#f87171]" />
              <div>
                <p className="text-white font-medium">{emp.name}</p>
                <p className="text-sm text-[#919191]">
                  {emp.department} • Last submitted: {emp.lastSubmission}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#86efac] text-black rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
              Send Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
