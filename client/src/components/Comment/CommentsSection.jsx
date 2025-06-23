import { useEffect, useState } from "react";
import api from "../../api/api";
import AddCommentForm from "./AddCommentForm";
import CommentTree from "./CommentTree";
import Loader from "../Loader";

export default function CommentsSection({ roadmapItemId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const loadComments = () => {
    api
      .get(`/roadmap/${roadmapItemId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setComments(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
      })

  };

  

  useEffect(() => {
    loadComments();
  }, [roadmapItemId]);

 

  return (
    <div className="mt-4">
      <AddCommentForm
        roadmapItemId={roadmapItemId}
        onCommentAdded={loadComments}
      />
      
      { loading ?
        <div className="mt-4 flex justify-center items-center h-32">
        <Loader/>
      </div>
      :         
      (
        <CommentTree
          comments={comments}
          roadmapItemId={roadmapItemId}
          onCommentAdded={loadComments}
          setComments={setComments}
        />
      ) }
   
    </div>
  );
}