"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

export function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "fulltime",
    department: "",
    location: "",
    phone: "",
    dateOfBirth: "",
  })

  const handleSubmit = () => {
    console.log("Employee added:", formData)
    setFormData({
      name: "",
      email: "",
      role: "fulltime",
      department: "",
      location: "",
      phone: "",
      dateOfBirth: "",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Add Employee</h1>
        <p className="text-[#919191] text-sm">Add a new employee to the system</p>
      </div>

      <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              >
                <option value="fulltime">Full-time</option>
                <option value="intern">Intern</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                placeholder="Engineering"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                placeholder="+1-234-567-8900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#86efac] text-black font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Employee
          </button>
        </form>
      </div>
    </div>
  )
}
