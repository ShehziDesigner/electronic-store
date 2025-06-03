'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GlobalApi from '@/app/utils/GlobalApi';
;


export default function ProductDetailPage({ slug }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`)
    .then(res => res.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        setProduct(data.data[0].attributes);
      } else {
        setProduct(null); // Handle product not found
      }
      setLoading(false);
    })
    .catch(() => {
      setProduct(null);
      setLoading(false);
    });
}, [slug]);

if (loading) return <p>Loading...</p>;

return (
    <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <Image
                    alt={product.name || "product image"}
                    width={500}
                    height={500}
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                    src={product.image.formats.small.url ||
                        `http://localhost:1337${product.image.formats.small.url}`}
                />

                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        {product.category.data.name}
                    </h2> */}
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                        {product.name}
                    </h1>
                    <div className="flex mb-4">
                        ⭐⭐⭐⭐☆ <span className="text-gray-600 ml-2">4 Reviews</span>
                    </div>
                    <p className="leading-relaxed">
                        {product.description}
                    </p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                        <div className="flex ml-6 items-center">
                            <span className="mr-3">Quantity:</span>
                            <span>{product.quantity}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <span className="title-font font-medium text-2xl text-gray-900">
                            ${product.price}
                        </span>
                        <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                            Add to Cart
                        </button>
                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};

