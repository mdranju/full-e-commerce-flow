import { Metadata } from "next";
import { products } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product =
    products.find((p) => p.slug === resolvedParams.id) || products[0];
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://avlorawear.com";
  const productUrl = `${siteUrl}/product/${product.slug}`;
  
  // Ensure we have a high-quality absolute image URL
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${siteUrl}${product.image}`;

  return {
    title: `${product.name} | Avlora Wear`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: productUrl,
      siteName: "Avlora Wear",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product =
    products.find((p) => p.slug === resolvedParams.id) || products[0];

  return <ProductDetailClient product={product} products={products} />;
}
