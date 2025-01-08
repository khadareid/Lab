"use client";

import { Link } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Users,
  History,
  Star,
  Settings,
  BookOpenIcon,
  TruckIcon,
  Currency,
  LucideCurrency,
  User,
  AlignVerticalDistributeEndIcon,
  Plus,
  LogOut,
  LucideChartNoAxesGantt,
} from "lucide-react";

const sidebarConfig = [
  {
    name: "Menu",
    items: [
      {
        name: "Overview",
        icon: <Home className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/Overview",
        roles: ["ALL"],
      },
    ],
  },
  {
    name: "Library",
    items: [
      {
        name: "Books",
        icon: <BookOpenIcon className="h-5 w-5 text-blue-600" />,
        link: "/dashboard/Books",
        roles: ["ADMIN", "EDITOR", "REGISTER"],
      },
      {
        name: "Borrow Records",
        icon: <BookOpenIcon className="h-5 w-5 text-teal-600" />,
        link: "/dashboard/BorrowRecords",
        roles: ["ADMIN", "EDITOR", "REGISTER"],
      },
      {
        name: "Category",
        icon: <LucideChartNoAxesGantt className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/Category",
        roles: ["ALL"],
      },
    ],
  },
  {
    name: "Transactions",
    items: [
      {
        name: "Transactions",
        icon: <LucideCurrency className="h-5 w-5 text-orange-600" />,
        link: "/dashboard/Transactions",
        roles: ["ADMIN", "cashier"],
      },
      {
        name: "Sales",
        icon: <Currency className="h-5 w-5 text-yellow-600" />,
        link: "/dashboard/Sales",
        roles: ["ADMIN", "cashier"],
      },
    ],
  },
  {
    name: "Staff",
    items: [
      {
        name: "Staff",
        icon: <User className="h-5 w-5 text-purple-600" />,
        link: "/dashboard/StaffEmployee",
        roles: ["ADMIN", "EDITOR"],
      },
    ],
  },
  {
    name: "Orders",
    items: [
      {
        name: "Orders",
        icon: <TruckIcon className="h-5 w-5 text-red-600" />,
        link: "/dashboard/Orders",
        roles: ["ADMIN", "cashier"],
      },
    ],
  },
  {
    name: "Member Lab",
    items: [
      {
        name: "Member Lab",
        icon: (
          <AlignVerticalDistributeEndIcon className="h-5 w-5 text-cyan-600" />
        ),
        link: "/dashboard/MemberLab",
        roles: ["ADMIN", "EDITOR", "REGISTER"],
      },
    ],
  },
  {
    name: "Community",
    items: [
      {
        name: "Meals",
        icon: <UtensilsCrossed className="h-5 w-5 text-[#4CAF50]" />,
        link: "/dashboard/Table",
        roles: ["ALL"],
      },
      {
        name: "User account",
        icon: <Users className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/UserAccount",
        roles: ["ALL"],
      },
      {
        name: "Order history",
        icon: <History className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/OrderHistory",
        roles: ["ALL"],
      },
      {
        name: "Reviews",
        icon: <Star className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/Reviews",
        roles: ["ALL"],
      },
      {
        name: "User Recipes",
        icon: <Settings className="h-5 w-5 text-gray-500" />,
        link: "/dashboard/UserRecipes",
        roles: ["ALL"],
      },
    ],
  },
];

export default function AppSidebar() {
  const userRole =
    JSON.parse(localStorage.getItem("userInfo") || "{}")?.Role || "";
  const userToken = localStorage.getItem("token");

  // If the user doesn't have a token, they are redirected
  if (!userToken) {
    // Handle redirection logic here, for example:
    window.location.href = "/login";
    return null; // return nothing if the user is not authenticated
  }

  return (
    <div className="bg-[#f0f9f0] w-[250px] h-screen flex flex-col border-r">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 p-6 border-b">
        <div className="w-10 h-10 rounded-full bg-gray-200">
          {/* Placeholder Avatar */}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">
            Hello {userRole}
          </span>
          <span className="text-xs text-gray-500">Your plan: Free</span>
        </div>
      </div>
      <button className="mt-6 w-full bg-[#4CAF50] text-white hover:bg-[#43a047] py-2 px-4 rounded flex items-center justify-center">
        <Plus className="mr-2 h-4 w-4" />
        Create new meal
      </button>

      {/* Sidebar Menu */}
      <div className="flex-1 overflow-auto p-4">
        {sidebarConfig.map((group, index) => (
          <div key={index} className="mt-6">
            <div className="text-xs font-semibold text-gray-600 mb-2">
              {group.name.toUpperCase()}
            </div>
            <div>
              {group.items.map(
                (item, idx) =>
                  (item.roles.includes("ALL") ||
                    item.roles.includes(userRole)) && (
                    <Link key={idx} to={item.link}>
                      <div className="flex items-center gap-4 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4">
        <Link to="/logout">
          <div className="flex items-center gap-4 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
            <LogOut className="h-5 w-5 text-gray-500" />
            <span>Log out</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
