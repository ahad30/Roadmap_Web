// src/components/AddCommentForm.jsx
import { useState, useContext } from 'react';
import api from '../../api/api';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';


export default function AddCommentForm({ roadmapItemId, onCommentAdded }) {
   const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim().length === 0) return toast.error('Write something first');;
    setLoading(true)
    try {
      await api.post(`/roadmap/${roadmapItemId}/comment`, {
        content,
        parentId: null
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setContent('');
      onCommentAdded();
      toast.success('Comment Posted Successfully');
    setLoading(false)


    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your comment..."
        maxLength={300}
        rows={3}
        value={content}
        onChange={e => setContent(e.target.value)}
 
      />
      <div className='flex justify-end'>
        <button
        disabled={loading}
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
      >
       {loading?  "Posting Comment" : "Post Comment"}
      </button>
      </div>
    </form>
  );
}
