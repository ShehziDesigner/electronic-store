'use client'
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function CartItemList({ cartItemList, onDeleteItem }) {

    const [subtotal, setSubTotal] = useState(0)

    useEffect(() => {
        let total = 0;
        cartItemList.forEach(element => {
            total = total+element.amount
        });
        setSubTotal(total)
    }, [cartItemList])

    return (
        <ul className="space-y-6">
            {cartItemList.map((cart, index) => (
            <li className="flex flex-col sm:flex-row gap-4 items-center border-b pb-6" key={index}>
                <Image
                    src={`http://localhost:1337${cart.image}`}
                    alt="Product"
                    className="w-24 h-24 rounded-lg object-cover"
                    width={96}
                    height={96}
                />

                <div className="flex-1 w-full">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">{cart.name}</h2>
                        <span className="text-sm text-gray-600">$ {cart.amount * cart.quantity}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Quantity: {cart.quantity} &middot; </div>

                    <div className="mt-4 flex items-center gap-3">
                        {/* {cart.quantity} */}
                        <Trash className='hover:text-red-700' onClick={()=>onDeleteItem(cart.id)} />

                    </div>
                </div>
            </li>
            ))}
            {/* <!-- Repeat for other cart items --> */}
        </ul>
    )
}

export default CartItemList