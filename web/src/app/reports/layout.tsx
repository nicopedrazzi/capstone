import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ReportsLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!response.ok) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return <>{children}</>;
}
