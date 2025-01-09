import {
  createCategory,
  resetCategoryState,
} from "@/Redex/All Tables slice/Category";
import { AppDispatch, RootState } from "@/Redex/Store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateCategoryForm = () => {
  const CreateCategory = useSelector((state: RootState) => state.Category);

  const toasId: string = "studentToast";
  const [name, Setname] = useState<string | undefined>("");
  const [CategoryType, SetCategoryType] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const registerHandle = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      CategoryType,
      name,
    };

    toast.loading("Waiting..", { id: toasId });
    dispatch(createCategory(data));
  };

  useEffect(() => {
    if (CreateCategory.isSuccess) {
      toast.success("Registered", { id: toasId });
      // navigate('/dashboard/AllExpenses')
      dispatch(resetCategoryState());
    }

    if (CreateCategory.isError) {
      toast.error(CreateCategory.errorMsg, { id: toasId });
    }
  }, [CreateCategory.isError, CreateCategory.isSuccess, dispatch, navigate]);



  return (
    <div className="h-full flex items-center justify-center bg-green-100 dark:bg-green-800">
      <form
        onSubmit={registerHandle}
        className="max-w-md w-full bg-white dark:bg-green-900 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-6 text-center">
          Create Category
        </h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="category_name"
            value={name}
            onChange={(e) => Setname(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="category_name"
            className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Category Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="type"
            id="category_type"
            value={CategoryType}
            onChange={(e) => SetCategoryType(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          >
            {[
              { value: "NOVALS" },
              { value: "NONFICTION" },
              { value: "SCIENCE" },
              { value: "HISTORY" },
              { value: "TECHNOLOGY" },
              { value: "OTHER" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <label
            htmlFor="category_type"
            className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Category Type
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-green-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
