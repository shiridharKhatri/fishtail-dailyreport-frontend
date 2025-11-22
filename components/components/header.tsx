"use client"

import { Settings2, LogOut, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/components/ui/dropdown-menu"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [notificationCount] = useState(3)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#0D0D0D] to-[#1A1A1A] border-b border-[#1F1F1F]/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex-1">
            <Image src={"/logo.png"} alt="Logo" width={120} height={120} />
      </div>

      {/* Center - Title/Breadcrumb (optional) */}
      <div className="flex-1 flex justify-center">
        <span className="text-[#919191] text-sm font-medium">Daily Report Admin</span>
      </div>

      {/* Right - Actions */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Notification Bell */}
        {/* <button className="relative p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors group">
          <Bell className="h-5 w-5 text-[#919191] group-hover:text-white transition-colors" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#86efac] rounded-full animate-pulse" />
          )}
        </button> */}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#86efac]/30 cursor-pointer shadow-lg" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#0D0D0D] border border-[#1F1F1F] text-white shadow-xl rounded-xl"
          >
            <DropdownMenuItem className="focus:bg-[#1F1F1F] focus:text-[#86efac] cursor-pointer text-[#919191] hover:text-white transition-colors">
              <Settings2 className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#1F1F1F] focus:text-[#f87171] cursor-pointer text-[#919191] hover:text-white transition-colors">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
