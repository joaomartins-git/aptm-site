import 'dotenv/config'
import { config } from 'dotenv'
import { memberRepository } from '@/lib/repositories/memberRepository'
import { memberService } from '@/lib/services/memberService'
import { realMembers } from '@/data/realMembers'

config({ path: '.env.local' })

async function seedRealMembers() {
  try {
    console.log('🌱 Importing real APTM members...')

    for (const member of realMembers) {

      const existing = await memberService.getMemberByMemberNumber(member.memberNumber)

      if (existing) {
        console.log(`ℹ️ ${member.name} already exists`)
        continue
      }

      await memberRepository.createMember({

        memberNumber: member.memberNumber,

        name: member.name,

        legacyMember: member.legacyMember,

        lastQuotaPaidYear: member.lastQuotaPaidYear,

        paymentStatus: "pending",
        
        role: 'member',  

        status: 'imported',

        profileCompleted: false

      })

      console.log(`✅ Imported #${member.memberNumber} - ${member.name}`)
    }

    console.log('')
    console.log('🎉 Finished importing members.')

  } catch (error) {

    console.error(error)

    process.exit(1)

  }
}

seedRealMembers()