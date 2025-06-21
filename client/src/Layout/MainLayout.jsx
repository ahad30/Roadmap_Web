import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const MainLayout = () => {
  return (
    <>
    <Header/>
    <div className={`min-h-screen lg:p-8`}>
      <Outlet />
    </div>
    <Footer/>
    </>
  );
};

export default MainLayout;
