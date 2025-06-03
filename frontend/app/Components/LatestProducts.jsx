import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';


async function fetchProductList() {
    const resp = await fetch("http://localhost:1337/api/products?populate=*");
    const productList = await resp.json();
    return productList.data;
}


async function LatestProducts() {
    const getProductList = await fetchProductList();

    return (
        <section className="text-gray-600 body-font">
            <div className=" py-24">
                <div className='flex justify-between items-center'>
                    <h2 className="text-3xl font-bold mb-12">
                        Latest Products
                    </h2>
                    <span className='flex items-center text-sm font-bold'>
                        <Link href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                            View All
                        </Link>
                        <ArrowRight />
                    </span>
                </div>
                <div className="flex space-x-6">
                    {getProductList.slice(0,5).map((product) => (

                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestProducts