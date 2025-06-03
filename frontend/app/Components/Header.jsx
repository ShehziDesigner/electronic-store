'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { CircleUserRound, Search, ShoppingCartIcon, User2 } from 'lucide-react'
import GlobalApi from '../utils/GlobalApi'
import { usePathname, useRouter } from 'next/navigation'

// async function fetchCategories() {
//     const res = await fetch('http://localhost:1337/api/categories')
//     const categoryList = await res.json()
//     return categoryList.data
// }

function Header() {
    const [categoryList, setCategoryList] = useState([])
    const [isLogin, setIsLogin] = useState(false);
    const pathname = usePathname();
    let jwt;
    let user;

    if (typeof window !== 'undefined') {
        jwt = sessionStorage.getItem('jwt');
        user = JSON.parse(sessionStorage.getItem('user'));
    }
    const router = useRouter();

    useEffect(() => {
        getCategoryList()
    }, [])


    const getCategoryList = () => {
        GlobalApi.getCategory().then((resp) => {
            setCategoryList(resp.data.data)
        })
    }


    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        setIsLogin(!!token);
        getCategoryList();
    }, [pathname]);

    const onSignOut = () => {
        sessionStorage.clear();
        router.push('/sign-in')

    }


    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 px-4 flex-col md:flex-row items-center">
                <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        height={80}
                        width={200}
                    />
                </Link>
                <nav className="md:ml-auto md:mr-auto gap-x-5 flex flex-wrap items-center font-medium text-[18px] justify-center">
                    <Link href={'/'} className="hover:text-gray-900">Home</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>Category</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Our Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categoryList.map((category) => (
                                <Link href={`/category/${category.name}`} key={category.id}>
                                    <DropdownMenuItem> {category.name} </DropdownMenuItem>
                                </Link>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href={'/blog'} className="hover:text-gray-900">Blog</Link>
                    <Link href={'/cart'} className="hover:text-gray-900">Cart</Link>
                    <Link href={'/'} className="hover:text-gray-900">Contact</Link>
                </nav>
                <div className='flex items-center gap-x-2'>
                    <Search className='text-gray-900 cursor-pointer' />
                    <Link href={`/cart`}>
                        <ShoppingCartIcon className='text-gray-900 cursor-pointer' />
                    </Link>
                    {!isLogin ? (
                        <Link href="/sign-in">
                            <Button>Login</Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button aria-label="User menu">
                                    <CircleUserRound
                                        className="h-12 w-12 bg-red-100 text-red-800 p-2 rounded-full cursor-pointer"
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem key="profile">Profile</DropdownMenuItem>
                                <DropdownMenuItem key="orders">My Orders</DropdownMenuItem>
                                <DropdownMenuItem key="logout" onClick={onSignOut}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

            </div>
        </header>
    )
}

export default Header