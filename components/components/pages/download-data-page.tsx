"use client"

import { useState } from "react"
import { Download, FileJson, Sheet, Calendar } from "lucide-react"

export function DownloadDataPage() {
  const [exportFormat, setExportFormat] = useState<"excel" | "json">("excel")
  const [startDate, setStartDate] = useState("2025-11-15")
  const [endDate, setEndDate] = useState("2025-11-22")
  const [isDownloading, setIsDownloading] = useState(false)

  const dummyReports = [
    {
      id: 1,
      employee: "John Doe",
      department: "Engineering",
      date: "2025-11-22",
      activitySummary: "Completed API integration, reviewed PRs",
      attachment: "Yes",
      edited: "No",
      lastUpdated: "2025-11-22 08:00 AM",
    },
    {
      id: 2,
      employee: "Jane Smith",
      department: "Marketing",
      date: "2025-11-22",
      activitySummary: "Marketing campaign planning, client presentation",
      attachment: "No",
      edited: "Yes",
      lastUpdated: "2025-11-22 09:30 AM",
    },
    {
      id: 3,
      employee: "Mike Johnson",
      department: "Operations",
      date: "2025-11-21",
      activitySummary: "Database optimization, testing",
      attachment: "Yes",
      edited: "No",
      lastUpdated: "2025-11-21 05:00 PM",
    },
    {
      id: 4,
      employee: "Sarah Williams",
      department: "Engineering",
      date: "2025-11-21",
      activitySummary: "UI improvements, bug fixes",
      attachment: "Yes",
      edited: "Yes",
      lastUpdated: "2025-11-21 03:45 PM",
    },
    {
      id: 5,
      employee: "David Brown",
      department: "Design",
      date: "2025-11-20",
      activitySummary: "Mockups for new dashboard, design review",
      attachment: "Yes",
      edited: "No",
      lastUpdated: "2025-11-20 02:30 PM",
    },
  ]

  const filteredReports = dummyReports.filter((report) => {
    const reportDate = new Date(report.date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return reportDate >= start && reportDate <= end
  })

  const downloadExcel = () => {
    setIsDownloading(true)
    setTimeout(() => {
      const csv = [
        ["Employee", "Department", "Date", "Activity Summary", "Attachment", "Edited", "Last Updated"],
        ...filteredReports.map((r) => [
          r.employee,
          r.department,
          r.date,
          r.activitySummary,
          r.attachment,
          r.edited,
          r.lastUpdated,
        ]),
      ]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n")

      const blob = new Blob([csv], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `reports_${startDate}_to_${endDate}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      setIsDownloading(false)
    }, 500)
  }

  const downloadJSON = () => {
    setIsDownloading(true)
    setTimeout(() => {
      const jsonData = {
        exportDate: new Date().toISOString(),
        dateRange: {
          from: startDate,
          to: endDate,
        },
        totalReports: filteredReports.length,
        reports: filteredReports,
      }

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `reports_${startDate}_to_${endDate}.json`
      a.click()
      window.URL.revokeObjectURL(url)
      setIsDownloading(false)
    }, 500)
  }

  const handleExport = () => {
    if (exportFormat === "excel") {
      downloadExcel()
    } else {
      downloadJSON()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Download Reports</h1>
        <p className="text-[#919191] text-sm">Export employee reports in your preferred format</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Format */}
        <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
          <h2 className="text-xl font-bold text-white mb-6">Select Format</h2>
          <div className="space-y-4">
            <button
              onClick={() => setExportFormat("excel")}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                exportFormat === "excel" ? "border-[#86efac] bg-[#1F1F1F]" : "border-[#1F1F1F] hover:border-[#86efac]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Sheet className={`h-6 w-6 ${exportFormat === "excel" ? "text-[#86efac]" : "text-[#919191]"}`} />
                <span className="font-medium text-white">Excel (.csv)</span>
              </div>
              <p className="text-sm text-[#919191]">Export as spreadsheet format</p>
            </button>

            <button
              onClick={() => setExportFormat("json")}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                exportFormat === "json" ? "border-[#86efac] bg-[#1F1F1F]" : "border-[#1F1F1F] hover:border-[#86efac]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <FileJson className={`h-6 w-6 ${exportFormat === "json" ? "text-[#86efac]" : "text-[#919191]"}`} />
                <span className="font-medium text-white">JSON</span>
              </div>
              <p className="text-sm text-[#919191]">Export as JSON format</p>
            </button>
          </div>
        </div>

        <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
          <h2 className="text-xl font-bold text-white mb-6">Select Date Range</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#919191] mb-2 block">Start Date</label>
              <div className="flex items-center gap-3 bg-[#1F1F1F] rounded-lg p-3 border border-[#2F2F2F]">
                <Calendar className="h-5 w-5 text-[#919191]" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#919191] mb-2 block">End Date</label>
              <div className="flex items-center gap-3 bg-[#1F1F1F] rounded-lg p-3 border border-[#2F2F2F]">
                <Calendar className="h-5 w-5 text-[#919191]" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Summary and Button */}
      <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3">Export Summary</h3>
          <div className="space-y-2">
            <p className="text-[#919191] text-sm">
              <span className="text-white">Format:</span> {exportFormat.toUpperCase()}
            </p>
            <p className="text-[#919191] text-sm">
              <span className="text-white">Date Range:</span> {startDate} to {endDate}
            </p>
            <p className="text-[#919191] text-sm">
              <span className="text-white">Reports Found:</span> {filteredReports.length} reports
            </p>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={isDownloading || filteredReports.length === 0}
          className="w-full bg-[#86efac] text-black font-medium py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Downloading..." : `Download ${exportFormat.toUpperCase()}`}
        </button>
      </div>
    </div>
  )
}
