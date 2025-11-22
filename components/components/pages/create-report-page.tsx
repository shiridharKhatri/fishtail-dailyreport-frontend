"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function CreateReportPage() {
  const [formData, setFormData] = useState({
    employeeName: "",
    date: new Date().toISOString().split("T")[0],
    activity: "",
    attachment: null as File | null,
  })

  const handleSubmit = () => {
    console.log("Report created:", formData)
    setFormData({
      employeeName: "",
      date: new Date().toISOString().split("T")[0],
      activity: "",
      attachment: null,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Report</h1>
        <p className="text-[#919191] text-sm">Create a report on behalf of an employee</p>
      </div>

      <div className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1F1F1F]">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Employee Name</label>
            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
              placeholder="Select employee..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Activity Summary</label>
            <textarea
              value={formData.activity}
              onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
              className="w-full bg-[#1F1F1F] text-white placeholder-[#919191] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#86efac] resize-none"
              rows={6}
              placeholder="Describe the employee's daily activities..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Attachment (optional)</label>
            <div className="border-2 border-dashed border-[#1F1F1F] rounded-lg p-6 text-center cursor-pointer hover:border-[#86efac] transition-colors">
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <p className="text-[#919191]">Click to upload or drag and drop</p>
                <p className="text-xs text-[#919191]">PDF, images, documents up to 10MB</p>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#86efac] text-black font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Create Report
          </button>
        </form>
      </div>
    </div>
  )
}
