"use client"

import { User, FileText, CheckCircle } from "lucide-react"

interface RecentActivity {
  id: string
  type: "report_submitted" | "user_approved" | "report_edited" | "employee_added"
  description: string
  timestamp: string
  actor: string
}

const mockRecents: RecentActivity[] = [
  {
    id: "1",
    type: "report_submitted",
    description: "John Doe submitted daily report",
    timestamp: "2025-11-22 10:30 AM",
    actor: "John Doe",
  },
  {
    id: "2",
    type: "user_approved",
    description: "Mike Johnson's account was approved",
    timestamp: "2025-11-22 09:15 AM",
    actor: "Admin",
  },
  {
    id: "3",
    type: "report_edited",
    description: "Jane Smith edited her daily report",
    timestamp: "2025-11-22 08:45 AM",
    actor: "Jane Smith",
  },
  {
    id: "4",
    type: "employee_added",
    description: "New employee Sarah Davis was added",
    timestamp: "2025-11-21 04:00 PM",
    actor: "Admin",
  },
  {
    id: "5",
    type: "report_submitted",
    description: "Mike Johnson submitted daily report",
    timestamp: "2025-11-21 05:30 PM",
    actor: "Mike Johnson",
  },
]

export function RecentsPage() {
  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "report_submitted":
        return <FileText className="h-5 w-5" />
      case "user_approved":
        return <CheckCircle className="h-5 w-5" />
      case "report_edited":
        return <FileText className="h-5 w-5" />
      case "employee_added":
        return <User className="h-5 w-5" />
    }
  }

  const getActivityColor = (type: RecentActivity["type"]) => {
    switch (type) {
      case "report_submitted":
        return "text-[#86efac]"
      case "user_approved":
        return "text-[#86efac]"
      case "report_edited":
        return "text-[#60a5fa]"
      case "employee_added":
        return "text-[#fbbf24]"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Recent Activity</h1>
        <p className="text-[#919191] text-sm">Track all recent actions in the system</p>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {mockRecents.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-full bg-[#0D0D0D] border border-[#1F1F1F] ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              {idx < mockRecents.length - 1 && <div className="w-0.5 h-12 bg-[#1F1F1F] my-2" />}
            </div>
            <div className="bg-[#0D0D0D] rounded-2xl p-6 flex-1 border border-[#1F1F1F]">
              <div className="flex justify-between items-start mb-2">
                <p className="text-white font-medium">{activity.description}</p>
                <span className="text-xs text-[#919191]">{activity.timestamp}</span>
              </div>
              <p className="text-sm text-[#919191]">by {activity.actor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
