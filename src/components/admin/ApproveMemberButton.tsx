'use client'

export default function ApproveMemberButton({
  memberId
}: {
  memberId: string
}) {

  async function approveMember() {
    await fetch(`/api/admin/applications/${memberId}/approve`, {
      method: 'POST'
    })

    window.location.reload()
  }

  return (
    <button
      onClick={approveMember}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Approve
    </button>
  )
}