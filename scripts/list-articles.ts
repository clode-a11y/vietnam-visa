import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const articles = await prisma.blogPost.findMany({
    select: { slug: true, titleRu: true, isPublished: true },
    orderBy: { publishedAt: 'desc' }
  })

  console.log('All articles in database:')
  articles.forEach((a, i) => {
    console.log(`${i+1}. [${a.isPublished ? 'Published' : 'Draft'}] ${a.slug}`)
    console.log(`   ${a.titleRu}`)
  })
  console.log(`\nTotal: ${articles.length} articles`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
