"use client";

import type React from "react";

import { useState } from "react";
import GlassBackground from "@/components/glass-background";
import {
  BarChart3,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Search,
  X,
  ImageIcon,
  File,
  FileDown,
  Menu,
  UserPlus,
  FileUp,
  Bell,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/navbar";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

interface Attachment {
  name: string;
  type: "image" | "document" | "other";
  url?: string;
  data?: string;
}

interface Report {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  activities: string;
  status: "submitted" | "pending" | "overdue";
  attachments: Attachment[];
  timestamp: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedDate, setSelectedDate] = useState("week");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddSubmission, setShowAddSubmission] = useState(false);
  const [showReportDetails, setShowReportDetails] = useState<Report | null>(
    null
  );
  const [showImageViewer, setShowImageViewer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Employee",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Employee",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Employee",
      status: "active",
      joinDate: "2024-03-10",
    },
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Doe",
      date: "2025-11-13",
      activities:
        "Completed API integration task. Added OAuth2 authentication. Documented all changes.",
      status: "submitted",
      attachments: [
        { name: "Screenshot.png", type: "image", data: "/api-integration.jpg" },
        { name: "integration_report.pdf", type: "document" },
      ],
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Jane Smith",
      date: "2025-11-13",
      activities:
        "Worked on database optimization. Improved query performance by 40%. Created indexes.",
      status: "submitted",
      attachments: [
        { name: "optimization_analysis.xlsx", type: "document" },
        {
          name: "performance_chart.png",
          type: "image",
          data: "/database-performance.jpg",
        },
      ],
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Mike Johnson",
      date: "2025-11-12",
      activities:
        "Fixed critical bugs in production. Patched security vulnerabilities.",
      status: "submitted",
      attachments: [
        { name: "bug_fixes.pdf", type: "document" },
        { name: "security_patch.zip", type: "other" },
      ],
      timestamp: "Yesterday",
    },
  ]);

  const stats = [
    {
      label: "Total Users",
      value: employees.length.toString(),
      icon: Users,
      trend: "+2",
      isPositive: true,
    },
    {
      label: "Total Reports",
      value: reports.length.toString(),
      icon: FileText,
      trend: "+5",
      isPositive: true,
    },
    {
      label: "Submitted Today",
      value: "2",
      icon: CheckCircle2,
      trend: "+2",
      isPositive: true,
    },
    {
      label: "Pending Reports",
      value: "0",
      icon: Clock,
      trend: "0",
      isPositive: true,
    },
  ];

  const analyticsData = [
    { day: "Mon", submitted: 24, pending: 4, overdue: 1 },
    { day: "Tue", submitted: 19, pending: 3, overdue: 2 },
    { day: "Wed", submitted: 22, pending: 4, overdue: 1 },
    { day: "Thu", submitted: 28, pending: 2, overdue: 0 },
    { day: "Fri", submitted: 31, pending: 5, overdue: 3 },
    { day: "Sat", submitted: 18, pending: 2, overdue: 1 },
    { day: "Sun", submitted: 14, pending: 3, overdue: 2 },
  ];

  const statusData = [
    { name: "Submitted", value: 89, color: "#10b981" },
    { name: "Pending", value: 12, color: "#f59e0b" },
    { name: "Overdue", value: 5, color: "#ef4444" },
  ];

  const userStatusData = [
    {
      name: "Active",
      value: employees.filter((u) => u.status === "active").length,
      color: "#10b981",
    },
    {
      name: "Inactive",
      value: employees.filter((u) => u.status === "inactive").length,
      color: "#6b7280",
    },
  ];

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: Employee = {
      id: employees.length + 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: "Employee",
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setEmployees([...employees, newUser]);
    setShowAddUser(false);
    setShowMobileMenu(false);
    e.currentTarget.reset();
  };

  const handleAddSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReport: Report = {
      id: reports.length + 1,
      employeeId: Number.parseInt(formData.get("employeeId") as string),
      employeeName:
        employees.find(
          (u) => u.id === Number.parseInt(formData.get("employeeId") as string)
        )?.name || "",
      date: new Date().toISOString().split("T")[0],
      activities: formData.get("activities") as string,
      status: "submitted",
      attachments: [],
      timestamp: "Just now",
    };
    setReports([newReport, ...reports]);
    setShowAddSubmission(false);
    setShowMobileMenu(false);
    e.currentTarget.reset();
  };

  const handleDownloadAttachment = (attachment: Attachment) => {
    if (attachment.type !== "image") {
      const link = document.createElement("a");
      link.href = attachment.data || "#";
      link.download = attachment.name;
      link.click();
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.activities.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "recent", label: "Recent", icon: Clock },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="relative w-full min-h-screen">
      <GlassBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: Logo and Profile */}
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-500" />
                </div>
                <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                  Admin Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-foreground">
                        Admin User
                      </p>
                      <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg py-2 space-y-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent/50 transition-colors">
                        Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent/50 transition-colors">
                        Settings
                      </button>
                      <div className="border-t border-border my-1" />
                      <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white/90 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Tabs and Actions */}

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden border-t border-border/50 py-4 space-y-3">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/50"
                            : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-border/50 pt-3 space-y-2">
                  <button
                    onClick={() => {
                      setShowAddUser(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSubmission(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-sm font-medium"
                  >
                    <FileUp className="w-4 h-4" />
                    Add Submission
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

  

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor reports, manage users, and track team performance
            </p>
          </div>

          {/* Stats Grid - visible on Overview tab */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    )}
                    <p className="text-xs font-medium text-white/50">
                      {stat.trend} from last week
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs Content */}
          <div className="space-y-6">
            {/* Overview Tab */}
            {/* {activeTab === "overview" && ( */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="lg:col-span-2 glass rounded-2xl p-4 sm:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      Report Submission Trends
                    </h3>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-emerald-500/30"
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>

                  <div className="h-80 -mx-2 sm:-mx-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analyticsData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.08)"
                        />
                        <XAxis
                          dataKey="day"
                          stroke="rgba(255,255,255,0.3)"
                          style={{ fontSize: "12px" }}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.3)"
                          style={{ fontSize: "12px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            borderRadius: "8px",
                          }}
                          cursor={{ fill: "rgba(16, 185, 129, 0.05)" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar
                          dataKey="submitted"
                          fill="#10b981"
                          name="Submitted"
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar
                          dataKey="pending"
                          fill="#f59e0b"
                          name="Pending"
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar
                          dataKey="overdue"
                          fill="#ef4444"
                          name="Overdue"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Status Pie Chart */}
                <div className="glass rounded-2xl p-4 sm:p-6 space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Status Distribution
                  </h3>

                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {statusData.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <p className="text-xs sm:text-sm font-medium text-white/70">
                              {item.name}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-white/60">
                            {item.value}
                          </p>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(item.value / 106) * 100}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-between py-4 ">
                <div className="flex items-center gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/50"
                            : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                  <button
                    onClick={() => setShowAddSubmission(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-sm font-medium"
                  >
                    <FileUp className="w-4 h-4" />
                    Add Submission
                  </button>
                </div>
              </div>
            </div>
            {/* )} */}

            {/* Recent Reports */}
            {activeTab === "recent" && (
              <div className="glass rounded-2xl p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Recent Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab("reports")}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground text-xs sm:text-sm hover:bg-white/10 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View All
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reports.slice(0, 5).map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setShowReportDetails(report)}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all cursor-pointer group"
                    >
                      {report.status === "submitted" ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : report.status === "pending" ? (
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                          <p className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                            {report.employeeName}
                          </p>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium w-fit"
                            style={{
                              backgroundColor:
                                report.status === "submitted"
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : report.status === "pending"
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : "rgba(239, 68, 68, 0.1)",
                              color:
                                report.status === "submitted"
                                  ? "#10b981"
                                  : report.status === "pending"
                                  ? "#f59e0b"
                                  : "#ef4444",
                            }}
                          >
                            {report.status.charAt(0).toUpperCase() +
                              report.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 mb-1">
                          {report.timestamp}
                        </p>
                        <p className="text-xs sm:text-sm text-white/60 line-clamp-1">
                          {report.activities}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="glass rounded-2xl p-4 sm:p-6 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-white/40 text-sm focus:outline-none focus:border-emerald-500/30"
                  />
                </div>

                <div className="space-y-3">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <div
                        key={report.id}
                        onClick={() => setShowReportDetails(report)}
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-white">
                              {report.employeeName}
                            </p>
                            <p className="text-xs text-white/50 mt-1">
                              {report.date} • {report.timestamp}
                            </p>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0"
                            style={{
                              backgroundColor:
                                report.status === "submitted"
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : report.status === "pending"
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : "rgba(239, 68, 68, 0.1)",
                              color:
                                report.status === "submitted"
                                  ? "#10b981"
                                  : report.status === "pending"
                                  ? "#f59e0b"
                                  : "#ef4444",
                            }}
                          >
                            {report.status.charAt(0).toUpperCase() +
                              report.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/70 mb-2">
                          {report.activities}
                        </p>
                        {report.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-white/50">
                            <FileDown className="w-3 h-3" />
                            {report.attachments.length} attachment(s)
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/60">No reports found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass rounded-2xl p-4 sm:p-6 space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    All Users ({employees.length})
                  </h3>

                  <div className="space-y-3">
                    {employees.map((employee) => (
                      <div
                        key={employee.id}
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-semibold text-white/90">
                              {employee.name}
                            </p>
                            <p className="text-xs text-white/50 mt-1">
                              {employee.email}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              Joined: {employee.joinDate}
                            </p>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 w-fit"
                            style={{
                              backgroundColor:
                                employee.status === "active"
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : "rgba(107, 114, 128, 0.1)",
                              color:
                                employee.status === "active"
                                  ? "#10b981"
                                  : "#6b7280",
                            }}
                          >
                            {employee.status.charAt(0).toUpperCase() +
                              employee.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-6">
                    User Status
                  </h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {userStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {userStatusData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <p className="text-xs sm:text-sm text-white/70">
                            {item.name}
                          </p>
                        </div>
                        <p className="font-semibold text-xs sm:text-sm text-white/90">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="glass rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-6">
                  Report Trends
                </h3>
                <div className="h-80 sm:h-96 -mx-2 sm:-mx-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analyticsData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <XAxis
                        dataKey="day"
                        stroke="rgba(255,255,255,0.3)"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="submitted"
                        stroke="#10b981"
                        name="Submitted"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#f59e0b"
                        name="Pending"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="overdue"
                        stroke="#ef4444"
                        name="Overdue"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Add New User
                </h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="p-1 text-white/50 hover:text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-white/40 text-sm focus:outline-none focus:border-emerald-500/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-white/40 text-sm focus:outline-none focus:border-emerald-500/30"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground font-medium text-sm transition-all hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Submission Modal */}
        {showAddSubmission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Add Submission
                </h3>
                <button
                  onClick={() => setShowAddSubmission(false)}
                  className="p-1 text-white/50 hover:text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmission} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Select Employee
                  </label>
                  <select
                    name="employeeId"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-emerald-500/30"
                  >
                    <option value="">Choose an employee...</option>
                    {employees.map((user) => (
                      <option
                        key={user.id}
                        value={user.id}
                        className="bg-gray-900"
                      >
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Activity Description
                  </label>
                  <textarea
                    name="activities"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-white/40 text-sm focus:outline-none focus:border-emerald-500/30 resize-none"
                    placeholder="Describe the activities completed..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddSubmission(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground font-medium text-sm transition-all hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all"
                  >
                    Add Submission
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Details Modal with Attachment Viewing */}
        {showReportDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-6 sm:p-8 w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {showReportDetails.employeeName}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    {showReportDetails.date}
                  </p>
                </div>
                <button
                  onClick={() => setShowReportDetails(null)}
                  className="p-1 text-white/50 hover:text-white/80 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-white/70 mb-2">Status</p>
                <span
                  className="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      showReportDetails.status === "submitted"
                        ? "rgba(16, 185, 129, 0.1)"
                        : showReportDetails.status === "pending"
                        ? "rgba(245, 158, 11, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                    color:
                      showReportDetails.status === "submitted"
                        ? "#10b981"
                        : showReportDetails.status === "pending"
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {showReportDetails.status.charAt(0).toUpperCase() +
                    showReportDetails.status.slice(1)}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-white/70 mb-2">
                  Activities & Notes
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {showReportDetails.activities}
                </p>
              </div>

              {showReportDetails.attachments.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-white/70 mb-3">
                    Attachments
                  </p>
                  <div className="space-y-2">
                    {showReportDetails.attachments.map((attachment, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (attachment.type === "image") {
                            setShowImageViewer(attachment.data || "");
                          } else {
                            handleDownloadAttachment(attachment);
                          }
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all cursor-pointer group"
                      >
                        {attachment.type === "image" ? (
                          <ImageIcon className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-300" />
                        ) : (
                          <File className="w-5 h-5 text-amber-400 flex-shrink-0 group-hover:text-amber-300" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate group-hover:text-white">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-white/50 mt-0.5">
                            {attachment.type === "image"
                              ? "Click to view"
                              : "Click to download"}
                          </p>
                        </div>
                        {attachment.type !== "image" && (
                          <FileDown className="w-4 h-4 text-white/40 flex-shrink-0 group-hover:text-white/60" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowReportDetails(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground font-medium text-sm transition-all hover:bg-white/10"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Viewer Modal */}
        {showImageViewer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={() => setShowImageViewer(null)}
                className="absolute -top-10 right-0 p-2 text-white hover:text-white/70 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={showImageViewer || "/placeholder.svg"}
                alt="Attachment preview"
                className="max-w-full max-h-[90vh] rounded-lg object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
