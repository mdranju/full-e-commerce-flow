"use client";

import dynamic from "next/dynamic";
import { BackButton } from "@/components/common/BackButton";
import DescriptionTabs from "@/components/product/DescriptionTabs";
import { ProductCard } from "@/components/product/ProductCard";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { addToCart } from "@/src/store/slices/cartSlice";
import { ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { WhatsAppOrderButton } from "@/components/product/WhatsAppOrderButton";

const ImageLightbox = dynamic(
  () =>
    import("@/components/product/ImageLightbox").then(
      (mod) => mod.ImageLightbox,
    ),
  { ssr: false },
);

interface ProductDetailClientProps {
  product: any;
  products: any[];
}

const currentPageUrl = window.location.href;

export default function ProductDetailClient({
  product,
  products,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Original",
  );
  const [activeTab, setActiveTab] = useState("description");
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const currentSizeData = product.sizes?.find(
    (s: any) => s.name === selectedSize,
  );

  const displaySizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : [
          { name: "S", stock: 10, inStock: true },
          { name: "M", stock: 10, inStock: true },
          { name: "L", stock: 10, inStock: true },
          { name: "XL", stock: 10, inStock: true },
          { name: "XXL", stock: 10, inStock: true },
        ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please Select a Size", {
        description: "You must select a size before adding this item to cart.",
      });
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
        quantity,
      }),
    );

    toast.success("Added to Cart! 🛒", {
      description: `${product.name} (${selectedSize}) is now in your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please Select a Size", {
        description: "Select a size to proceed with Buy Now.",
      });
      return;
    }
    handleAddToCart();
    router.push("/checkout");
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.image, ...images],
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Avlora Wear",
    },
    offers: {
      "@type": "Offer",
      url: `https://avlorawear.com/product/${product.slug}`,
      priceCurrency: "BDT",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12 lg:py-0 bg-white/50 backdrop-blur-3xl min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mb-8">
        <BackButton className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.4em]" />
      </div>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mb-24">
        {/* Product Images */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6 lg:sticky lg:top-32">
          <div
            className="relative w-full aspect-square bg-[#F8FAFC] rounded-[2rem] lg:rounded-[3rem] overflow-hidden cursor-zoom-in border border-black/5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] group"
            onMouseEnter={() => isDesktop && setIsZooming(true)}
            onMouseLeave={() => isDesktop && setIsZooming(false)}
            onMouseMove={handleMouseMove}
            onClick={() => {
              const idx = images.indexOf(selectedImage);
              setLightboxIndex(idx >= 0 ? idx : 0);
              setIsLightboxOpen(true);
            }}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain lg:object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

            {/* Desktop Zoom Popup Overlay */}
            {isZooming && isDesktop && (
              <div
                className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#F8FAFC]"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: "250%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>

          <div className="flex flex-row gap-4 w-full overflow-x-auto hide-scrollbar px-2 py-4">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                aria-label={`View product image ${idx + 1}`}
                className={`relative w-24 aspect-square shrink-0 rounded-2xl lg:rounded-3xl overflow-hidden border-2 transition-all duration-500 ${selectedImage === img ? "border-blue-600 scale-105 shadow-xl shadow-blue-500/10" : "border-black/5 opacity-50 hover:opacity-100 hover:border-black/10"}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[45%] flex flex-col">
          {/* ── Header Metadata ── */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
              {product.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[10px] font-black text-white px-2 py-1 bg-[#0B1221] rounded-md uppercase tracking-widest">
              SKU: {product.id}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            {currentSizeData?.stock ? (
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                {currentSizeData.stock} in stock
              </span>
            ) : (
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest px-2 py-0.5 bg-orange-50 rounded-md border border-orange-100">
                {selectedSize
                  ? "Out of Stock"
                  : product.inStock
                    ? "In Stock"
                    : "Out of Stock"}
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-5xl font-black text-[#0B1221] leading-[1.1] mb-8 tracking-tighter">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-4xl font-black text-[#0B1221] tracking-wide">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-2xl text-[#0B1221]/20 line-through font-bold tracking-tighter">
                ৳{product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <span className="ml-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
                Save ৳{product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* ── Color Selection ── */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Color: <span className="text-[#0B1221]">{selectedColor}</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color: any) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative w-10 h-10 rounded-full border-2 transition-all p-1 ${
                      selectedColor === color.name
                        ? "border-[#0B1221] scale-110 shadow-lg shadow-black/10"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-full border border-black/5"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black uppercase text-[#0B1221] opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-xl px-2 py-1 rounded-md border border-gray-100 z-10 pointer-events-none">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Size Selection ── */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Size Selection
              </label>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                View Size Chart
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {displaySizes.map((size: any) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  disabled={size.stock === 0}
                  className={`min-w-[4rem] h-14 flex flex-col items-center justify-center transition-all duration-300 rounded-2xl border-2 ${
                    size.stock === 0
                      ? "opacity-40 grayscale cursor-not-allowed border-dashed border-gray-200 bg-gray-50"
                      : selectedSize === size.name
                        ? "border-[#0B1221] bg-[#0B1221] text-white shadow-xl shadow-black/20 translate-y-[-2px]"
                        : "border-black/5 bg-gray-50/50 text-[#0B1221]/60 hover:border-black/20 hover:bg-white"
                  }`}
                >
                  <span className="text-sm font-black">{size.name}</span>
                  {size.stock > 0 && size.stock < 10 && (
                    <span
                      className={`text-[8px] font-black uppercase mt-1 ${selectedSize === size.name ? "text-white/70" : "text-orange-500"}`}
                    >
                      {size.stock} Left
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Quantity & Actions ── */}
          <div className="flex flex-col gap-5 mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-black/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-lg font-black bg-white rounded-xl hover:bg-gray-200 text-[#0B1221] shadow-sm transition-all active:scale-95 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-transparent focus:outline-none font-black text-[#0B1221]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-lg font-black bg-white rounded-xl hover:bg-gray-200 text-[#0B1221] shadow-sm transition-all active:scale-95"
                >
                  +
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Quantity
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full md:flex-1 bg-white text-[#0B1221] border-2 border-[#0B1221] h-14 md:h-16 lg:h-20 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl lg:rounded-3xl hover:bg-[#0B1221] hover:text-white transition-all shadow-xl shadow-black/5 active:scale-[0.98] flex items-center justify-center shrink-0"
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full md:flex-[1.5] bg-[#0B1221] text-white h-14 md:h-16 lg:h-20 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl lg:rounded-3xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center shrink-0"
                >
                  Buy Now
                </button>
              </div>
              <WhatsAppOrderButton
                product={product}
                size={selectedSize}
                color={selectedColor}
                quantity={quantity}
                url={currentPageUrl}
                // url={`https://avlorawear.com/product/${product.slug}`}
              />
            </div>
          </div>

          {/* ── Attributes Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-8 rounded-3xl border border-gray-100 bg-gray-50/30">
            {product.details?.slice(0, 6).map((detail: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  {detail.name}
                </span>
                <span className="text-[11px] font-bold text-[#0B1221] uppercase">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Highlights ── */}
          <div className="flex items-center gap-8 mt-10 px-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                Authentic Product
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                <Truck size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <DescriptionTabs
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Image Lightbox — swipe, pinch-to-zoom, pan */}
      <ImageLightbox
        key={lightboxIndex}
        images={images}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* ── Desktop-only Related Products ── */}
      <div className="hidden lg:block border-t border-gray-100 py-24 section-reveal">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-blue-600 text-xs font-black tracking-[0.4em] uppercase mb-4">
              Similar Style
            </p>
            <h2 className="premium-section-title">You May Also Like</h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 product-grid-desktop">
          {products
            .filter(
              (p: any) =>
                p.category === product.category && p.id !== product.id,
            )
            .slice(0, 4)
            .map((p: any) => (
              <div key={p.id} className="product-card-desktop">
                <ProductCard product={p} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
