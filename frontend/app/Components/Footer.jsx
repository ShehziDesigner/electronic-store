import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="text-gray-600 body-font border">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <Image src="/logo.png" alt="Logo" width={150} height={150} className="rounded-full" />
                </a>
                <p className=" text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 DROU —
                    <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Hasnain_Shehzad</a>
                </p>
                <div className="flex gap-x-4 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                   <Link href={'/'} >
                    <Facebook className="text-gray-500 hover:text-gray-700" />
                   </Link>
                   <Link href={'/'} >
                    <Linkedin className="text-gray-500 hover:text-gray-700" />
                   </Link>
                   <Link href={'/'} >
                    <Instagram className="text-gray-500 hover:text-gray-700" />
                   </Link>
                   <Link href={'/'} >
                    <Twitter className="text-gray-500 hover:text-gray-700" />
                   </Link>                   
                </div>
            </div>
        </footer>
    )
}

export default Footer