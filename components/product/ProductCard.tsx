import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm group flex flex-col h-full lg:transition-shadow lg:duration-300 lg:hover:shadow-[0_4px_24px_rgba(59,130,246,0.12)] lg:hover:border-blue-100 border border-transparent">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[1/1] block overflow-hidden  rounded-b-lg"
      >
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded  rounded-b-lg">
            {product.badge}
          </div>
        )}

        {/* Primary image — fades out on hover */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-400 ease-in-out opacity-100 group-hover:opacity-0"
        />
        {/* Secondary (hover) image — fades in on hover */}
        {product.images?.[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} — alternate view`}
            fill
            className="object-cover transition-opacity duration-400 ease-in-out opacity-0 group-hover:opacity-100"
          />
        )}
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
          <button className="w-full bg-neutral-900 text-white text-sm font-medium py-2 rounded hover:bg-black transition-colors cursor-pointer">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}
