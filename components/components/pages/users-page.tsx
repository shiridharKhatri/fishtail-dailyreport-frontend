"use client"

import { useState } from "react"
import { Edit2, Trash2, CheckCircle, XCircle, Eye, X, Search } from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  googleId: string
  role: "fulltime" | "intern" | "pending"
  department: string
  location: string
  phone: string
  dateOfBirth: string
  joinedDate: string
  approved: boolean
  lastLogin: string
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Ken kaneki",
    email: "kaneki@example.com",
    googleId: "google123",
    role: "fulltime",
    department: "Engineering",
    location: "NYC",
    phone: "+1-234-567-8900",
    dateOfBirth: "1990-01-15",
    joinedDate: "2022-03-10",
    approved: true,
    lastLogin: "2025-11-22 10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    googleId: "google456",
    role: "fulltime",
    department: "Marketing",
    location: "SF",
    phone: "+1-234-567-8901",
    dateOfBirth: "1992-05-20",
    joinedDate: "2023-06-15",
    approved: true,
    lastLogin: "2025-11-22 09:15 AM",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    googleId: "google789",
    role: "intern",
    department: "Engineering",
    location: "NYC",
    phone: "+1-234-567-8902",
    dateOfBirth: "2001-10-10",
    joinedDate: "2025-09-01",
    approved: false,
    lastLogin: "2025-11-21 03:45 PM",
  },
]

