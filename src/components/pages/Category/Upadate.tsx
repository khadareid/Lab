import { useEffect, useState } from "react";
import {
  Search,
  Book,
  Bookmark,
  Clock,
  Laptop,
  MoreHorizontal,
  FlaskConical,
  RefreshCw,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redex/Store";
import { fetchCategories, deleteCategory } from "@/Redex/All Tables slice/Category";
import toast from "react-hot-toast";

enum CategoryType {
  NOVALS = "NOVALS",
  NONFICTION = "NONFICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  TECHNOLOGY = "TECHNOLOGY",
  OTHER = "OTHER",
}

export default function CategoryManagement() {
  const AllCategory = useSelector((state: RootState) => state.Category);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All Categories");

  const filteredCategories = AllCategory.categories?.filter(
    (category: any) => {
      if (activeFilter === "All Categories") return true;
      return category.type === activeFilter.toUpperCase();
    }
  );

  const getCategoryIcon = (type: CategoryType) => {
    switch (type) {
      case CategoryType.NOVALS:
        return <Book className="h-5 w-5 text-green-500 mr-2" />;
      case CategoryType.NONFICTION:
        return <Bookmark className="h-5 w-5 text-blue-500 mr-2" />;
      case CategoryType.SCIENCE:
        return <FlaskConical className="h-5 w-5 text-green-500 mr-2" />;
      case CategoryType.HISTORY:
        return <Clock className="h-5 w-5 text-amber-500 mr-2" />;
      case CategoryType.TECHNOLOGY:
        return <Laptop className="h-5 w-5 text-red-500 mr-2" />;
      default:
        return <MoreHorizontal className="h-5 w-5 text-gray-500 mr-2" />;
    }
  };

  const handleDelete = async (categoryId: number, categoryName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category: ${categoryName}?`);

    if (confirmDelete) {
      toast.loading("Deleting...", { id: "deleteCategoryToast" });

      try {
        await dispatch(deleteCategory(categoryId)).unwrap();
        toast.success(`Category "${categoryName}" deleted successfully!`, { id: "deleteCategoryToast" });
      } catch (error) {
        toast.error("Failed to delete category", { id: "deleteCategoryToast" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-green-600">Category Management</span>
            <div className="w-full sm:w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto py-2">
            {["All Categories", "Novels", "Non-Fiction", "Science", "History", "Technology", "Other"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  activeFilter === item
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-green-500 hover:border-b-2 hover:border-green-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link to="/dashboard/CreateCtgy">
            <button className="mt-4 sm:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add Category
            </button>
          </Link>
        </div>

        <div className="bg-white will-change-transform rounded-lg shadow">
          {/* Table Header */}
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-6 py-3 bg-gray-50 rounded-t-lg">
            <div className="text-sm font-medium text-gray-500">NAME</div>
            <div className="text-sm font-medium text-gray-500">TYPE</div>
            <div className="text-sm font-medium text-gray-500">BOOKS</div>
            <div className="text-sm font-medium text-gray-500">CREATED AT</div>
            <div className="text-sm font-medium text-gray-500">UPDATED AT</div>
            <div className="text-sm font-medium text-gray-500">ACTIONS</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredCategories?.map((category: any) => (
              <div key={category.id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-6 py-4">
                <div className="flex items-center">
                  {getCategoryIcon(category.type)}
                  <span className="font-medium">{category.name}</span>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {category.type}
                  </span>
                </div>
                <div>{category.bookCount} books</div>
                <div className="text-sm text-gray-500">
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(category.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex grid-cols-2 gap-1 sm:grid-cols-4">
                  <Link to={`/category/edit/${category.id}`}>
                    <button className="flex items-center px-1 py-1 bg-yellow-600 text-white rounded-sm hover:bg-yellow-700 text-xs">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                  </Link>
                  <Link to={`/dashboard/Category/Upadate/${category.id}`}>
                    <button className="flex items-center px-1 py-1 bg-green-600 text-white rounded-sm hover:bg-green-700 text-xs">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete}
                    className="flex items-center px-1 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
