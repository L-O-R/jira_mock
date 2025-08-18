import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  type: yup.string().required("Type is required"),
});

const ModelPortal = ({ onClose }) => {
  // Hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch form fields for dynamic URL generation
  const name = watch("name", "");
  const type = watch("type", "");

  // Dynamic URL based on form fields
  const dynamicUrl = `/project/${type || "type"}/${
    name || "name"
  }`;

  // Fetch userID from localStorage
  const userObj = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const userId = userObj.id || "";

  // Handle save to localStorage
  const onSubmit = (data) => {
    // Read previous projectData
    const prevData = JSON.parse(
      localStorage.getItem("projectData") || "[]"
    );
    const newEntry = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(
      "projectData",
      JSON.stringify([...prevData, newEntry])
    );
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="bg-black/50 p-4 flex flex-col justify-center items-center border-2 border-gray-50 fixed top-0 left-0 w-full h-full"
      onClick={(e) => e.stopPropagation()}>
      <form
        className="bg-white p-6 rounded shadow-md flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <label>
          Project Name:
          <input
            {...register("name")}
            className="border p-2 w-full"
          />
          {errors.name && (
            <span className="text-red-500">
              {errors.name.message}
            </span>
          )}
        </label>

        <label>
          Project Type:
          <input
            {...register("type")}
            className="border p-2 w-full"
          />
          {errors.type && (
            <span className="text-red-500">
              {errors.type.message}
            </span>
          )}
        </label>

        <div className="text-sm mt-2">
          <strong>Dynamic URL: </strong>
          {dynamicUrl}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded">
          Save
        </button>
        <button
          type="button"
          className="text-white bg-gray-800 mt-2"
          onClick={onClose}>
          Close
        </button>
      </form>
    </div>,
    document.getElementById("modalPortal")
  );
};

export default ModelPortal;
