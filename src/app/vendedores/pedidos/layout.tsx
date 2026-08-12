import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PedidosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("vendor-session")?.value;

  if (session !== "authenticated") {
    redirect("/vendedores");
  }

  return <>{children}</>;
}