export function UsersPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [viewMode, setViewMode] = useState<"view" | "edit">("view")
  const [editFormData, setEditFormData] = useState<Partial<Employee>>({})
  const [searchQuery, setSearchQuery] = useState("")

  const handleApprove = (id: string) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...e, approved: true } : e)))
  }

  const handleReject = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const handleEditClick = (emp: Employee) => {
    setSelectedEmployee(emp)
    setEditFormData({ ...emp })
    setViewMode("edit")
  }

  const handleSaveEdit = () => {
    if (selectedEmployee) {
      setEmployees(employees.map((e) => (e.id === selectedEmployee.id ? { ...e, ...editFormData } : e)))
      setSelectedEmployee(null)
      setViewMode("view")
    }
  }

  const handleInputChange = (field: keyof Employee, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const closeModal = () => {
    setSelectedEmployee(null)
    setViewMode("view")
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
        <p className="text-[#919191] text-sm">Manage all employees and their profiles</p>
      </div>

      <div className="flex items-center gap-3 bg-[#0D0D0D] rounded-2xl px-4 py-3 border border-[#1F1F1F]">
        <Search className="h-5 w-5 text-[#919191]" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none placeholder-[#919191] text-sm"
        />
      </div>

      <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden border border-[#1F1F1F]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F1F1F] bg-[#1F1F1F]/50">
                <th className="px-6 py-4 text-left text-[#919191]">Name</th>
                <th className="px-6 py-4 text-left text-[#919191]">Email</th>
                <th className="px-6 py-4 text-left text-[#919191]">Role</th>
                <th className="px-6 py-4 text-left text-[#919191]">Department</th>
                <th className="px-6 py-4 text-left text-[#919191]">Status</th>
                <th className="px-6 py-4 text-left text-[#919191]">Last Login</th>
                <th className="px-6 py-4 text-left text-[#919191]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-[#1F1F1F] hover:bg-[#1F1F1F]/30 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{emp.name}</td>
                  <td className="px-6 py-4 text-[#919191]">{emp.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.role === "fulltime"
                          ? "bg-[#86efac] text-black"
                          : emp.role === "intern"
                            ? "bg-[#60a5fa] text-white"
                            : "bg-[#fbbf24] text-black"
                      }`}
                    >
                      {emp.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#919191]">{emp.department}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.approved ? "bg-[#86efac] text-black" : "bg-[#f87171] text-white"
                      }`}
                    >
                      {emp.approved ? "APPROVED" : "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#919191] text-xs">{emp.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp)
                          setViewMode("view")
                        }}
                        className="p-1.5 hover:bg-[#1F1F1F] rounded transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4 text-[#86efac]" />
                      </button>
                      <button
                        onClick={() => handleEditClick(emp)}
                        className="p-1.5 hover:bg-[#1F1F1F] rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4 text-[#60a5fa]" />
                      </button>
                      {!emp.approved && (
                        <>
                          <button
                            onClick={() => handleApprove(emp.id)}
                            className="p-1.5 hover:bg-[#1F1F1F] rounded transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4 text-[#86efac]" />
                          </button>
                          <button
                            onClick={() => handleReject(emp.id)}
                            className="p-1.5 hover:bg-[#1F1F1F] rounded transition-colors"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4 text-[#f87171]" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-1.5 hover:bg-[#1F1F1F] rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-[#f87171]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-[#919191]">
              <p>No employees found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D0D] rounded-2xl border border-[#1F1F1F] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 flex justify-between items-center p-8 border-b border-[#1F1F1F] bg-[#0D0D0D]">
              <h2 className="text-2xl font-bold text-white">
                {viewMode === "edit" ? "Edit Employee" : selectedEmployee.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-[#919191] hover:text-white hover:bg-[#1F1F1F] p-2 rounded transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-8">
              {viewMode === "view" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Name</p>
                    <p className="text-white font-medium">{selectedEmployee.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Email</p>
                    <p className="text-white font-medium">{selectedEmployee.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Google ID</p>
                    <p className="text-white font-medium">{selectedEmployee.googleId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Role</p>
                    <p className="text-white font-medium capitalize">{selectedEmployee.role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Department</p>
                    <p className="text-white font-medium">{selectedEmployee.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Location</p>
                    <p className="text-white font-medium">{selectedEmployee.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Phone</p>
                    <p className="text-white font-medium">{selectedEmployee.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Date of Birth</p>
                    <p className="text-white font-medium">{selectedEmployee.dateOfBirth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Joined</p>
                    <p className="text-white font-medium">{selectedEmployee.joinedDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#919191] text-xs uppercase tracking-wide">Last Login</p>
                    <p className="text-white font-medium">{selectedEmployee.lastLogin}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Name</label>
                    <input
                      type="text"
                      value={editFormData.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Email</label>
                    <input
                      type="email"
                      value={editFormData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Google ID</label>
                    <input
                      type="text"
                      value={editFormData.googleId || ""}
                      onChange={(e) => handleInputChange("googleId", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Role</label>
                    <select
                      value={editFormData.role || "fulltime"}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    >
                      <option value="fulltime">Full-time</option>
                      <option value="intern">Intern</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Department</label>
                    <input
                      type="text"
                      value={editFormData.department || ""}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Location</label>
                    <input
                      type="text"
                      value={editFormData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Phone</label>
                    <input
                      type="tel"
                      value={editFormData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Date of Birth</label>
                    <input
                      type="date"
                      value={editFormData.dateOfBirth || ""}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#919191] text-xs uppercase tracking-wide block">Joined Date</label>
                    <input
                      type="date"
                      value={editFormData.joinedDate || ""}
                      onChange={(e) => handleInputChange("joinedDate", e.target.value)}
                      className="w-full px-4 py-2 bg-[#1F1F1F] text-white rounded-lg border border-[#2F2F2F] focus:border-[#86efac] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 flex gap-3 p-8 border-t border-[#1F1F1F] bg-[#0D0D0D]">
              {viewMode === "edit" ? (
                <>
                  <button
                    onClick={() => setViewMode("view")}
                    className="flex-1 px-6 py-2 rounded-lg border border-[#1F1F1F] text-white hover:bg-[#1F1F1F] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-6 py-2 rounded-lg bg-[#86efac] text-black hover:bg-[#7ee399] transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="w-full px-6 py-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-[#2F2F2F] transition-colors font-medium"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
