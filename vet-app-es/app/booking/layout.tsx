"use client";

import { ClinicProvider } from "@/lib/clinic-context";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClinicProvider>{children}</ClinicProvider>;
}
