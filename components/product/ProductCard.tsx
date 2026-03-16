import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm  group flex flex-col h-full">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/4.5] block overflow-hidden  rounded-b-lg"
      >
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded  rounded-b-lg">
            {product.badge}
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-3 flex flex-col flex-grow">
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium text-gray-800 hover:text-black line-clamp-2 mb-2"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-center gap-2 justify-center mb-3">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ৳{product.originalPrice}
            </span>
          )}
          <span className="text-sm font-bold">৳{product.price}</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <button className="w-full bg-[#1A1A1A] text-white text-sm font-medium py-2 rounded hover:bg-black transition-colors cursor-pointer">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}
