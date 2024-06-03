"use client";
import Trash from "@/components/Icons/Trash";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import DeleteButton from "@/components/layout/DeleteButton";
import useProfile from "@/components/layout/useProfile";
import { quantico } from "@/utils/fonts";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editableCategory, setEditableCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };
    const creationPromise = new Promise(async (resolve, reject) => {
      if (editableCategory) {
        data._id = editableCategory._id;
      }
      const res = await fetch("/api/categories", {
        method: editableCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditableCategory(null);
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: editableCategory ? "Updating category" : "Creating Category...",
      success: editableCategory
        ? "Update category successfully"
        : "Category Created Successfully",
      error: "Error Creating Category",
    });
  }

  async function handleDeleteCategory(_id) {
    const deletionPromise = new Promise(async (resolve, reject) => {
      const res = await fetch(`/api/categories?_id=${_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(deletionPromise, {
      loading: "Deleting Category...",
      success: "Category Deleted Successfully",
      error: "Error Deleting Category",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return "Loading Category info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <div className="mt-6 px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <form
        onSubmit={handleFormSubmit}
        className={`${quantico.className} flex flex-col gap-2 mt-8`}
      >
        <label className="text-white">
          {editableCategory ? "Update Category name:" : "New category name"}
          {editableCategory && (
            <span className="ml-2 font-semibold">{editableCategory?.name}</span>
          )}
        </label>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(ev) => setCategoryName(ev.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          className="border rounded-md text-white font-semibold max-w-lg mx-auto p-2"
        >
          {editableCategory ? "Update Category" : "New Category"}
        </button>
      </form>
      <div className={`${quantico.className} mt-6`}>
        <h3 className="text-gray-500">Existing Category:</h3>
        <div className="mt-1">
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between border p-2 rounded-md mb-2 text-white"
              >
                <h3>{category.name}</h3>
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEditableCategory(category);
                      setCategoryName(category.name);
                    }}
                  >
                    <FaEdit title="Edit" className="text-2xl text-white" />
                  </button>
                  <DeleteButton
                    onDelete={() => handleDeleteCategory(category._id)}
                    label={<Trash />}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
