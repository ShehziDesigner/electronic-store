'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Image from 'next/image';
import GlobalApi from '@/app/utils/GlobalApi';


export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    console.log('Slug:', slug);
    if (slug) {
      GlobalApi.getBlogBySlug(slug).then((res) => {
        const data = res.data?.data?.[0];
        setBlog(data);
      });
    }
  }, [slug]);

  if (!blog) {
    return <div className="p-4">Loading...</div>;
  }

  const { title, description, image, date } = blog;

  const imageUrl = image.formats.small.url || image?.url;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-6">{new Date(date).toLocaleDateString()}</p>

      {imageUrl && (
        <Image
          src={`http://localhost:1337${image.formats.small.url}`}
          alt={title}
          width={750}
          height={400}
          className="rounded-lg mb-8 w-full object-cover"
        />
      )}

      <div className="space-y-5 text-lg leading-8 text-gray-800">
        {description?.map((block, idx) => {
          if (block.type === 'paragraph') {
            const text = block.children?.map(child => child.text).join('');
            return <p key={idx}>{text}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
