import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

async function fetchCategorySlider() {
  const resp = await fetch("http://localhost:1337/api/categories?populate=*");
  const categoryList = await resp.json();
  return categoryList.data;
}

async function CategorySlider() {
  const getCategoryList = await fetchCategorySlider();

  return (
    <div className="mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6">
        Trending Categories
      </h2>

      <Carousel opts={{ loop: true }}>
        <CarouselContent className="flex items-center">
          {getCategoryList.map((category) => (
            <CarouselItem
              key={category.id}
              className="md:basis-1/2 lg:basis-1/5 flex justify-center"
            >
              <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 w-32 h-32">
                <Image
                  src={`http://localhost:1337${category.icon.formats.thumbnail.url || category.icon?.url}`}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="object-contain mb-2"
                />
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategorySlider;
