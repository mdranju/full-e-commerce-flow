"use client";

import React from "react";
import clsx from "clsx";

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div 
      className={clsx(
        "rich-text-content prose prose-slate max-w-none",
        "prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tight prose-h1:text-[#0B1221] prose-h1:mb-8",
        "prose-h2:text-2xl prose-h2:font-black prose-h2:tracking-tight prose-h2:text-[#0B1221] prose-h2:mt-12 prose-h2:mb-6",
        "prose-p:text-base prose-p:leading-loose prose-p:text-[#0B1221]/70 prose-p:mb-6",
        "prose-strong:text-[#0B1221] prose-strong:font-bold",
        "prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6",
        "prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6",
        "prose-li:text-[#0B1221]/70 prose-li:mb-2",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#0B1221]/50 prose-blockquote:my-8",
        "prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-12",
        "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
