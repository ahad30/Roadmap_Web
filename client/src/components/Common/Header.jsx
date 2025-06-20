import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";


const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className='bg-green-500 py-2 lg:py-3 text-white'>
      <div className='px-2 max-w-6xl mx-auto flex justify-between items-center'>
        <div>
          <Link to={"/"}>
            <h1 className='text-base md:text-xl font-bold'>Roadmap Web App</h1>
          </Link>
        </div>
        <div className='flex gap-2 items-center'>
          {user ? (
            <>
              <span className="hidden sm:inline font-bold">{user.name}</span>
              <button
                onClick={logout}
                className="bg-black text-white rounded-md py-1 px-4 flex items-center gap-[10px] text-[1rem] uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-black text-white rounded-md py-1 px-4 flex items-center gap-[10px] text-[1rem] uppercase"
              >
                Login
              </button>
              <button
                className="bg-blue-500 text-white rounded-md py-1 px-4 flex items-center gap-[10px] text-[1rem] uppercase"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header