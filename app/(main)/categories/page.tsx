import { categories } from "@/lib/data";
import { BackButton } from "@/components/common/BackButton";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "All Categories | Believers",
  description: "Browse all product categories at Believers.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <BackButton className="mb-6" />

      <div className="flex flex-col gap-2 mb-8 section-reveal">
        <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-gray-900 hero-display">
          All Categories
        </h1>
        <p className="text-gray-500 font-medium">
          Browse through our extensive collection
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 category-grid-desktop">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="category-item-desktop group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm lg:transition-shadow lg:duration-300 lg:hover:shadow-[0_4px_24px_rgba(59,130,246,0.12)] lg:hover:border-blue-100 transition-all duration-200"
          >
            <span className="font-bold text-gray-800 group-hover:text-blue-600">
              {category.name}
            </span>
            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-blue-600 transition-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
