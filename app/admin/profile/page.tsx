"use client"

import type { SVGProps } from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Header from "@/components/header"
import GlassBackground from "@/components/glass-background"
import { Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, ArrowLeft, Lock } from 'lucide-react'
import { useTheme } from "next-themes"
import Navbar from "@/components/navbar"

export default function AdminProfile() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [profile, setProfile] = useState({
    fullName: "Admin User",
    email: "admin@company.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    department: "Administration",
    joinDate: "January 2022",
    role: "System Administrator",
    permissions: ["View all reports", "Manage users", "System configuration", "View analytics"],
  })

  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    alert("Password changed successfully")
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordForm(false)
  }

  return (
    <div className="relative w-full min-h-screen">
      <GlassBackground />

      <div className="relative z-10">
        {/* <Header userRole="admin" userName={profile.fullName} /> */}
        <Navbar/>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Profile</h2>
            <p className="text-muted-foreground mt-2">Manage your administrative profile</p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-8">
            {/* Profile Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{profile.fullName}</h3>
                  <p className="text-muted-foreground">{profile.role}</p>
                </div>
              </div>
              <button
                onClick={() => (isEditing ? handleSave : setIsEditing(true))}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <p className="text-foreground">{profile.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <p className="text-foreground">{profile.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <p className="text-foreground">{profile.location}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Department</label>
                <p className="text-foreground">{profile.department}</p>
              </div>

              {/* Join Date */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Join Date
                </label>
                <p className="text-foreground">{profile.joinDate}</p>
              </div>
            </div>

            {/* Permissions */}
            <div className="pt-6 border-t border-border space-y-4">
              <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Permissions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.permissions.map((permission, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 border border-border">
                    <CheckCircle className="w-5 h-5 text-chart-1" />
                    <span className="text-sm text-foreground">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password Section */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Security
                </h4>
                {!showPasswordForm && (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-all"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {showPasswordForm && (
                <div className="p-4 rounded-lg bg-accent/50 border border-border space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handlePasswordChange}
                      className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordForm(false)
                        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-accent text-foreground font-medium text-sm hover:bg-accent/80 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
function CheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}
