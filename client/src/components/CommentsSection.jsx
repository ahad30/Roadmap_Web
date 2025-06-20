import { useEffect, useState } from "react";
import api from "../api/api";
import AddCommentForm from "./AddCommentForm";
import CommentTree from "./CommentTree";

export default function CommentsSection({ roadmapItemId }) {
  const [comments, setComments] = useState([]);
   
  const loadComments = () => {
    api.get(`/roadmap/${roadmapItemId}/comments` , { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadComments();
  }, [roadmapItemId]);

  return (
    <div className="mt-4">
      <AddCommentForm roadmapItemId={roadmapItemId} onCommentAdded={loadComments} />
      <CommentTree comments={comments} roadmapItemId={roadmapItemId} />
    </div>
  );
}