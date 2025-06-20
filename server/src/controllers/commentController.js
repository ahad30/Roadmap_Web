const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function getNestedComments(roadmapItemId) {
  const comments = await prisma.comment.findMany({
    where: { roadmapItemId, parentId: null },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
          replies: {
            include: {
              author: true,
              replies: {
                include: {
                  author: true
                }
              }
            }
          }
        }
      }
    }
  });

  return comments;
}


// Add comment 
  const addComment = async (req, res) => {
  const { content, parentId } = req.body;
  const roadmapItemId = req.params.id;
  const userId = req.userId;

  if (content.length > 300) return res.status(400).json({ error: "Too long" });

  const comment = await prisma.comment.create({
    data: { content, roadmapItemId, authorId: userId, parentId }
  });
  res.json(comment);
};


const getComments = async (req, res) => {
  const roadmapItemId = req.params.id;
  const nestedComments = await getNestedComments(roadmapItemId);
  res.json(nestedComments);
};

// Edit comment
const editComment =  async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
  if (comment.authorId !== userId) return res.sendStatus(403);

  const updated = await prisma.comment.update({
    where: { id: req.params.id },
    data: { content }
  });
  res.json(updated);
};

// Delete comment
const deleteComment = async (req, res) => {
  const userId = req.userId;
  const commentId = req.params.id;

  try {
    const comment = await prisma.comment.findUnique({ 
      where: { id: commentId },
      select: { authorId: true }
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    const deleteCommentWithReplies = async (id) => {
      const replies = await prisma.comment.findMany({
        where: { parentId: id }
      });
      for (const reply of replies) {
        await deleteCommentWithReplies(reply.id);
      }
      await prisma.comment.delete({
        where: { id }
      });
    };
    await deleteCommentWithReplies(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};


module.exports = {
  addComment,
  getComments,
  editComment,
  deleteComment
};
