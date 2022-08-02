import Link from 'next/link';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const ProductItem = ({ product }) => {
  return (
    <>
      <div class="max-w-sm rounded-sm border border-gray-300">


        <Link
          href={{ pathname: "/product/productPage", query: { pid: product._id } }}
        >
           <a>
          <img class="m-3  h-40 w-40 mx-auto rounded-sm hover:scale-150 transform-gpu"  src={`http://localhost:4000/${product.image}`} alt="" />
        </a>
        </Link>
        <div class="p-5">
          <p className='text-lg '>{product.name}</p>
          <div class="flex item-center  mx-auto">
            <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <svg class="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <svg class="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          </div>
          <div class="flex item-center justify-between mt-3">
            <h1 class="text-white-700 font-bold text-xl">${product.price}</h1>

          </div>


        </div>
      </div>
    </>
  );
}
export default ProductItem;    