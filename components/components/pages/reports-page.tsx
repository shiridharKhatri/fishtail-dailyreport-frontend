"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Search, X, FileText } from "lucide-react"

interface Report {
  id: string
  employeeName: string
  date: string
  activitySummary: string
  hasAttachment: boolean
  edited: boolean
  lastUpdated: string
  department?: string
  email?: string
  attachmentUrl?: string
  attachmentName?: string
  fullDetails?: string
}

const mockReports: Report[] = [
  {
    id: "1",
    employeeName: "John Doe",
    date: "2025-11-22",
    activitySummary: "Completed API integration, reviewed PRs",
    hasAttachment: true,
    edited: false,
    lastUpdated: "2025-11-22 08:00 AM",
    department: "Engineering",
    email: "john.doe@company.com",
    attachmentUrl: "/api-integration-screenshot.jpg",
    attachmentName: "API Integration Screenshot",
    fullDetails:
      "Successfully integrated REST API endpoints. Reviewed 3 pull requests from team members. Updated documentation.",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    date: "2025-11-22",
    activitySummary: "Marketing campaign planning, client presentation",
    hasAttachment: false,
    edited: true,
    lastUpdated: "2025-11-22 09:30 AM",
    department: "Marketing",
    email: "jane.smith@company.com",
    fullDetails: "Planned Q1 marketing campaign strategy. Conducted client presentation on brand positioning.",
  },
  {
    id: "3",
    employeeName: "Mike Johnson",
    date: "2025-11-21",
    activitySummary: "Database optimization, testing",
    hasAttachment: true,
    edited: false,
    lastUpdated: "2025-11-21 05:00 PM",
    department: "Engineering",
    email: "mike.johnson@company.com",
    attachmentUrl: "/database-optimization-report.jpg",
    attachmentName: "Database Optimization Report",
    fullDetails:
      "Optimized 5 critical database queries. Improved query performance by 40%. Completed integration testing.",
  },
]

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [filters, setFilters] = useState({
    employee: "",
    date: "",
    status: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showAttachment, setShowAttachment] = useState(false)

  const filteredReports = reports.filter((report) => {
    const matchesEmployee =
      !filters.employee || report.employeeName.toLowerCase().includes(filters.employee.toLowerCase())
    const matchesDate = !filters.date || report.date === filters.date
    const matchesSearch = !searchTerm || report.activitySummary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesEmployee && matchesDate && matchesSearch
  })

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setReports(reports.filter((r) => r.id !== id))
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setShowAttachment(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-[#919191] text-sm">View and manage all submitted daily reports</p>
      </div>

      {/* Filters */}
      <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1F1F1F]">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 flex items-center gap-2 bg-[#1F1F1F] rounded-lg px-4 py-2">
            <Search className="h-4 w-4 text-[#919191]" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-[#919191] outline-none flex-1 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Filter by employee..."
            value={filters.employee}
            onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
            className="bg-[#1F1F1F] text-white placeholder-[#919191] outline-none px-4 py-2 rounded-lg text-sm"
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="bg-[#1F1F1F] text-white placeholder-[#919191] outline-none px-4 py-2 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F1F1F]">
                <th className="px-6 py-4 text-left text-[#919191]">Employee</th>
                <th className="px-6 py-4 text-left text-[#919191]">Date</th>
                <th className="px-6 py-4 text-left text-[#919191]">Activity Summary</th>
                <th className="px-6 py-4 text-left text-[#919191]">Attachment</th>
                <th className="px-6 py-4 text-left text-[#919191]">Edited</th>
                <th className="px-6 py-4 text-left text-[#919191]">Last Updated</th>
                <th className="px-6 py-4 text-left text-[#919191]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => handleViewReport(report)}
                  className="border-b border-[#1F1F1F] hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-white">{report.employeeName}</td>
                  <td className="px-6 py-4 text-[#919191]">{report.date}</td>
                  <td className="px-6 py-4 text-[#919191] max-w-xs truncate">{report.activitySummary}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm cursor-pointer ${report.hasAttachment ? "text-[#86efac] hover:underline" : "text-[#919191]"}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (report.hasAttachment) {
                          handleViewReport(report)
                          setShowAttachment(true)
                        }
                      }}
                    >
                      {report.hasAttachment ? "✓ Yes" : "✗ No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.edited ? "bg-[#fbbf24] text-black" : "bg-[#1F1F1F] text-[#919191]"
                      }`}
                    >
                      {report.edited ? "YES" : "NO"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#919191] text-xs">{report.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleDelete(report.id, e)}
                        className="p-1 hover:bg-[#1F1F1F] rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-[#f87171]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-[#0D0D0D] rounded-2xl border border-[#1F1F1F] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0D0D0D] border-b border-[#1F1F1F] px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Report Details</h2>
                <p className="text-[#919191] text-sm mt-1">{selectedReport.employeeName}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-[#919191]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {!showAttachment ? (
                <div className="space-y-6">
                  {/* Employee Info */}
                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1F1F1F]">
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Employee Name</p>
                      <p className="text-white font-medium">{selectedReport.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{selectedReport.email}</p>
                    </div>
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Department</p>
                      <p className="text-white font-medium">{selectedReport.department}</p>
                    </div>
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Report Date</p>
                      <p className="text-white font-medium">{selectedReport.date}</p>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div>
                    <p className="text-[#919191] text-sm mb-2">Activity Summary</p>
                    <p className="text-white leading-relaxed">{selectedReport.activitySummary}</p>
                  </div>

                  {/* Full Details */}
                  <div>
                    <p className="text-[#919191] text-sm mb-2">Full Details</p>
                    <p className="text-[#919191] leading-relaxed">{selectedReport.fullDetails}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#1F1F1F]">
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Last Updated</p>
                      <p className="text-white font-medium text-sm">{selectedReport.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-[#919191] text-sm mb-1">Edited</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                          selectedReport.edited ? "bg-[#fbbf24] text-black" : "bg-[#1F1F1F] text-[#919191]"
                        }`}
                      >
                        {selectedReport.edited ? "YES" : "NO"}
                      </span>
                    </div>
                  </div>

                  {/* Attachment Section */}
                  {selectedReport.hasAttachment && (
                    <div className="pt-6 border-t border-[#1F1F1F]">
                      <button
                        onClick={() => setShowAttachment(true)}
                        className="flex items-center gap-2 px-4 py-3 bg-[#86efac] hover:bg-[#65e897] text-black rounded-lg font-medium transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        View Attachment: {selectedReport.attachmentName}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowAttachment(false)}
                    className="flex items-center gap-2 text-[#86efac] hover:text-[#65e897] transition-colors mb-4"
                  >
                    <X className="h-4 w-4" />
                    Back to Details
                  </button>
                  <div className="bg-[#1F1F1F] rounded-lg p-4">
                    <p className="text-white font-medium mb-4">{selectedReport.attachmentName}</p>
                    <img
                      src={selectedReport.attachmentUrl || "/placeholder.svg"}
                      alt={selectedReport.attachmentName}
                      className="w-full rounded-lg max-h-[60vh] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
