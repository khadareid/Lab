import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

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
        navigate("/register/main");
      }
    }
  }, [navigate]);

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-100 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashRouter;
