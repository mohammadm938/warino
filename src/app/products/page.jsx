import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductBrowser from "./components/ProductBrowser";

async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  const data = await response.json();

  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900">محصولات</h1>

            <p className="mt-2 text-sm text-gray-500">
              محصولات فروشگاه‌های وارینو را پیدا کن
            </p>
          </div>

          <ProductBrowser initialProducts={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
