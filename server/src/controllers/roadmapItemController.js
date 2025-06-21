const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// Get roadmap items
const getRoadmap = async (req, res) => {
  const items = await prisma.roadmapItem.findMany({
    include: {
      upvotes: true,
      comments: {
        include: { author: true, replies: true }
      }
    }
  });
  res.json({
    data: items
  });
}


const getRoadmapById = async (req, res) => {
  const  id  = req.params.id;
  const item = await prisma.roadmapItem.findUnique({
    where: { id: id },
    include: {
      upvotes: true,
      comments: {
        include: { author: true, replies: true }
      }
    }
  });
  res.json({
    data: item
  });
}





// Upvote roadmap item
const upVoteItem =  async (req, res) => {
  const userId = req.userId;
  const roadmapItemId = req.params.id;

  const already = await prisma.upvote.findFirst({ where: { userId, roadmapItemId } });
  if (already) return res.status(400).json({ error: "Already upvoted" });

  await prisma.upvote.create({ data: { userId, roadmapItemId } });
  res.json({ message: "Upvoted" });
}


module.exports = {
 getRoadmap,
getRoadmapById,
 upVoteItem
};