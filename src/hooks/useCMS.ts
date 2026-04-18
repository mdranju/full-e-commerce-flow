"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCMS() {
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await axios.get(`${BASE_URL}/metadata`);
        setMetadata(response.data.data);
      } catch (error) {
        console.error("Failed to fetch CMS metadata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMetadata();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("data:")) return path;

    const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(
      /=+$/,
      "",
    );

    return `${IMAGE_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  return { metadata, loading, getImageUrl };
}
