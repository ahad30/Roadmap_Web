import { useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { FaReply, FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import moment from "moment";
import { toast } from "sonner";

export default function CommentTree({
  comments,
  roadmapItemId,
  level = 0,
  onCommentAdded,
}) {
  const token = localStorage.getItem("token");
    const { user } = useAuth();

  const userId = user?.id;
  const [activeReply, setActiveReply] = useState(null);
  const [activeEdit, setActiveEdit] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showOptions, setShowOptions] = useState({});

  const toggleOptions = (commentId) => {
    setShowOptions(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReply = async (parentId) => {
    if (!replyContent.trim()) return toast.error('Fill the input first');
    await api.post(
      `/roadmap/${roadmapItemId}/comment`,
      { content: replyContent, parentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReplyContent("");
    setActiveReply(null);
    onCommentAdded?.();
  };

  const handleEdit = async (commentId) => {
    if (editContent.trim() === "") return toast.error("Comment cannot be empty");
    await api.put(
      `/comment/${commentId}`,
      { content: editContent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setActiveEdit(null);
    setEditContent("");
    onCommentAdded?.();
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await api.delete(`/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onCommentAdded?.();
      toast.success('Comment Deleted Successfully');
    }
  };

  return (
    <div className={`space-y-3 ${level > 0 ? '-ml-10 lg:ml-2' : ''}`}>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                {comment.author?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="lg:flex-1 w-[80%] md:w-[90%]">
              <div className="bg-gray-100 rounded-2xl p-3 break-words">
                <div className="flex items-center">
                  <span className="font-semibold text-sm mr-2">{comment.author?.name}</span>            
                </div>
                
                {activeEdit === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      autoFocus
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      rows="2"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => {
                          setActiveEdit(null);
                          setEditContent("");
                        }}
                        className="text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEdit(comment.id)}
                        className="text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm mt-1 break-words">{comment?.content}</p>
                )}
              </div>
              
              <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4 ml-2">
                {level < 3 && (
                  <button 
                    onClick={() => {
                      setActiveReply(activeReply === comment.id ? null : comment.id);
                      setActiveEdit(null);
                    }}
                    className="flex items-center hover:text-blue-500"
                  >
                    <FaReply className="mr-1" /> Reply
                  </button>
                )}

                <span className="text-gray-500 text-xs">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
              
              {activeReply === comment.id && (
                <div className="mt-3 flex">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      autoFocus
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full border rounded-lg p-2 text-sm"
                      rows="2"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => setActiveReply(null)}
                        className="text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReply(comment.id)}
                        className="text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {comment.replies?.length > 0 && (
                <CommentTree
                  comments={comment.replies}
                  roadmapItemId={roadmapItemId}
                  level={level + 1}
                  onCommentAdded={onCommentAdded}
                />
              )}
            </div>
            
            {userId === comment.authorId && (
              <div className="relative">
                <button 
                  onClick={() => toggleOptions(comment.id)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FaEllipsisH />
                </button>
                
                {showOptions[comment.id] && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border">
                    <button
                      onClick={() => {
                        setActiveEdit(comment.id);
                        setEditContent(comment.content);
                        setShowOptions({});
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(comment.id);
                        setShowOptions({});
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}