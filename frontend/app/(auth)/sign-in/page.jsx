'use client'
import { Button } from '@/components/ui/button'
import React, { use, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import GlobalApi from "@/app/utils/GlobalApi"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const [loader, setLoader] = useState();

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
    }, [])

    const onSignIn = () => {
        setLoader(true);
        GlobalApi.SignIn(email, password).then((resp) => {
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);
            toast("Login Successfully")
            router.push('/');
            setLoader(false);

        }, (e) => {
            toast(e?.response?.data?.error?.message)
            setLoader(false);
        })
    }
    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src="/logo.png" alt="Logo" width={200} height={200} />
                <h2 className='font-bold text-3xl'>Sign in to Account</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to Sign in </h2>
                <div className="w-full flex flex-col gap-4 mt-7">
                    <Input placeholder='name@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className='bg-green-800 text-white' onClick={() => onSignIn()}
                        disabled={!email || !password}
                    >{loader?<LoaderIcon className='animate-spin' />: 'Sign In'}</Button>
                    <p>
                        Don't have an account? <Link href="/create-account" className='text-blue-500'>Click here to Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn