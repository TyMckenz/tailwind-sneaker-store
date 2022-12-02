import Link from 'next/link';
import React from 'react';

export default function ProductItems({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg mb-2 mt-2">{product.name}</h2>
        </Link>
        <p className="mb-1">{product.brand}</p>
        <p className="mb-1">{product.catagory}</p>
        <p className="mb-1">${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
