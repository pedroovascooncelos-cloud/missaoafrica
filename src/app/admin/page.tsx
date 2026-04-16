import type { Metadata } from "next";

import { AdminAuthForm } from "@/components/admin/AdminAuthForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getSiteContent } from "@/data/site";
import { appEnv } from "@/lib/env";
import { getAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin",
  description: "Painel administrativo nativo da Missão África com Firebase Auth, Firestore e Cloudinary.",
};

export default async function AdminPage() {
  const session = await getAdminSession();
  const siteContent = session ? await getSiteContent() : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {session ? (
        <AdminDashboard
          initialContent={siteContent!}
          userEmail={session.email}
          useFirestoreContent={appEnv.useFirestoreContent}
        />
      ) : (
        <AdminAuthForm />
      )}
    </div>
  );
}
