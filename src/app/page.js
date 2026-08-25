import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import FeaturedShops from "./components/home/FeaturedShops";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <FeaturedShops />
      </main>

      <Footer />
    </>
  );
}
