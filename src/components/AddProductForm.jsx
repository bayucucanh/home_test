// src/components/AddProductForm.js
import { useUploadProductMutation } from "@/pages/api/api";
import React, { useState } from "react";

function AddProductForm({ isOpen, onClose, onAdd }) {
  const [uploadProduct, { isLoading, isError }] = useUploadProductMutation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  // const [productStock, setProductStock] = useState(1);
  const [productImage, setProductImage] = useState(null);
  const [productLocation, setProductLocation] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageError, setImageError] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  // const handleProductStockChange = (event) => {
  //   setProductStock(event.target.value);
  // };

  const handleProductImageChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(event);

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 100 * 1024; // 100KB

      if (
        allowedTypes.includes(selectedFile.type) &&
        selectedFile.size <= maxSize
      ) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError(
          "Invalid file type or size. Please choose a PNG, JPG, or JPEG image up to 100KB."
        );
      }
    }
  };

  const handleProductLocationChange = (event) => {
    setProductLocation(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const newProduct = {
    //   name: productName,
    //   picture: productImage,
    //   price: parseInt(productPrice),
    //   location: productLocation,
    //   description: productDescription,
    //   status: "available",
    //   id_category_product: 1,
    // };
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("picture", productImage);
    formData.append("price", parseInt(productPrice));
    formData.append("location", productLocation);
    formData.append("description", productDescription);
    formData.append("status", "available");
    formData.append("id_category_product", 1);

    try {
      console.log("new product", formData);
      const response = await uploadProduct(formData);
      console.log(response);
      onClose();
    } catch (error) {
      alert.error("Upload error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image:
              </label>
              <input
                type="file"
                id="productImage"
                accept="image/*"
                onChange={handleProductImageChange}
                className="mt-1"
                required
              />
              {imageError && <p className="text-red-500">{imageError}</p>}
            </div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price:
            </label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="productStock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock:
            </label>
            <input
              type="number"
              id="productStock"
              value={productStock}
              onChange={handleProductStockChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="productLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Product Location:
            </label>
            <input
              type="text"
              id="productLocation"
              value={productLocation}
              onChange={handleProductLocationChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description:
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              rows="4"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
