'use client';

import { Button } from '@/components/ui/button';
import { LoaderCircle, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UpdateCartContext } from '../context/UpdateCartContext';
import GlobalApi from '../utils/GlobalApi';

function ProductItemDetail({ product }) {
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);

    const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
    const [productTotalPrice, setProductTotalPrice] = useState(
        product.price ? product.price : product.mrp
    );
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    // Read sessionStorage safely (only in client)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const jwtToken = sessionStorage.getItem('jwt');
            const userData = JSON.parse(sessionStorage.getItem('user'));
            setJwt(jwtToken);
            setUser(userData);
        }
    }, []);

    const addToCart = () => {
        if (!jwt || !user) {
            router.push('/sign-in');
            return;
        }

        setLoading(true);

        const data = {
            data: {
                quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                products: product.id,
                userId: user.id,  // <-- relation field, not userId
            }
        };


        GlobalApi.addToCart(data, jwt).then(
            (resp) => {
                console.log(resp);
                toast('Added to Cart');
                setUpdateCart(!updateCart);
                setLoading(false);
            },
            (err) => {
                toast('Error while adding to cart');
                setLoading(false);
            }
        );
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
            <Image
                src={`http://localhost:1337${product.image.formats.thumbnail.url}`}
                alt={product.name}
                width={300}
                height={300}
                className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
            />

            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <h2 className="text-sm font-bold text-gray-500">{product.description}</h2>

                <div className="flex gap-3">
                    {product.price && <h2 className="font-bold text-3xl">${product.price}</h2>}
                    <h2
                        className={`font-bold text-3xl ${product.price ? 'line-through text-gray-500' : ''}`}
                    >
                        ${product.mrp}
                    </h2>
                </div>

                <h2 className="font-bold text-lg">{product.itemQuantityType}</h2>

                <div className="flex flex-col items-baseline gap-3">
                    <div className="flex gap-3 items-center">
                        <div className="flex gap-10 items-center p-2 border px-3">
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                                -
                            </button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className="text-2xl font-bold">
                            = ${(quantity * productTotalPrice).toFixed(2)}
                        </h2>
                    </div>

                    <Button
                        className="flex gap-3 bg-green-600 text-white hover:bg-green-800"
                        disabled={loading}
                        onClick={addToCart}
                    >
                        <ShoppingBasket />
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Add to Cart'}
                    </Button>
                </div>

                {product.categories && product.categories.length > 0 && (
                    <h2>
                        <span className="font-bold">Category:</span> {product.categories[0].name}
                    </h2>
                )}
            </div>
        </div>
    );
}

export default ProductItemDetail;
