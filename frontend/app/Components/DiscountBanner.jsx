'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from '../utils/GlobalApi';
import { Button } from '@/components/ui/button';

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 310); // e.g., 310 days from now

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });

      if (distance < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const boxStyle =
    'bg-white rounded-lg shadow px-4 py-2 text-center text-sm font-semibold';

  return (
    <div className="flex gap-3 mt-6">
      <div className={boxStyle}>
        <div>{timeLeft.days}</div>
        <span className="text-xs text-gray-500">DAYS</span>
      </div>
      <div className={boxStyle}>
        <div>{String(timeLeft.hours).padStart(2, '0')}</div>
        <span className="text-xs text-gray-500">HRS</span>
      </div>
      <div className={boxStyle}>
        <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
        <span className="text-xs text-gray-500">MINS</span>
      </div>
      <div className={boxStyle}>
        <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
        <span className="text-xs text-gray-500">SECS</span>
      </div>
    </div>
  );
}



function DiscountBanner() {
  const [discountBanner, setdiscountBanner] = useState([])
  // Fetching Discount Banner 
  useEffect(() => {
          getdiscountBanner()
      }, [])
  
  
      const getdiscountBanner = () => {
          GlobalApi.getDiscountBanner().then((resp) => {
              setdiscountBanner(resp.data.data)
          })
      }




  return (
    <div className="bg-[#f5f6f8] py-12 md:px-20 flex flex-col md:flex-row items-center justify-between">
      <div className='px-4 container mx-auto flex justify-between items-center'>
      {/* Left Text Content */}
      {discountBanner.map((banner) => (
        <div className="max-w-xl text-center md:text-left w-[340px] " key={banner.id}>
        <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded mb-4">
          {banner.subtitle}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {banner.title}
        </h2>
        <CountdownTimer />
        <Link href="#" className="inline-block mt-6 text-sm font-medium text-black underline hover:text-red-500">
          <Button>Shop Now</Button>
        </Link>
      </div>
   ))}
   {discountBanner.map((banner) => (
      <div className="mt-10 md:mt-0 flex" key={banner.id}>
        <Image
          src={`http://localhost:1337${banner.image.formats.small.url}`} // 👈 Replace with actual image path or URL
          alt="Promo Phone"
          width={350}
          height={350}
          className="object-contain"
        />
        <Image
          src={`http://localhost:1337${banner.image.formats.small.url}`} // 👈 Replace with actual image path or URL
          alt="Promo Phone"
          width={350}
          height={350}
          className="object-contain"
        />
      </div>
    ))}
    </div>

    </div>
  );
}

export default DiscountBanner;
