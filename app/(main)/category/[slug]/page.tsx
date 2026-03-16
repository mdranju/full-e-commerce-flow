import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const categoryProducts = products.filter(
    (p) =>
      p.category === resolvedParams.slug ||
      resolvedParams.slug === "luxury-panjabi",
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <Link href="/category" className="hover:text-black">
          Category
        </Link>
        <span>&gt;</span>
        <span className="text-black capitalize font-semibold">
          {resolvedParams.slug.replace("-", " ")}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0 lg:block hidden">
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/category/panjabi" className="hover:text-blue-600">
                  Panjabi
                </Link>
              </li>
              <li>
                <Link
                  href="/category/luxury-panjabi"
                  className="text-blue-600 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  Luxury Panjabi
                </Link>
              </li>
              <li>
                <Link href="/category/thobe" className="hover:text-blue-600">
                  Thobe
                </Link>
              </li>
              <li>
                <Link href="/category/shirt" className="hover:text-blue-600">
                  Shirt
                </Link>
              </li>
              <li>
                <Link href="/category/t-shirt" className="hover:text-blue-600">
                  T-shirt
                </Link>
              </li>
              <li>
                <Link
                  href="/category/polo-shirt"
                  className="hover:text-blue-600"
                >
                  Polo Shirt
                </Link>
              </li>
              <li>
                <Link
                  href="/category/pant-trouser"
                  className="hover:text-blue-600"
                >
                  Pant & Trouser
                </Link>
              </li>
              <li>
                <Link href="/category/backpack" className="hover:text-blue-600">
                  Backpack
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 border-b pb-2">
              New Products
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="w-16 h-16 relative bg-gray-100 rounded shrink-0">
                    <Image
                      src={`https://picsum.photos/seed/new${item}/100/100`}
                      alt="New Product"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link
                      href="#"
                      className="text-xs font-medium hover:text-blue-600 line-clamp-2"
                    >
                      Premium China Sneakers-Y26-1068
                    </Link>
                    <span className="text-xs text-gray-500 mt-1">2700৳</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm  group flex flex-col h-full"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-[4/4.5] block overflow-hidden bg-white  rounded-b-lg "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-300 rounded-b-lg ${product.inStock ? "group-hover:scale-105" : "opacity-70"}`}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded">
                        Out Of Stock
                      </span>
                    </div>
                  )}
                </Link>
                <div className="p-3 flex flex-col flex-grow text-center">
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-sm font-medium text-gray-800 hover:text-black line-clamp-1 mb-1"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-auto mb-3 flex items-center gap-2 justify-center">
                    <span className="text-xs font-bold line-through text-gray-400">
                      {product.originalPrice}৳
                    </span>
                    <span className="text-sm font-bold">{product.price}৳</span>
                  </div>
                  <button
                    className={`w-full text-sm font-medium py-2 rounded transition-colors cursor-pointer ${
                      product.inStock
                        ? "bg-[#1A1A1A] text-white hover:bg-black"
                        : "bg-gray-200 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Buy Now" : "Product Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
