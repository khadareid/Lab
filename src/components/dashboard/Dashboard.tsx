'use client'

import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { FaBook, FaUser, FaDollarSign, FaCalendarAlt, FaChartLine } from "react-icons/fa"
import { Search, Bell, ChevronRight, Play, Clock, MoreVertical } from 'lucide-react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Books Borrowed",
        data: [65, 59, 80, 81, 56, 55, 40, 55, 75],
        fill: false,
        borderColor: "rgb(147, 51, 234)",
        tension: 0.4,
      },
      {
        label: "Books Returned",
        data: [28, 48, 40, 19, 86, 27, 90, 46, 62],
        fill: false,
        borderColor: "rgb(59, 130, 246)",
        tension: 0.4,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Management Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <FaUser />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Books", value: "1,234", icon: FaBook, color: "bg-purple-500" },
            { title: "Books Borrowed", value: "567", icon: FaChartLine, color: "bg-blue-500" },
            { title: "Books Returned", value: "432", icon: FaBook, color: "bg-green-500" },
            { title: "Active Users", value: "891", icon: FaUser, color: "bg-pink-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <stat.icon className="text-2xl" />
                </div>
                <div>
                  <p className="text-white/80">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Course and Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Featured Course */}
          <div className="lg:col-span-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Sharpen Your Skills with Professional Courses
            </h2>
            <p className="mb-6 text-white/80">
              Enhance your knowledge and stay ahead in the rapidly evolving world of literature and information management.
            </p>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition duration-300">
              Explore Courses
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Borrowing Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Borrowing Trends</h3>
              <select className="bg-gray-100 rounded-lg px-3 py-1 text-sm text-gray-700">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: "John Doe", action: "borrowed", book: "React Basics", time: "2h ago" },
                { user: "Sarah Connor", action: "returned", book: "CSS Mastery", time: "4h ago" },
                { user: "Mike Ross", action: "borrowed", book: "JavaScript Pro", time: "6h ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <FaUser />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                    <p className="text-xs text-gray-600">
                      {activity.action} "{activity.book}"
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>Return Schedule</span>
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-gray-600 font-medium py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm
                    ${i === 15 ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {((i + 1) % 31) || 31}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Categories and Lessons */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Categories</h3>
          <div className="flex gap-4 mb-8">
            {[
              { name: "UX/UI Design", color: "bg-purple-100 text-purple-600" },
              { name: "Branding", color: "bg-pink-100 text-pink-600" },
              { name: "Front End", color: "bg-blue-100 text-blue-600" },
            ].map((category) => (
              <div
                key={category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${category.color} flex items-center gap-2`}
              >
                <span>+</span>
                {category.name}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Lessons</h3>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Pethung Santo</p>
                  <p className="text-xs text-gray-500">Mentor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-600 text-sm">UX DESIGN</span>
                <h4 className="text-sm font-medium text-gray-800">Understand Of UI/UX Design</h4>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Clock className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

