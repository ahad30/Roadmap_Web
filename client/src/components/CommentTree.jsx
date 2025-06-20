import React, { useState, useContext } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function CommentTree({ comments, roadmapItemId, level = 0 }) {
    const token = localStorage.getItem('token')
    const { user } = useAuth();
    const userId = user?.id
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState({});

  const handleReply = async (parentId) => {
    await api.post(`/roadmap/${roadmapItemId}/comment`, { content: replyContent, parentId }, { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload();
  };

  const handleEdit = async (commentId) => {
    await api.put(`/comment/${commentId}`, { content: editContent[commentId] }, { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload();
  };

  const handleDelete = async (commentId) => {
    await api.delete(`/comment/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload();
  };

  return (
    <div className={`pl-${level * 4}`}>
      {comments.map(comment => (
        <div key={comment.id} className="border p-2 mb-1">
          <p><b>{comment.author?.email}</b>: {comment.content}</p>

          {userId === comment.authorId && (
            <>
              <input required placeholder="Edit comment..." onChange={e => setEditContent({...editContent, [comment.id]: e.target.value})} className="border p-1" />
              <button onClick={() => handleEdit(comment.id)} className="ml-2 text-sm text-green-500">Update</button>
              <button onClick={() => handleDelete(comment.id)} className="ml-2 text-sm text-red-500">Delete</button>
            </>
          )}

          {level < 3 && (
            <>
              <input type='text' required placeholder="Reply..." onChange={e => setReplyContent(e.target.value)} className="border p-1" />
              <button onClick={() => handleReply(comment.id)} className="ml-2 text-sm text-blue-500">Reply</button>
            </>
          )}

          {comment.replies?.length > 0 &&
            <CommentTree comments={comment.replies} roadmapItemId={roadmapItemId} level={level + 1} />
          }
        </div>
      ))}
    </div>
  );
}
