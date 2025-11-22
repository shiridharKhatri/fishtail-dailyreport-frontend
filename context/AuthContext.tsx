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
  verifyUser: () => Promise<void>;
  logout: () => void;
  loggedOut: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [verification, setVerification] = useState<Object>({});
  const [userType, setUserType] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();
  const token = Cookies.get("employee_token");


  useEffect(() => {
    let empToken = Cookies.get("employee_token");
    let admToken = Cookies.get("admin_token");
    if (empToken) {
      setIsLoggedIn(true);
      setUserType("employee");  
    } else if (admToken) {
      setIsLoggedIn(true);
      setUserType("admin");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/auth/employee/fetch`, {
        // withCredentials: true,{
        headers: {
          'auth-token' : token
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

  const verifyUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/auth/employee/verify`, {
        // withCredentials: true,
        headers: {
          'auth-token' : token
        },
      });

      if (data.success) {
        setVerification(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setLoggedOut(true);
    Cookies.remove("employee_token");
    Cookies.remove("admin_token");
    setUser(null);
    router.push("/");
    setIsLoggedIn(false);
    setLoggedOut(true);
  };

  useEffect(() => {
    fetchUserData();
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, logout, verification, userType, verifyUser, loggedOut }}
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
