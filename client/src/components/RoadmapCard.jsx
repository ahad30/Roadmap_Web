import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function RoadmapCard() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/roadmap")
    .then((res) => 
     {
       console.log(res)
      setItems(res.data.data)
     }
  );
  }, []);

  const handleUpvote = async (id) => {
    await api.post(
      `/roadmap/${id}/upvote`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="border p-4 mb-2">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Upvotes: {item.upvotes.length}</p>
          <button onClick={() => handleUpvote(item.id)}>Upvote</button>
        </div>
      ))}
    </div>
  );
}
