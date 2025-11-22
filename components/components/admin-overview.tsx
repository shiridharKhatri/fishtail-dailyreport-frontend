"use client"

import { Users, FileText, AlertCircle, TrendingUp } from "lucide-react"
import { SubmissionChart } from "@/components/components/submission-chart"
import { SubmissionTrendChart } from "@/components/components/submission-trend-chart"

export function AdminOverview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-[#0D0D0D] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">Total Employees</span>
              <div className="text-4xl font-bold text-white mt-2">42</div>
            </div>
            <Users className="h-8 w-8 text-[#86efac]" />
          </div>
        </div>

        <div className="p-6 bg-[#0D0D0D] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">Reports Today</span>
              <div className="text-4xl font-bold text-white mt-2">38</div>
            </div>
            <FileText className="h-8 w-8 text-[#86efac]" />
          </div>
        </div>

        <div className="p-6 bg-[#0D0D0D] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">Missing Today</span>
              <div className="text-4xl font-bold text-[#F87171] mt-2">4</div>
            </div>
            <AlertCircle className="h-8 w-8 text-[#F87171]" />
          </div>
        </div>

        <div className="p-6 bg-[#0D0D0D] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">This Week</span>
              <div className="text-4xl font-bold text-[#86efac] mt-2">267</div>
            </div>
            <TrendingUp className="h-8 w-8 text-[#86efac]" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <SubmissionChart />
      <SubmissionTrendChart />
    </div>
  )
}
