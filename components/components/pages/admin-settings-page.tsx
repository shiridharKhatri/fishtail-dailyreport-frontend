"use client"

import { useState } from "react"
import { Save, Lock } from "lucide-react"

export function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phone: "+1-234-567-8900",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSaveProfile = () => {
    setSaveStatus("success")
    setTimeout(() => setSaveStatus("idle"), 3000)
  }

  const handleChangePassword = () => {
    if (settings.newPassword === settings.confirmPassword && settings.newPassword.length >= 8) {
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Settings</h1>
        <p className="text-[#919191] text-sm">Manage your admin profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
        <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Role</label>
              <select
                value={settings.role}
                onChange={(e) => setSettings({ ...settings, role: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              saveStatus === "success" ? "bg-[#86efac] text-black" : "bg-[#86efac] text-black hover:opacity-90"
            }`}
          >
            <Save className="h-4 w-4" />
            {saveStatus === "success" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Current Password</label>
            <input
              type="password"
              value={settings.currentPassword}
              onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">New Password</label>
            <input
              type="password"
              value={settings.newPassword}
              onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all bg-[#86efac] text-black hover:opacity-90"
          >
            <Lock className="h-4 w-4" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}
