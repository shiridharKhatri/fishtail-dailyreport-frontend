"use client";

import { Bell, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useThemeLocal } from "@/hooks/use-theme-local";
import { Button } from "./ui/button";
import Avatar from "./Avatar";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { LogoutLoader } from "./logout-loader";

interface NavbarProps {
  userRole: "employee" | "admin";
  userName: string;
  isLoading?: boolean;
}

export default function Navbar({ isLoading = false }: NavbarProps) {
  const { theme, toggleTheme } = useThemeLocal();
  const { user, logout, loggedOut } = useAuth();

  const role = (user as any)?.role || "employee";
  const name = user?.name || "User";

  const onLogoutHandler = () => {
    logout();
  };


  return (
    <>
      {!loggedOut && (
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                <Image src={"/logo.png"} alt="Logo" width={120} height={120} />
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Link
                  href={
                    role === "admin" ? "/admin/profile" : "/employee/profile"
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Avatar type="customer" seed={name} />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {role}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={onLogoutHandler}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      {loggedOut && <LogoutLoader />}
    </>
  );
}
