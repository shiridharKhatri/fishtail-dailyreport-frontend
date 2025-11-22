"use client";

import { useState, useEffect, ChangeEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import GlassBackground from "@/components/glass-background";
import { Toaster, toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  ArrowLeft,
  User,
} from "lucide-react";
import moment from "moment";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { ProfileSkeletonLoader } from "@/components/skeleton-loaders/profile-skeleton";

const Field = ({
  label,
  icon,
  field,
  editable = true,
  type = "text",
  options = [],
  formData,
  handleInput,
  isEditing,
}: {
  label: string;
  icon?: JSX.Element | null;
  field: string;
  editable?: boolean;
  type?: "text" | "date" | "select";
  options?: string[];
  formData: any;
  handleInput: any;
  isEditing: boolean;
}) => {
  const getInputValue = () => {
    if (type === "date") {
      if (formData[field] === "N/A" || !formData[field]) return "";
      return moment(formData[field]).isValid()
        ? moment(formData[field]).format("YYYY-MM-DD")
        : "";
    }
    return formData[field];
  };

  const getDisplayValue = () => {
    if (type === "date" && formData[field] !== "N/A") {
      return moment(formData[field]).isValid()
        ? moment(formData[field]).format("MMMM D, YYYY")
        : formData[field];
    }
    return formData[field];
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>

      {editable && isEditing ? (
        type === "select" ? (
          <select
            value={formData[field]}
            onChange={handleInput(field)}
            className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 appearance-none"
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={getInputValue()}
            onChange={handleInput(field)}
            className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        )
      ) : (
        <p className="text-foreground">{getDisplayValue()}</p>
      )}
    </div>
  );
};

export default function EmployeeProfile() {
  const router = useRouter();
  const { user, isLoggedIn, editUserDetails } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const defaultProfile = {
    fullName: user?.name ?? "N/A",
    email: user?.email ?? "N/A",
    phone: (user as any)?.phone ?? "N/A",
    location: (user as any)?.location ?? "N/A",
    department: (user as any)?.department ?? "N/A",
    joinDate: (user as any)?.joinedAt ?? "N/A",
    role: (user as any)?.role ?? "N/A",
    picture: (user as any)?.picture ?? "",
    dateOfBirth: (user as any)?.dateOfBirth ?? "N/A",
    gender: (user as any)?.gender ?? "N/A",
  };

  const [formData, setFormData] = useState(defaultProfile);
  useEffect(() => {
    setFormData(defaultProfile);
  }, [user]);

  const handleInput =
    (field: keyof typeof formData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    let data = {
      name: formData.fullName,
      phone: formData.phone,
      location: formData.location,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
    };

    await editUserDetails(data)
      .then((response) => {
        toast.success(response.message);
      })
      .catch((_) => {
        console.error("Error updating user details");
      });

    setIsEditing(false);
  };

  return (
    <>
      {" "}
      {!isLoggedIn && <ProfileSkeletonLoader />}
      {isLoggedIn && (
        <div className="relative w-full min-h-screen">
          <GlassBackground />
          <div className="relative z-10">
            <Navbar
              {...({ userRole: "employee", userName: user?.name ?? "" } as any)}
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-3 py-2 mb-8 rounded-lg hover:bg-accent transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Profile</h2>
                <p className="text-muted-foreground mt-2">
                  Manage your personal information
                </p>
              </div>

              <div className="glass rounded-2xl p-8 space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      {!formData.picture ? (
                        <Avatar
                          type="customer"
                          seed={formData.fullName || "User Avatar"}
                        />
                      ) : (
                        <Image
                          src={formData.picture}
                          alt={formData.fullName}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {formData.fullName}
                      </h3>
                      <p className="text-muted-foreground">{formData.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Full Name"
                    icon={null}
                    field="fullName"
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />
                  <Field
                    label="Email"
                    icon={<Mail className="w-4 h-4" />}
                    field="email"
                    editable={false}
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />
                  <Field
                    label="Phone"
                    icon={<Phone className="w-4 h-4" />}
                    field="phone"
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />
                  <Field
                    label="Location"
                    icon={<MapPin className="w-4 h-4" />}
                    field="location"
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />

                  <Field
                    label="Gender"
                    icon={<User className="w-4 h-4" />}
                    field="gender"
                    type="select"
                    options={["male", "female", "other"]}
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />

                  <Field
                    label="Date of Birth"
                    icon={<Calendar className="w-4 h-4" />}
                    field="dateOfBirth"
                    type="date"
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />

                  <Field
                    label="Department"
                    field="department"
                    editable={false}
                    formData={formData}
                    handleInput={handleInput}
                    isEditing={isEditing}
                  />

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Join Date
                    </label>
                    <p className="text-foreground">
                      {moment(formData.joinDate).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
      <Toaster richColors={true} />
    </>
  );
}