import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ThumbsUp} from 'lucide-react';
import api from "../api/api";
import { toast } from "sonner";
import CommentsSection from "./CommentsSection";

export default function RoadmapCard() {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  // console.log(token)

  useEffect(() => {
     try {
      const res = api.get("/roadmap")
     .then((res) => 
     {
      setItems(res.data.data)
     }
  );
     } catch (error) {
      console.log(error)
     }
  }, []);

const handleUpvote = async (id) => {
  try {
    const res = await api.post(
      `/roadmap/${id}/upvote`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res?.data?.message) {
      toast.success(res.data.message);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                upvotes: [...item.upvotes, "newUpvote"]
              }
            : item
        )
      );
    }
  } catch (error) {
    const message =
      error.response?.data?.error;
    toast.error(message);
  }
};

const handleItemDetails = (id) => {
   navigate(`/roadmap/${id}`)
}


  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items?.map((item) => (
    <div 
      key={item?.id} 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <div className="p-5">
        {/* Category badge */}
         <div className="flex justify-between items-center">
            <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {item?.category}
        </span>
            <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded-full bg-orange-400 text-white">
          {item?.status}
        </span>
         </div>
        
        {/* Title and description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {item?.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {item?.description}
        </p>
        
        {/* Stats and actions */}
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-gray-600">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{item?.upvotes?.length}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{item?.comments?.length || 0}</span>
            </div>
          </div>
          
         <div className="flex space-x-2">
           <button 
            onClick={() => handleUpvote(item.id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ThumbsUp className="-ml-0.5 mr-1.5 h-4 w-4" />
            Upvote
          </button>
          <button 
            onClick={() => handleItemDetails(item.id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageSquare className="-ml-0.5 mr-1.5 h-4 w-4" />
            Comment
          </button>
         </div>

        </div>

          {/* <h4 className="mt-4 font-semibold">Comments</h4>
          <CommentsSection roadmapItemId={item.id} /> */}
      </div>
    </div>
  ))}
</div>
  );
}
