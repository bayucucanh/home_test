import React, { useState } from "react";
// import { useParams, Link } from 'react-router-dom';
import EditDeletePopup from "@/components/Edit&DeletePopUp";
import {
  useDeleteProductMutation,
  useGetDetailQuery,
  useGetProductQuery,
} from "../api/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import EditProductPopup from "@/components/FormEdit";

function ProductDetailPage() {
  const { query } = useRouter();
  const { data, isLoading, isError } = useGetDetailQuery(query.id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (isError) {
  //   return <p>Error loading product detail.</p>;
  // }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Panggil mutasi deleteProduct dengan ID produk
      try {
        console.log(data.id);
        const response = await deleteProduct(query?.id);
        console.log(response);
      } catch (error) {
        alert.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        Back to Product List
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={data?.data?.picture}
          // alt={data.name}
          className="w-full h-auto object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">{data?.data?.name}</h2>
          <p className="text-gray-600 mb-4">${data?.data?.price}</p>
          <p className="text-gray-700 mb-4">{data?.data?.description}</p>
          <button
            onClick={handleEditClick}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md"
          >
            Edit Product
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md"
          >
            Delete Product
          </button>
        </div>
      </div>
      {isEditPopupOpen && (
        <EditProductPopup
          product={data?.data}
          onUpdate={handleEditClick}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
