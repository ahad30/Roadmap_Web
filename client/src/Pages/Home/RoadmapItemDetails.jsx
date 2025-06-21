import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CommentsSection from "../../components/Comment/CommentsSection";



const RoadmapItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    try {
      const res = api.get(`/roadmap/${id}`).then((res) => {
        // console.log(res)
        setItem(res?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
      <div className="">
  
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
        
      

          <h4 className="mt-4 font-semibold">Comments</h4>
          <CommentsSection roadmapItemId={item.id} />
      </div>
    </div>

</div>
  );
};

export default RoadmapItemDetails;
