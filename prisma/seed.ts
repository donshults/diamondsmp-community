import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create initial invite codes
  const inviteCodes = [
    { code: 'DIAMONDS-LAUNCH-2026', maxUses: 50 },
    { code: 'TRADING-WITH-CLAUDE-MVP', maxUses: 25 },
    { code: 'DON-BETA-ACCESS', maxUses: 10 },
  ]

  // Create admin user first to associate codes
  const adminUser = await prisma.user.create({
    data: {
      email: 'don@iamdonshults.com',
      name: 'Don Shults',
      tier: 'PRO',
      emailVerified: new Date(),
    }
  })

  // Create invite codes
  for (const invite of inviteCodes) {
    await prisma.inviteCode.create({
      data: {
        code: invite.code,
        maxUses: invite.maxUses,
        createdBy: adminUser.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    })
  }

  // Create workshop content
  await prisma.contentItem.createMany({
    data: [
      {
        slug: 'trading-with-claude-video',
        title: 'Trading with Claude - Complete Walkthrough',
        description: 'Narrated presentation covering the full Claude Project setup and workflow',
        type: 'VIDEO',
        urlOrPath: '/content/trading-with-claude-presentation.mp4',
        tierRequired: 'FREE',
        sortOrder: 1,
      },
      {
        slug: 'claude-trading-walkthrough-pdf',
        title: 'How I Use Claude Desktop Projects for Trading',
        description: 'Comprehensive written guide with real trading session examples',
        type: 'PDF', 
        urlOrPath: '/content/How_I_Use_Claude_Projects_for_Trading_v2.pdf',
        tierRequired: 'FREE',
        sortOrder: 2,
      },
      {
        slug: 'mp-diamonds-strategy-guide',
        title: 'MP Diamonds Master Strategy Guide (v5.2)',
        description: 'The living strategy document maintained collaboratively with Claude',
        type: 'PDF',
        urlOrPath: '/content/MP_Diamonds_Master_Strategy_Guide_v5_2.pdf', 
        tierRequired: 'FREE',
        sortOrder: 3,
      },
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log('\n📋 Invite Codes Created:')
  console.log('- DIAMONDS-LAUNCH-2026 (50 uses)')
  console.log('- TRADING-WITH-CLAUDE-MVP (25 uses)') 
  console.log('- DON-BETA-ACCESS (10 uses)')
  console.log('\n🎬 Ready for content upload to Cloudflare R2!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })