"use client"

import type React from "react"
import { useState } from "react"
import {
  Eye,
  Users,
  FileText,
  Clock,
  BarChart3,
  AlertCircle,
  PlusCircle,
  UserPlus,
  Download,
  Settings2,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from "lucide-react"

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

interface AdminSidebarProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

export function AdminSidebar({ currentPage, onPageChange }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (page: PageType) => currentPage === page

  const navItem = (icon: React.ReactNode, label: string, page: PageType) => (
    <button
      onClick={() => {
        onPageChange(page)
        setIsMobileMenuOpen(false)
      }}
      className={`flex items-center gap-4 transition-colors cursor-pointer w-full text-left ${
        isActive(page) ? "text-[#E7E7E7]" : "text-[#919191] hover:text-[#E7E7E7]"
      }`}
    >
      {icon}
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </button>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-[#86efac] text-black rounded-full hover:bg-[#6ee598] transition-colors shadow-lg"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30 pt-24" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky md:top-24 left-0 top-0 h-screen md:h-[calc(100vh-8rem)] w-56 md:w-48 lg:w-64 bg-[#0D0D0D] rounded-2xl md:rounded-2xl flex flex-col p-8  z-40 transition-transform duration-300 md:translate-x-0 overflow-y-scroll scrollbar-hide! ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="flex flex-col gap-8">
          {navItem(<Eye className="h-6 w-6" />, "OVERVIEW", "overview")}
          {navItem(<Users className="h-6 w-6" />, "USERS", "users")}
          {navItem(<FileText className="h-6 w-6" />, "REPORTS", "reports")}
          {navItem(<Clock className="h-6 w-6" />, "RECENTS", "recents")}
          {navItem(<BarChart3 className="h-6 w-6" />, "ANALYTICS", "analytics")}
          {navItem(<AlertCircle className="h-6 w-6" />, "EMPLOYEE STATUS", "employee-status")}
          {navItem(<TrendingUp className="h-6 w-6" />, "PERFORMANCE", "employee-performance")}
        </nav>

        <div className="mt-6 pt-6 border-t border-[#1F1F1F] flex flex-col gap-8">
          {navItem(<PlusCircle className="h-6 w-6" />, "CREATE REPORT", "create-report")}
          {navItem(<UserPlus className="h-6 w-6" />, "ADD EMPLOYEE", "add-employee")}
          {navItem(<Download className="h-6 w-6" />, "DOWNLOAD DATA", "download-data")}
          {navItem(<Settings2 className="h-6 w-6" />, "ADMIN SETTINGS", "admin-settings")}
          <button className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer w-full text-left">
            <LogOut className="h-6 w-6" />
            <span className="text-sm font-medium tracking-wide">LOGOUT</span>
          </button>
        </div>
      </aside>
    </>
  )
}
