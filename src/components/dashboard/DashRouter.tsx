import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./Sidebar";

const DashRouter = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/login");
    } else {
      const { Role } = JSON.parse(userInfo);

      if (Role === "USER") {
        navigate("/");
      } else if (Role === "REGISTER") {
        navigate("/register/Overview");
      }
    }
  }, [navigate]);

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex ml-8  flex-col w-full">
        <Header />
        <div className="flex-1 body flex-grow bg-gray-100 overflow-auto p-4">
          <Outlet  />
        </div>
      </div>
    </div>
  );
};

export default DashRouter;
