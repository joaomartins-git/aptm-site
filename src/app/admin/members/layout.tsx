import { requireAdmin } from "@/lib/auth"
import Link from "next/link"

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r bg-gray-50 p-6">
        <h2 className="text-xl font-bold mb-6">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">

          <Link
            href="/admin"
            className="text-gray-700 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/members"
            className="text-gray-700 hover:text-black"
          >
            Members
          </Link>

        </nav>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  )
}