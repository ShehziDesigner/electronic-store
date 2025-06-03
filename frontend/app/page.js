import Image from "next/image";
import Slider from "./Components/Slider";
import CategorySlider from "./Components/CategorySlider";
import LatestProducts from "./Components/LatestProducts";
import DiscountBanner from "./Components/DiscountBanner";
import PopularProducts from "./Components/PopularProducts";
import BLogSection from "./blog/page";


export default function Home() {
  return (
    <main>
      <div className="container px-4 mx-auto">
        <Slider />
        <CategorySlider />
        <LatestProducts />

      </div>
      <div>
        <DiscountBanner />
      </div>
      <div className="container px-4 mx-auto" >
        <PopularProducts />
        <BLogSection />
      </div>
    </main>
  );
}
