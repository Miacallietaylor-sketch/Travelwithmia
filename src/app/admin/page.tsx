import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin, usingDefaultAdminSecret } from "@/lib/admin/auth";
import { adminData } from "@/lib/admin/data";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render dynamically — this is a private, per-request area.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdmin()) redirect("/admin/login");
  const data = await adminData();
  return (
    <AdminDashboard
      initial={data}
      insecure={usingDefaultAdminSecret}
    />
  );
}
