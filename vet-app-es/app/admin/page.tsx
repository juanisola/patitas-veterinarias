"use client";

import { useClinic } from "@/lib/clinic-context";
import { LoginPage } from "@/components/admin/login-page";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const { isLoggedIn } = useClinic();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <AdminDashboard />;
}
