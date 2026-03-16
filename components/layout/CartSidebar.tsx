"use client";

import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/src/store/slices/cartSlice";
import { toast } from "sonner";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: any[]; // We can use a proper type later, for now just any[]
}

export function CartSidebar({
  isOpen,
  onClose,
  cartItems = [],
}: CartSidebarProps) {
  const dispatch = useDispatch();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] max-w-[100vw] bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="relative w-48 h-48">
                {/* We'll use a placeholder image for the empty cart illustration */}
                <Image
                  src="https://picsum.photos/seed/emptycart/200/200"
                  alt="Empty Cart"
                  fill
                  className="object-contain opacity-50"
                />
              </div>
              <p className="text-lg font-medium text-gray-800">
                Your Cart is empty
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Go To Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-gray-100 pb-4"
                >
                  <div className="relative w-20 h-20 bg-gray-100 rounded shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium pr-4">{item.name}</h3>
                      <button
                        onClick={() => {
                          dispatch(
                            removeFromCart({ id: item.id, size: item.size }),
                          );
                          toast.info("Item Removed", {
                            description: "The item has been removed from your cart."
                          });
                        }}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                    {item.originalPrice && (
                      <p className="text-xs text-gray-400 line-through mt-1">
                        original price: ৳{item.originalPrice}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-blue-600">
                        ৳{item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-md border border-gray-200 px-2 py-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                quantity: Math.max(1, item.quantity - 1),
                              }),
                            )
                          }
                          className="text-gray-500 hover:text-black"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="text-gray-500 hover:text-black"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Subtotal:</span>
              <span className="font-bold">
                ৳
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                )}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-[#0B1221] text-white text-center py-3 rounded hover:bg-gray-800 transition-colors font-medium"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
