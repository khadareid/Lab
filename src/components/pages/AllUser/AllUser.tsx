"use client";

import { AppDispatch, RootState } from "@/Redex/Store";
import { fetchUsers } from "@/Redex/All Tables slice/user";
import { ChevronDown, Filter, Search, Plus, MoreVertical } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllUser() {
  const Alluserss = useSelector((state: RootState) => state.Allusers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Showing</span>
            <button className="px-3 py-1 text-sm border rounded-md flex items-center gap-2">
              10 <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1 border rounded-md text-gray-700">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Link to={"/dashboard/CreateUser"}>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New User
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  User Name <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  User ID <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Email <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Role <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(Alluserss.users as any)?.result?.map((user: any, index: any) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.image ||
                        "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />

                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{user.id}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <button className="px-3 py-1 border rounded-md text-gray-600">
          Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
            5
          </button>
        </div>
        <button className="px-3 py-1 border rounded-md text-gray-600">
          Next
        </button>
      </div>
    </div>
  );
}
