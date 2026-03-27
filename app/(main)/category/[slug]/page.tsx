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
    <div className="min-h-screen bg-[#f8fafc]/50">
      {/* 1. Cinematic Category Hero */}
      <div className="relative h-[40vh] lg:h-[60vh] flex items-center justify-center overflow-hidden bg-[#0B1221]">
        {/* Ambient Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 text-center px-6">
          <p className="text-blue-400 text-[10px] font-black tracking-[0.5em] uppercase mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            Signature Collection
          </p>
          <h1 className="hero-display text-5xl lg:text-8xl tracking-tighter text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {resolvedParams.slug.replace("-", " ")}.
          </h1>
          
          {/* Minimal Breadcrumb Pill */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/category" className="hover:text-white transition-colors">Category</Link>
            <span className="opacity-30">/</span>
            <span className="text-blue-400">{resolvedParams.slug}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 2. Side-Navigator: Category Filters */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-32 h-fit space-y-16">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-blue-600" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B1221]">
                  Filter Category
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "Panjabi", slug: "panjabi" },
                  { name: "Luxury Panjabi", slug: "luxury-panjabi" },
                  { name: "Thobe", slug: "thobe" },
                  { name: "Shirt", slug: "shirt" },
                  { name: "T-shirt", slug: "t-shirt" },
                  { name: "Polo Shirt", slug: "polo-shirt" },
                  { name: "Pant & Trouser", slug: "pant-trouser" },
                  { name: "Backpack", slug: "backpack" }
                ].map((cat) => {
                  const isActive = resolvedParams.slug === cat.slug;
                  return (
                    <li key={cat.slug} className="group">
                      <Link
                        href={`/category/${cat.slug}`}
                        className={`flex items-center justify-between text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${isActive ? 'text-blue-600' : 'text-[#0B1221]/40 hover:text-[#0B1221] hover:pl-2'}`}
                      >
                        {cat.name}
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recommended Products Widget */}
            <div className="pt-12 border-t border-black/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B1221]/20 mb-8">
                Recommended For You
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <Link key={item} href="#" className="flex gap-4 group">
                    <div className="w-16 h-16 relative bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-black/5">
                      <Image
                        src={`https://picsum.photos/seed/sig${item}/200/200`}
                        alt="Product"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-[#0B1221] tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        Signature Platinum Series Case-10{item}
                      </span>
                      <span className="text-[10px] font-black text-blue-600/40 mt-1">
                        New Arrival
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* 3. Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 lg:mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1221]/30">
                Displaying {categoryProducts.length} Products
              </p>
              <div className="h-px flex-1 mx-8 bg-black/5" />
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1221] hover:text-blue-600 transition-colors">
                Sort By
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {categoryProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group animate-in fade-in slide-in-from-bottom-8 duration-700 h-full"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative aspect-[3/4] block overflow-hidden bg-gray-50 rounded-[2.5rem] border border-black/5"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-105 ${product.inStock ? "opacity-100" : "opacity-40 grayscale"}`}
                    />
                    
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#0B1221]/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-700 flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white py-3 px-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-xl">
                            View Details
                        </span>
                    </div>

                    {!product.inStock && (
                      <div className="absolute top-8 left-8">
                        <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </Link>
                  
                  <div className="mt-8 px-4 space-y-3">
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-lg font-black tracking-tighter text-[#0B1221] hover:text-blue-600 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {product.originalPrice && (
                          <span className="text-xs font-bold line-through text-[#0B1221]/20">
                            ৳{product.originalPrice}
                          </span>
                        )}
                        <span className="text-base font-black text-blue-600">৳{product.price}</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0B1221]/5" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#0B1221]/20 whitespace-nowrap">
                        Latest Release
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Products */}
            <div className="mt-32 text-center">
                <button className="inline-flex flex-col items-center gap-6 group">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B1221]/30 group-hover:text-blue-600 transition-colors">
                        Load More Products
                    </span>
                    <div className="w-px h-16 bg-gradient-to-b from-blue-600 to-transparent opacity-30 group-hover:h-24 transition-all duration-700" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
