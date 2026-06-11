"use client";

import { ClinicProvider } from "@/lib/clinic-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClinicProvider>{children}</ClinicProvider>;
}
