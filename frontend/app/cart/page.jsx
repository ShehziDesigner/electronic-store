'use client';
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../context/UpdateCartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Car, Trash } from 'lucide-react';
import CartItemList from '../Components/CartItemList';
import { toast } from 'sonner';
import Link from 'next/link';


function UserCart() {
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0)
  const router = useRouter()
  const [subtotal, setSubTotal] = useState(0)
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);




  let jwt;
  let user;


  if (typeof window !== 'undefined') {
    jwt = sessionStorage.getItem('jwt');
    // user = JSON.parse(sessionStorage.getItem('user'));
    user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

  }


  useEffect(() => {
    getCartItems();
    if (!jwt || !user) {
      router.push('/sign-in');
      return;
    }
  }, [updateCart])

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    });
    setSubTotal(total)
  }, [cartItemList])



  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast('Item Removed from Cart')
      getCartItems();
    })
  }

  // use to get total cart items

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log(cartItemList_);
    setTotalCartItems(cartItemList_?.length)
    setCartItemList(cartItemList_);
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />

      <div className="mt-10 max-w-md ml-auto space-y-4">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <span>VAT (10%)</span>
          <span>${(subtotal * 0.10).toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>- $20.00</span>
        </div>

        <div className="flex justify-between text-base font-semibold border-t pt-4">
          <span>Total</span>
          <span>${(subtotal + subtotal * 0.10 - 20).toFixed(2)}</span>
        </div>

        <Button className="w-full bg-gray-900 text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition">
          <Link href={"/checkout"} className="flex items-center justify-center gap-2">
            Proceed to Checkout
          </Link>
        </Button>
      </div>
    </section>


  )
}

export default UserCart