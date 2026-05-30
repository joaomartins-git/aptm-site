import { requireAdmin } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import { notFound } from 'next/navigation'
import ApproveMemberButton from '@/components/admin/ApproveMemberButton'
import RejectMemberButton from '@/components/admin/RejectMemberButton'
import {
  approveMemberAction,
  rejectMemberAction
} from '../actions'

export default async function ApplicationDetailPage({
  params
}: {
  params: Promise<{ memberId: string }>
}) {
  await requireAdmin()

  const { memberId } = await params

  const member = await memberService.getMemberById(memberId)

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-20 space-y-6">

      <h1 className="text-3xl font-bold">
        Application Review
      </h1>

      <div className="border rounded p-6 space-y-3">

        <p>
          <strong>Name:</strong> {member.name}
        </p>

        <p>
          <strong>Email:</strong> {member.email}
        </p>

        <p>
          <strong>Status:</strong> {member.status}
        </p>

        <p>
          <strong>Payment Status:</strong> {member.paymentStatus}
        </p>

        <p>
          <strong>NIF:</strong> {member.nif}
        </p>

        <p>
          <strong>Phone:</strong> {member.phone}
        </p>

        <p>
          <strong>Institution:</strong> {member.institution}
        </p>

      </div>
      <div className="flex gap-4 mt-6">

        <form action={async () => {
          'use server'
          await approveMemberAction(member.id)
        }}>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Approve
          </button>
        </form>

        <form action={async () => {
          'use server'
          await rejectMemberAction(member.id)
        }}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </form>

      </div>
    </div>
  )
}