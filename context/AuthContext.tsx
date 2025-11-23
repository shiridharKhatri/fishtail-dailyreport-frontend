"use client";

import axiosInstance from "@/services/axiosInstance";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  picture: string;
  role: string;
  approved: boolean;
  lastlogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  userType: string;
  verification: Object;
  logout: () => void;
  loggedOut: Boolean;
  fetchUserData: () => void;
  editUserDetails: (updatedData: any) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [verification, setVerification] = useState<Object>({});
  const [userType, setUserType] = useState("");
  const router = useRouter();
  const [loggedOut, setLoggedout] = useState(false);
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("employee_token") || Cookies.get("admin_token");
      const { data } = await axiosInstance.get(`/api/auth/employee/fetch`, {
        // withCredentials: true,{
        headers: {
          "auth-token": token,
        },
      });

      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.employee);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const editUserDetails = async (updatedData: any) => {
    try {
      const token = Cookies.get("employee_token") || Cookies.get("admin_token");
      const { data } = await axiosInstance.put(
        `/api/auth/employee/edit`,
        updatedData,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      return data;
    } catch (error) {
      console.error("Failed to edit user data:", error);
      return error
    }
  };

  const logout = () => {
    setLoggedout(true);
    Cookies.remove("employee_token");
    Cookies.remove("admin_token");
    setUser(null);
    router.replace("/");
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 20000);
  };

  useEffect(() => {
     const token = Cookies.get("employee_token") || Cookies.get("admin_token");
    if (token) fetchUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        verification,
        userType,
        loggedOut,
        fetchUserData,
        editUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
