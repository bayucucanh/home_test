import React from "react";

function EditDeletePopup({ onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Choose an Option</h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-4"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EditDeletePopup;
