import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stars, StarsIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductItemDetail from './ProductItemDetail'

function ProductCard({ product }) {
    return (

            <div className="group relative w-60 h-76 hover:h-88 bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all duration-300 cursor-pointer py-6">
                <Image
                    src={`http://localhost:1337${product.image?.formats?.small?.url ||
                        product.image?.formats?.thumbnail?.url ||
                        product.image?.formats?.medium?.url ||
                        product.image?.formats?.large?.url ||
                        product.image?.url || ''
                        }`}

                    width={240}
                    height={240}
                    alt={product.name}
                    className="w-full h-40 object-contain p-4"
                />

                <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
                    <div className="text-red-600 font-bold text-lg mt-2">$ {product.price} <span className="line-through text-gray-400 text-sm">${product.mrp}</span></div>
                </div>


                
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white px-4 py-2 text-sm rounded">
                                Add to Cart
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <ProductItemDetail product={product} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
            </div>

    )
}

export default ProductCard