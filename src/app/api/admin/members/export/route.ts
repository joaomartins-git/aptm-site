import { NextResponse } from "next/server"
import { memberService } from "@/lib/services/memberService"

export async function GET() {
    const members = await memberService.getAllMembers()

    const csv = [
        ['Name', 'Email', 'Role'], 
        ...members.map(member =>[
            member.name,
            member.email,
            member.role
        ])
    ]
        .map(row => row.join(','))
        .join('\n')

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=members.csv'
        }
    })
}