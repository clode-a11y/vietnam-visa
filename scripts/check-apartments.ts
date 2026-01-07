import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const apartments = await prisma.apartment.findMany({
    select: { id: true, titleRu: true, priceUsd: true, rooms: true, area: true, district: { select: { nameRu: true } } },
    take: 5
  })
  console.log('Sample apartments:', JSON.stringify(apartments, null, 2))
  
  const count = await prisma.apartment.count()
  console.log('Total apartments:', count)
  
  const districts = await prisma.district.findMany({ select: { id: true, nameRu: true } })
  console.log('Districts:', JSON.stringify(districts, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
