import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unsignSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("vendor-session")?.value;

  if (!session || (await unsignSession(session)) === null) {
    redirect("/vendedores");
  }

  return <>{children}</>;
}
