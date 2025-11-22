"use client"

import { useState } from "react"
import { Header } from "@/components/components/header"
import { AdminSidebar } from "@/components/components/admin-sidebar"
import { AdminOverview } from "@/components/components/admin-overview"
import { UsersPage } from "@/components/components/pages/users-page"
import { ReportsPage } from "@/components/components/pages/reports-page"
import { RecentsPage } from "@/components/components/pages/recents-page"
import { AnalyticsPage } from "@/components/components/pages/analytics-page"
import { EmployeeStatusPage } from "@/components/components/pages/employee-status-page"
import { CreateReportPage } from "@/components/components/pages/create-report-page"
import { AddEmployeePage } from "@/components/components/pages/add-employee-page"
import { DownloadDataPage } from "@/components/components/pages/download-data-page"
import { AdminSettingsPage } from "@/components/components/pages/admin-settings-page"
import { EmployeePerformancePage } from "@/components/components/pages/employee-performance-page"

type PageType =
  | "overview"
  | "users"
  | "reports"
  | "recents"
  | "analytics"
  | "employee-status"
  | "employee-performance"
  | "create-report"
  | "add-employee"
  | "download-data"
  | "admin-settings"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>("overview")

  const renderPage = () => {
    switch (currentPage) {
      case "users":
        return <UsersPage />
      case "reports":
        return <ReportsPage />
      case "recents":
        return <RecentsPage />
      case "analytics":
        return <AnalyticsPage />
      case "employee-status":
        return <EmployeeStatusPage />
      case "employee-performance":
        return <EmployeePerformancePage />
      case "create-report":
        return <CreateReportPage />
      case "add-employee":
        return <AddEmployeePage />
      case "download-data":
        return <DownloadDataPage />
      case "admin-settings":
        return <AdminSettingsPage />
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      <Header />

      {/* Main Scrollable Area */}
      <div className="h-full overflow-y-auto no-scrollbar">
        <main className="flex gap-6 p-6 pt-24 pb-24 md:pb-6 min-h-full">
          <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />

          {/* Main Content Container */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {renderPage()}

            {/* Status Indicator */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <div className="w-[13px] h-[13px] rounded-full bg-[#86efac]" />
              <span className="text-sm text-[#919191]">System Active</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
