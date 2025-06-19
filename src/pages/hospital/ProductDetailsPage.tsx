import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <p className="mb-2">
        Product ID: <span className="font-mono">{id}</span>
      </p>
      <div className="text-gray-500">
        This is a placeholder for the product details page.
      </div>
    </div>
  );
};

export default ProductDetailsPage;
