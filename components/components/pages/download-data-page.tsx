"use client"

import { useState, useMemo } from "react"
import { Download, FileJson, Sheet, Calendar, Search } from "lucide-react"

export function DownloadDataPage() {
  const [exportFormat, setExportFormat] = useState<"excel" | "json">("excel")
  const [startDate, setStartDate] = useState("2025-11-15")
  const [endDate, setEndDate] = useState("2025-11-22")
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const dummyReports = [
    {
      id: 1,
      employee: "Ken kaneki",
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
    {
      id: 6,
      employee: "Emily Chen",
      department: "Engineering",
      date: "2025-11-22",
      activitySummary: "Code review and documentation",
      attachment: "No",
      edited: "No",
      lastUpdated: "2025-11-22 11:15 AM",
    },
    {
      id: 7,
      employee: "Alex Rodriguez",
      department: "Marketing",
      date: "2025-11-20",
      activitySummary: "Social media strategy and content planning",
      attachment: "Yes",
      edited: "Yes",
      lastUpdated: "2025-11-20 04:20 PM",
    },
  ]

  const uniqueEmployees = Array.from(new Set(dummyReports.map((r) => r.employee))).sort()

  const filteredEmployees = useMemo(() => {
    return uniqueEmployees.filter((emp) => emp.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredReports = dummyReports.filter((report) => {
    const reportDate = new Date(report.date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    const dateMatch = reportDate >= start && reportDate <= end
    const employeeMatch = selectedEmployee === "all" || selectedEmployee === report.employee
    return dateMatch && employeeMatch
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
        selectedEmployee: selectedEmployee === "all" ? "All Employees" : selectedEmployee,
        totalReports: filteredReports.length,
        reports: filteredReports,
      }

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      })
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
    <div className="flex flex-col gap-4">
      <div className="pb-2">
        <h1 className="text-2xl font-bold text-white mb-1">Download Reports</h1>
        <p className="text-[#919191] text-xs">Export employee reports in your preferred format</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Export Format */}
        <div className="bg-[#0D0D0D] rounded-2xl p-5 border border-[#1F1F1F]">
          <h2 className="text-lg font-bold text-white mb-4">Select Format</h2>
          <div className="space-y-3">
            <button
              onClick={() => setExportFormat("excel")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                exportFormat === "excel" ? "border-[#86efac] bg-[#1F1F1F]" : "border-[#1F1F1F] hover:border-[#86efac]"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <Sheet className={`h-5 w-5 ${exportFormat === "excel" ? "text-[#86efac]" : "text-[#919191]"}`} />
                <span className="font-medium text-white text-sm">Excel (.csv)</span>
              </div>
              <p className="text-xs text-[#919191] ml-8">Spreadsheet format</p>
            </button>

            <button
              onClick={() => setExportFormat("json")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                exportFormat === "json" ? "border-[#86efac] bg-[#1F1F1F]" : "border-[#1F1F1F] hover:border-[#86efac]"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <FileJson className={`h-5 w-5 ${exportFormat === "json" ? "text-[#86efac]" : "text-[#919191]"}`} />
                <span className="font-medium text-white text-sm">JSON</span>
              </div>
              <p className="text-xs text-[#919191] ml-8">JSON format</p>
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-[#0D0D0D] rounded-2xl p-5 border border-[#1F1F1F]">
          <h2 className="text-lg font-bold text-white mb-4">Select Date Range</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#919191] mb-2 block uppercase tracking-wide">Start Date</label>
              <div className="flex items-center gap-2 bg-[#1F1F1F] rounded-lg p-2.5 border border-[#2F2F2F] focus-within:border-[#86efac] transition-colors">
                <Calendar className="h-4 w-4 text-[#919191] flex-shrink-0" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-white outline-none w-full text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#919191] mb-2 block uppercase tracking-wide">End Date</label>
              <div className="flex items-center gap-2 bg-[#1F1F1F] rounded-lg p-2.5 border border-[#2F2F2F] focus-within:border-[#86efac] transition-colors">
                <Calendar className="h-4 w-4 text-[#919191] flex-shrink-0" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-white outline-none w-full text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="bg-[#0D0D0D] rounded-2xl p-5 border border-[#1F1F1F] flex flex-col">
          <h2 className="text-lg font-bold text-white mb-3">Select Employee</h2>

          <div className="flex items-center gap-2 bg-[#1F1F1F] rounded-lg p-2.5 border border-[#2F2F2F] mb-3">
            <Search className="h-4 w-4 text-[#919191] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white outline-none w-full placeholder-[#666666] text-sm"
            />
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-48 pr-2 scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#0D0D0D]">
            {/* All Employees Option */}
            <button
              onClick={() => setSelectedEmployee("all")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                selectedEmployee === "all"
                  ? "bg-[#86efac]/20 border border-[#86efac]"
                  : "bg-[#1F1F1F] border border-[#1F1F1F] hover:border-[#86efac]/50"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedEmployee === "all" ? "border-[#86efac] bg-[#86efac]" : "border-[#666666]"
                }`}
              >
                {selectedEmployee === "all" && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
              </div>
              <span className="font-medium text-white text-sm">All Employees</span>
            </button>

            {/* Individual Employee Options */}
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <button
                  key={emp}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                    selectedEmployee === emp
                      ? "bg-[#86efac]/20 border border-[#86efac]"
                      : "bg-[#1F1F1F] border border-[#1F1F1F] hover:border-[#86efac]/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedEmployee === emp ? "border-[#86efac] bg-[#86efac]" : "border-[#666666]"
                    }`}
                  >
                    {selectedEmployee === emp && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                  </div>
                  <span className="text-[#919191] text-sm">{emp}</span>
                </button>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-[#919191] text-xs">No employees found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Summary and Button */}
      <div className="bg-[#0D0D0D] rounded-2xl p-5 border border-[#1F1F1F]">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Export Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#1F1F1F] rounded-lg p-3">
              <p className="text-[#919191] text-xs uppercase mb-1">Format</p>
              <p className="text-white font-semibold text-sm">{exportFormat.toUpperCase()}</p>
            </div>
            <div className="bg-[#1F1F1F] rounded-lg p-3">
              <p className="text-[#919191] text-xs uppercase mb-1">Date Range</p>
              <p className="text-white font-semibold text-xs">{startDate}</p>
            </div>
            <div className="bg-[#1F1F1F] rounded-lg p-3">
              <p className="text-[#919191] text-xs uppercase mb-1">Employee</p>
              <p className="text-white font-semibold text-xs">
                {selectedEmployee === "all" ? "All" : selectedEmployee?.substring(0, 10)}
              </p>
            </div>
            <div className="bg-[#1F1F1F] rounded-lg p-3">
              <p className="text-[#919191] text-xs uppercase mb-1">Reports</p>
              <p className="text-white font-semibold text-sm">{filteredReports.length}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={isDownloading || filteredReports.length === 0}
          className="w-full bg-[#86efac] text-black font-medium py-2.5 rounded-lg hover:bg-[#6ee98c] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(134,239,172,0.3)] text-sm"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Downloading..." : `Download ${exportFormat.toUpperCase()}`}
        </button>
      </div>
    </div>
  )
}
