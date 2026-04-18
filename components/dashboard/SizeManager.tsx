"use client";

import { X, Plus, Edit2, Check } from "lucide-react";
import { useState, useMemo } from "react";
import { sortSizes, normalizeSize } from "@/src/utils/size";

interface Size {
  name: string;
  stock: number;
}

interface SizeManagerProps {
  sizes: Size[];
  onSizesChange: (sizes: Size[]) => void;
}

export function SizeManager({ sizes, onSizesChange }: SizeManagerProps) {
  const [newSize, setNewSize] = useState({ name: "", stock: 0 });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState({ name: "", stock: 0 });

  const sortedSizes = useMemo(() => sortSizes(sizes), [sizes]);

  const handleAdd = () => {
    if (!newSize.name) return;
    
    const normalizedName = normalizeSize(newSize.name);
    const existingIndex = sizes.findIndex(s => normalizeSize(s.name) === normalizedName);

    if (existingIndex > -1) {
      // If exists, just update stock (additive or override? Let's override as common in CMS)
      const updated = [...sizes];
      updated[existingIndex] = { ...updated[existingIndex], stock: newSize.stock };
      onSizesChange(updated);
    } else {
      onSizesChange([...sizes, { ...newSize, name: normalizedName }]);
    }
    setNewSize({ name: "", stock: 0 });
  };

  const handleRemove = (name: string) => {
    onSizesChange(sizes.filter((s) => s.name !== name));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditValue({ ...sortedSizes[index] });
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    
    const originalName = sortedSizes[editingIndex].name;
    const normalizedNewName = normalizeSize(editValue.name);
    
    const updated = sizes.map(s => {
      if (s.name === originalName) {
        return { name: normalizedNewName, stock: editValue.stock };
      }
      return s;
    });

    onSizesChange(updated);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-[#0B1221]/40 ml-4">
          Manage Sizes
        </label>
        
        {/* Add New Size Input */}
        <div className="flex gap-2 p-2 bg-gray-50 border border-black/5 rounded-2xl">
          <input
            type="text"
            value={newSize.name}
            onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Size (e.g. M, 42)"
            className="flex-1 px-4 py-2 bg-white border border-black/5 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-sm"
          />
          <input
            type="number"
            value={newSize.stock || ""}
            onChange={(e) => setNewSize(prev => ({ ...prev, stock: Number(e.target.value) }))}
            placeholder="Stock"
            className="w-24 px-4 py-2 bg-white border border-black/5 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-sm"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-[#0B1221] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Sizes List */}
      <div className="grid grid-cols-1 gap-2">
        {sortedSizes.map((size, idx) => (
          <div
            key={size.name}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
              editingIndex === idx 
                ? "bg-blue-50 border-blue-200" 
                : "bg-white border-black/5 hover:border-blue-100"
            }`}
          >
            {editingIndex === idx ? (
              <div className="flex-1 flex gap-2 items-center">
                <input
                  type="text"
                  value={editValue.name}
                  onChange={(e) => setEditValue(prev => ({ ...prev, name: e.target.value }))}
                  className="w-20 px-3 py-1 bg-white border border-blue-200 rounded-lg outline-none text-xs font-bold uppercase"
                />
                <input
                  type="number"
                  value={editValue.stock}
                  onChange={(e) => setEditValue(prev => ({ ...prev, stock: Number(e.target.value) }))}
                  className="w-20 px-3 py-1 bg-white border border-blue-200 rounded-lg outline-none text-xs font-bold"
                />
                <button
                  type="button"
                  onClick={saveEdit}
                  className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  className="p-1.5 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-black/5">
                    <span className="text-xs font-black text-[#0B1221] uppercase">
                      {size.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-blue-600 shadow-sm uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full block w-fit mb-0.5">
                      Available Stock
                    </span>
                    <span className="text-sm font-black text-[#0B1221]">
                      {size.stock} Units
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => startEditing(idx)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(size.name)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {sizes.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-black/5 rounded-[2rem]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1221]/20">
              No sizes added yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
