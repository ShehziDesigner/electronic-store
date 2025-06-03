import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import GlobalApi from '../utils/GlobalApi'
import Link from 'next/link'

async function fetchSliderList() {
    const resp = await fetch("http://localhost:1337/api/sliders?populate=*");
    const sliderList = await resp.json();
    return sliderList.data;
}

async function Slider() {
    const getSliders = await fetchSliderList();

    return (
        <div>
            <Carousel opts={{
                loop: true,
                autoPlay: true,
            }}>
                <CarouselContent>

                    {getSliders.map((slider) => (
                        <CarouselItem
                            key={slider.id}

                        >
                            <Image
                                src={`http://localhost:1337${slider.image.formats.small.url}`}
                                height={300}
                                width={1600}
                                alt={slider.name}
                                className='object-fill'
                            />
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default Slider