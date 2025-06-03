import React from 'react';
import Image from 'next/image';
import Link from 'next/link';



async function fetchBlogList() {
    const resp = await fetch("http://localhost:1337/api/blogs?populate=*");
    const blogList = await resp.json();
    return blogList.data;
}


async function BLogSection() {
    const blogs = await fetchBlogList();
    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {blogs.slice(0, 3).map((blog) => (
                    <div key={blog.id} className="bg-white shadow-md rounded-xl overflow-hidden">
                        <Image
                            src={`http://localhost:1337${blog.image.formats.small.url}`}
                            alt={blog.title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-gray-600 mb-4">{blog.date}</p>
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BLogSection;