"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function RenewMembershipButton({
  memberId
}: {
  memberId: string
}) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleRenew(type: "yearly" | "semester") {
    setLoading(true)

    await fetch(`/api/admin/members/${memberId}/renew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type
      })
    })

    router.refresh()
    // window.location.reload()
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleRenew("yearly")}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Renovando..." : "Renovar 1 Ano"}
      </button>

      <button
        onClick={() => handleRenew("semester")}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Renovando..." : "Renovar 6 Meses"}
      </button>
    </div>
  )
}