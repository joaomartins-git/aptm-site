'use client'

export default function RejectMemberButton({
  memberId
}: {
  memberId: string
}) {

  async function rejectMember() {
    await fetch(`/api/admin/applications/${memberId}/reject`, {
      method: 'POST'
    })

    window.location.reload()
  }

  return (
    <button
      onClick={rejectMember}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Reject
    </button>
  )
}