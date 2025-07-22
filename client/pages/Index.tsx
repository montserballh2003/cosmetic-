import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import ProductCategories from "../components/ProductCategories";
import SpecialOffers from "../components/SpecialOffers";
import PromoBanners from "../components/PromoBanners";
import NewProducts from "../components/NewProducts";
import BrandsShowcase from "../components/BrandsShowcase";
import Articles from "../components/Articles";
import Videos from "../components/Videos";
import ContactFooter from "../components/ContactFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-anoohe-bg">
      <Header />
      <main>
        <HeroBanner />
        <WhyChooseUs />
        <ProductCategories />
        <SpecialOffers />
        <PromoBanners />
        <NewProducts />
        <BrandsShowcase />
        <Articles />
        <Videos />
      </main>
      <ContactFooter />
    </div>
  );
}
