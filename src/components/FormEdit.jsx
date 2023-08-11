import { useUpdateProductMutation } from "@/pages/api/api";
import React, { useState } from "react";

function EditProductPopup({ product, onUpdate, onClose }) {
  const [name, setName] = useState(product.name);
  const [imageFile, setImageFile] = useState(product.picture);
  const [imageError, setImageError] = useState("");
  const [price, setPrice] = useState(product.price);
  const [location, setLocation] = useState(product.location);
  const [description, setDescription] = useState(product.description);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(file.name)) {
        setImageError("Please upload a valid image (JPG, JPEG, PNG)");
      } else if (file.size > 100 * 1024) {
        setImageError("Image size should be less than 100KB");
      } else {
        setImageFile(file);
        setImageError("");
      }
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (updatedProductData) => {
    updatedProductData.preventDefault();
    console.log("updatedProductData", name);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", imageFile);
    formData.append("price", parseInt(price));
    formData.append("location", location);
    formData.append("description", description);
    formData.append("status", "available");
    formData.append("id_category_product", 1); // Pastikan nama field sesuai dengan backend

    const data = {
      name: name,
      price: price,
      location: location,
      picture: imageFile,
      description: description,
      status: "available",
      id_category_product: 1,
    };
    try {
      console.log(product.id);
      const response = await updateProduct({ id: product.id, data });
      console.log(response);
    } catch (error) {
      alert.error("Upload error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-700"
            >
              Picture
            </label>
            <input
              type="file"
              id="image"
              onChange={handlePictureChange}
              className="mt-1"
              accept="image/jpeg, image/png"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPopup;
