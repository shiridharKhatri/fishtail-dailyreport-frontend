"use client"

import type React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import DragDropFileUpload from "@/components/drag-drop-file-upload"
import GlassBackground from "@/components/glass-background"
import Navbar from "@/components/navbar"
import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/services/axiosInstance"
import { Calendar, CheckCircle2, Search, Edit2, X, FileDown } from "lucide-react"
import { Toaster, toast } from "sonner"
import Cookies from "js-cookie"
import { LoadingButton } from "@/components/ui/loading-button"

interface ApiReport {
  edited: boolean
  _id: string
  userId: string
  reportDate: "today" | "yesterday"
  activity: string
  attachment: string[]
  hasAttachment: boolean
  lastUpdatedAt: string
}

interface Report {
  edited: any
  id: string
  date: "today" | "yesterday"
  dateLabel: string
  activities: string
  filesCount: number
  timestamp: Date
  files: (File | string)[]
}

export default function EmployeeDashboard() {
  const { user } = useAuth()

  const getDynamicDateLabel = (type: "today" | "yesterday") => {
    const date = new Date()
    if (type === "yesterday") date.setDate(date.getDate() - 1)
    return `${type === "today" ? "Today" : "Yesterday"} (${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })})`
  }

  const token = Cookies.get("employee_token")

  const [reportDate, setReportDate] = useState<"today" | "yesterday">("today")
  const [activities, setActivities] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editActivities, setEditActivities] = useState("")
  const [editNewFiles, setEditNewFiles] = useState<File[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "today" | "with-files">("all")
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [isEditingReport, setIsEditingReport] = useState(false)

  const handleFetchReports = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/report/employee/getReports`, {
        headers: {
          "auth-token": token,
        },
      })

      if (response.data.success) {
        const mappedReports: Report[] = response.data.reports.map((apiReport: ApiReport) => ({
          id: apiReport._id,
          date: apiReport.reportDate,
          dateLabel: apiReport.reportDate === "today" ? getDynamicDateLabel("today") : getDynamicDateLabel("yesterday"),
          activities: apiReport.activity,
          filesCount: apiReport.attachment ? apiReport.attachment.length : 0,
          timestamp: new Date(apiReport.lastUpdatedAt),
          files: apiReport.attachment || [],
          edited: apiReport.edited || false,
        }))
        setReports(mappedReports)
      }
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Failed to load reports")
    }
  }, [])

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activities.trim()) return

    setIsSubmittingReport(true)
    try {
      const data = new FormData()
      data.append("reportDate", reportDate)
      data.append("activity", activities)
      if (uploadedFiles && uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          data.append("attachment", file)
        })
      }

      const response = await axiosInstance.post(`/api/report/employee/submit`, data, {
        headers: { "Content-Type": "multipart/form-data", "auth-token": token },
      })

      if (response.data.success) {
        toast.success("Report submitted successfully!")
        setActivities("")
        setUploadedFiles([])
        handleFetchReports()
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to submit report. Please try again.")
    } finally {
      setIsSubmittingReport(false)
    }
  }

  const editReport = async (id: string) => {
    setIsEditingReport(true)
    try {
      const data = new FormData()
      data.append("reportId", id as string)
      data.append("activity", editActivities)
      if (editNewFiles.length > 0) {
        editNewFiles.forEach((file) => data.append("attachment", file))
      }

      const response = await axiosInstance.put(`/api/report/employee/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data", "auth-token": token },
      })

      if (response.data.success) {
        toast.success("Report updated successfully!")
        setEditingId(null)
        handleFetchReports()
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update report.")
    } finally {
      setIsEditingReport(false)
    }
  }

  const startEdit = (report: Report) => {
    setEditingId(report.id)
    setEditActivities(report.activities)
    setEditNewFiles([])
  }

  const completionPercentage = useMemo(() => {
    const DAYS_TO_TRACK = 26
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    const startDate = new Date()
    startDate.setDate(today.getDate() - DAYS_TO_TRACK)
    startDate.setHours(0, 0, 0, 0)

    let expectedWorkingDays = 0
    const loopDate = new Date(startDate)

    while (loopDate <= today) {
      const dayOfWeek = loopDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        expectedWorkingDays++
      }
      loopDate.setDate(loopDate.getDate() + 1)
    }

    if (expectedWorkingDays === 0) return 0

    const submittedDates = new Set()

    reports.forEach((report) => {
      const reportDate = new Date(report.timestamp)
      if (reportDate >= startDate && reportDate <= today) {
        submittedDates.add(reportDate.toDateString())
      }
    })

    const percentage = Math.round((submittedDates.size / expectedWorkingDays) * 100)
    return Math.min(percentage, 100)
  }, [reports])

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.activities.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "today") {
      return matchesSearch && report.date === "today"
    } else if (activeFilter === "with-files") {
      return matchesSearch && report.filesCount > 0
    }
    return matchesSearch
  })

  const canEditReport = (report: Report) => report.date === "today"

  useEffect(() => {
    handleFetchReports()
  }, [handleFetchReports])

  return (
    <>
      <div className="relative w-full min-h-screen">
        <GlassBackground />

        <div className="relative z-10">
          <Navbar {...({ userRole: "employee", userName: "" } as any)} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Today's Dashboard</h2>
              <p className="text-muted-foreground">Submit your daily progress and achievements</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Report Form */}
              <div className="lg:col-span-2">
                <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Submit Daily Report
                    </h3>
                  </div>

                  <form onSubmit={handleSubmitReport} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-3">Report Date</label>
                      <div className="flex gap-3">
                        {[
                          {
                            value: "today",
                            label: getDynamicDateLabel("today"),
                          },
                          {
                            value: "yesterday",
                            label: getDynamicDateLabel("yesterday"),
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setReportDate(option.value as "today" | "yesterday")}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                              reportDate === option.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-input border border-border text-foreground hover:border-primary/50"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="activities" className="text-sm font-medium text-foreground block mb-2">
                        Daily Activities & Progress
                      </label>
                      <textarea
                        id="activities"
                        value={activities}
                        onChange={(e) => setActivities(e.target.value)}
                        placeholder="Describe your daily activities..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">{activities.length} characters written</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-3">Attach Files (Optional)</label>
                      <DragDropFileUpload onFilesChange={setUploadedFiles} />
                    </div>

                    <LoadingButton
                      type="submit"
                      isLoading={isSubmittingReport}
                      loadingText="Submitting..."
                      disabled={!activities.trim()}
                      className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Submit Report
                    </LoadingButton>
                  </form>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Recent Reports
                  </h3>
                </div>

                {reports.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Reports</p>
                      <p className="text-xl font-bold text-primary mt-1">{reports.length}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-accent/50 border border-border">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Completion (26 Days)
                      </p>
                      <p
                        className={`text-xl font-bold mt-1 ${
                          completionPercentage === 100
                            ? "text-green-500"
                            : completionPercentage >= 80
                              ? "text-primary"
                              : "text-orange-500"
                        }`}
                      >
                        {completionPercentage}%
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="flex gap-2 text-xs overflow-x-auto pb-2">
                    {["all", "today", "with-files"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as any)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                          activeFilter === filter
                            ? "bg-primary/20 border border-primary/40 text-primary"
                            : "bg-accent/50 border border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {filter === "all" && `All (${reports.length})`}
                        {filter === "today" && `Today (${reports.filter((r) => r.date === "today").length})`}
                        {filter === "with-files" && `With Files (${reports.filter((r) => r.filesCount > 0).length})`}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredReports.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredReports.map((report) => (
                      <div
                        key={report.id}
                        onClick={() => setSelectedReport(report)}
                        className="p-4 rounded-lg bg-accent/50 border border-border hover:border-primary/50 hover:bg-accent/70 transition-all cursor-pointer group space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <p className="text-sm font-semibold text-foreground">{report.dateLabel}</p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 border border-primary/30 text-primary">
                                {report.filesCount > 0 ? "With Files" : "Text Only"}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1.5">
                              {report.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                              {report.activities}{" "}
                              <span className="text-muted-foreground ">{report.edited ? "(Edited)" : ""}</span>
                            </p>
                          </div>
                          {canEditReport(report) && (
                            <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  startEdit(report)
                                }}
                                className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10"
                                title="Edit report"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {report.filesCount > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-medium pt-2 border-t border-border/50">
                            <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                              <FileDown className="w-2.5 h-2.5 text-primary" />
                            </div>
                            <span className="text-foreground">
                              {report.filesCount} attachment
                              {report.filesCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {searchQuery ? "No reports match your search" : "No reports submitted yet"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {searchQuery
                        ? "Try adjusting your search query or filters"
                        : "Start your journey by submitting your first report"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Edit Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="glass rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Edit Report</h3>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={editActivities}
                onChange={(e) => setEditActivities(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                rows={5}
              />

              <div>
                <p className="text-sm font-medium mb-2">Add New Files</p>
                <DragDropFileUpload onFilesChange={setEditNewFiles} />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground font-medium text-sm transition-all hover:border-primary/50"
                >
                  Cancel
                </button>
                <LoadingButton
                  onClick={() => editReport(editingId)}
                  isLoading={isEditingReport}
                  loadingText="Saving..."
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all hover:bg-primary/90"
                >
                  Save Changes
                </LoadingButton>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors={true} />
    </>
  )
}
