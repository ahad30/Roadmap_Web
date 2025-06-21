import { useEffect, useState } from 'react';
import RoadmapCard from '../../components/RoadmapCard/RoadmapCard';
import api from '../../api/api';

const Home = () => {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [sorting , setSorting] = useState("")
  console.log(items)
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        const res = await api.get("/roadmap");
        setItems(res.data.data);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const filterItems = items.filter((item) => {
    const categoryMatch = categoryFilter === "" || item?.category === categoryFilter;
    const statusMatch = statusFilter === "" || item?.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const sortedItems = [...filterItems].sort((a, b) => {
  if (sorting === "popularity") {
    return (b?.upvotes?.length || 0) - (a?.upvotes?.length || 0);
  }
  return 0;
});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center gap-5 mb-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter By Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Platform">Platform</option>
            <option value="Documentation">Documentation</option>
            <option value="Features">Features</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Filter By Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="">All Statuses</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By Upvotes
          </label>
          <select
            name="sort"
            id="sort"
            className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) => setSorting(e.target.value)}
            value={sorting}
          >
            <option value="">Default</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          {categoryFilter || statusFilter || sorting ? (
            <button
              onClick={() => {
                setCategoryFilter("");
                setStatusFilter("");
                setSorting("");
              }}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filterItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">No items available yet</h3>
          
        </div>
      ) 
       : (
       
          <RoadmapCard filterItems={sortedItems} setFilterItems={setItems}/>
  
      )}
    </div>
  );
};

export default Home;