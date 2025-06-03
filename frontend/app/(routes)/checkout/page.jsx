"use client"
import GlobalApi from '@/app/utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ArrowBigRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [totalCartItems, setTotalCartItems] = useState(0)
    const [cartItemList, setCartItemList] = useState([]);
    const [subtotal, setSubTotal] = useState(0)
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [zip, setZip] = useState();
    const [address, setAddress] = useState();
    const [totalAmount, setTotalAmount] = useState();



    const router = useRouter();

    useEffect(() => {
        if (!jwt) {
            router.push('/sign-in')
        }
        getCartItems();
    }, [])

    const getCartItems = async () => {
        const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
        console.log(cartItemList_);
        setTotalCartItems(cartItemList_?.length)
        setCartItemList(cartItemList_);
    }

    useEffect(() => {
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount
        });
        setTotalAmount((total * 0.9 + 15).toFixed(2));
        setSubTotal(total)
    }, [cartItemList])

    const onCalculateTotalAmount = () => {
        const totalAmount = subtotal * 0.9 + 15;
        return totalAmount.toFixed(2);
    }

    const onApprove = (data) => {
        console.log(data);

        const payload = {
            data: {
                paymentId: (data.paymentId).toString(),
                totalOrderAmount: totalAmount,
                username: username,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
                orderItemList: cartItemList,
                userId: user.id

            }
        }
        GlobalApi.createOrder(payload, jwt).then(resp => {
            console.log(resp);
            toast('Order Places SuccessFully!!  ')
        })
    }
    return (
        <div className="min-h-screen  p-8">
            <h1 className="text-center text-2xl font-bold text-green-800 mb-6">Checkout</h1>
            <div className="  mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Billing Details */}
                <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Name" className="border p-2 rounded" onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Email" className="border p-2 rounded" onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Phone" className="border p-2 rounded" onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder="Zip" className="border p-2 rounded" onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <Input
                        placeholder="Address"
                        className="mt-4 border p-2 rounded w-full"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Cart Summary */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className=" bg-gray-100 p-2 rounded-md text-center text-lg font-semibold mb-4">
                        Total Cart ({totalCartItems} items)
                    </h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex font-bold justify-between">
                            <span>Subtotal :</span>
                            <span>$ {subtotal}</span>
                        </div>
                        <div className="flex font-bold justify-between">
                            <span>Delivery :</span>
                            <span>$15.00</span>
                        </div>
                        <div className="flex font-bold justify-between">
                            <span>Tax (9%) :</span>
                            <span>${(totalCartItems * 0.10).toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total :</span>
                            <span>$ {onCalculateTotalAmount()}</span>
                        </div>
                    </div>
                    <Button onClick={() => onApprove({ paymentId: 123 })} className="w-full mt-4 p-6 text-lg bg-green-700 hover:bg-green-800 text-white">
                        Payment <ArrowBigRight />
                    </Button>
                    <PayPalScriptProvider options={{ "client-id": "test" }}>
                        <PayPalButtons
                            className="mt-3"
                            style={{ layout: "horizontal" }}
                            onApprove={onApprove}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalAmount,
                                                currency_code: "USD",
                                            },
                                        },
                                    ],
                                });
                            }}
                        />
                    </PayPalScriptProvider>

                </div>
            </div>
        </div>
    )
}

export default Checkout