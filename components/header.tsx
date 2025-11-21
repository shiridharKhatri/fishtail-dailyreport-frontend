"use client"

import { Bell, LogOut, User } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  userRole: "employee" | "admin"
  userName: string
}

export default function Header({ userRole, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            {userRole === "admin" ? "Admin Dashboard" : "Daily Reports"}
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* Profile dropdown */}
          <div className="flex items-center gap-3">
            <Link
              href={userRole === "admin" ? "/admin/profile" : "/employee/profile"}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </Link>

            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
