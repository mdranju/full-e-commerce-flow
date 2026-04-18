"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, GripVertical } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";

interface MediaItem {
  id: string;
  url: string; // The resolved URL for display
  original: any; // The original data (string or object) to send back to backend
  file?: File;
  type: "existing" | "new";
}

interface ImageUploadProps {
  existingImages?: any[]; // Allow strings or objects
  newImages: File[];
  onRemoveExisting?: (url: string) => void;
  onAddNewImages: (files: File[]) => void;
  onRemoveNew: (index: number) => void;
  onReorder: (items: MediaItem[]) => void;
}

export function ImageUpload({
  existingImages = [],
  newImages = [],
  onRemoveExisting,
  onAddNewImages,
  onRemoveNew,
  onReorder,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const { resolveImageUrl } = require("@/src/utils/image");

  // Construct items list from existing and new images
  useEffect(() => {
    const existingItems: MediaItem[] = existingImages.map((img, idx) => {
      const url = resolveImageUrl(img);
      return {
        id: `existing-${url}-${idx}`,
        url,
        original: img,
        type: "existing",
      };
    });

    const newItems: MediaItem[] = newImages.map((file, idx) => ({
      id: `new-${file.name}-${idx}-${file.size}`,
      file,
      url: "", 
      original: file,
      type: "new",
    }));

    // Detect if the incoming props are different from current items to avoid unnecessary resets
    // But since order matters, we mostly rely on onReorder to push changes up.
    // To allow reordering across both types, we should initialize this once or carefully sync.
    
    // For now, let's just initialize if items are empty or if counts changed
    if (items.length === 0 || (items.length !== existingImages.length + newImages.length)) {
       setItems([...existingItems, ...newItems]);
    }
  }, [existingImages.length, newImages.length]);

  const handleReorder = (newItems: MediaItem[]) => {
    setItems(newItems);
    onReorder(newItems);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    onAddNewImages(files);
  };

  return (
    <div className="space-y-6">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-3"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="relative flex items-center gap-4 p-3 bg-gray-50 border border-black/5 rounded-2xl group active:shadow-lg transition-shadow"
          >
            <div className="shrink-0 cursor-grab active:cursor-grabbing p-2 text-black/20 hover:text-blue-600 transition-colors">
              <GripVertical size={20} />
            </div>

            <div className="w-16 h-16 rounded-xl overflow-hidden border border-black/5 bg-white shrink-0">
              {item.type === "existing" ? (
                <img
                  src={item.url}
                  alt="Existing"
                  className="w-full h-full object-cover"
                />
              ) : (
                <NewImagePreview file={item.file!} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1221]">
                  Image {index + 1}
                </span>
                {index === 0 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase rounded-md shadow-sm shadow-amber-500/20">
                    Primary
                  </span>
                )}
                {item.type === "new" && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase rounded-md shadow-sm shadow-blue-500/20">
                    New
                  </span>
                )}
              </div>
              <p className="text-[10px] text-black/30 font-bold truncate mt-1">
                {item.type === "existing" ? item.url?.split('/').pop() : item.file?.name}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (item.type === "existing") {
                  onRemoveExisting?.(item.url!);
                } else {
                  // Find index in newImages
                  const idx = newImages.indexOf(item.file!);
                  if (idx !== -1) onRemoveNew(idx);
                }
                setItems(prev => prev.filter(i => i.id !== item.id));
              }}
              className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <X size={18} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-6 rounded-[2rem] border-2 border-dashed border-black/5 flex flex-col items-center justify-center gap-2 text-black/20 hover:text-blue-600 hover:border-blue-600/30 hover:bg-blue-50 transition-all group"
      >
        <Upload size={24} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Add More Masterpieces
        </span>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />

      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
          <p className="text-[9px] text-blue-600 font-black uppercase tracking-[0.15em] text-center leading-relaxed">
            Drag to reorder. The first image will be used as the primary display.
          </p>
      </div>
    </div>
  );
}

function NewImagePreview({ file }: { file: File }) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <img src={preview} alt="New" className="w-full h-full object-cover" />
  );
}
