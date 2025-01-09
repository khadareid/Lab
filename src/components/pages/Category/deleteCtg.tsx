// import { useDispatch } from "react-redux";
// import { deleteCategory } from "@/Redex/All Tables slice/Category";
// import toast from "react-hot-toast";
// import { Trash2 } from "lucide-react";

// const DeleteCategoryButton = ({
//   id,
//   categoryName,
// }: {
//   id: number; 
//   categoryName: string;
// }) => {
//   const dispatch = useDispatch();
//   const toastId = "deleteCategoryToast";

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete the category: ${categoryName}?`);

//     if (confirmDelete) {
//       toast.loading("Deleting...", { id: toastId });

//       try {
//         await dispatch(deleteCategory(id)).unwrap();
//         toast.success(`Category "${categoryName}" deleted successfully!`, { id: toastId });
//       } catch (error) {
//         toast.error("Failed to delete category", { id: toastId });
//       }
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       className="flex items-center px-1 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 text-xs"
//     >
//       <Trash2 className="h-3 w-3 mr-1" />
//       Delete
//     </button>
//   );
// };

// export default DeleteCategoryButton;
