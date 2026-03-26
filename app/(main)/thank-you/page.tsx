/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  CheckCircle,
  Package,
  Truck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderData {
  orderId: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  date: string;
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center h-[60vh] flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          No order found
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          It looks like you haven&apos;t placed an order recently or your
          session has expired.
        </p>
        <Link
          href="/products"
          className="bg-[#0B1221] text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h1>
        <p className="text-gray-600 text-lg">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-500 mt-2 font-medium">
          Order ID: {order.orderId}
        </p>
      </div>

      {/* Delivery Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 flex items-start gap-4">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Truck size={24} />
        </div>
        <div>
          <h3 className="font-bold text-blue-900 mb-1">Estimated Delivery</h3>
          <p className="text-blue-800">2–5 business days</p>
          <p className="text-blue-700/70 text-sm mt-1">
            We&apos;ll send you a tracking link as soon as your order ships.
          </p>
        </div>
      </div>

      {/* Order Summary (Invoice Style) */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Package size={20} className="text-gray-400" />
            Order Summary
          </h2>
          <span className="text-sm text-gray-500">
            {new Date(order.date).toLocaleDateString()}
          </span>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right font-bold text-gray-900">
                  {item.price * item.quantity}৳
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{order.subtotal}৳</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>{order.shipping}৳</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100 border-dashed">
              <span>Total</span>
              <span className="text-blue-600">{order.total}৳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98]"
        >
          Continue Shopping
        </Link>
        <Link
          href="/profile/orders"
          className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          View My Orders
          <ArrowRight size={18} />
        </Link>
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        Need help with your order?{" "}
        <Link href="/about" className="text-blue-600 hover:underline">
          Contact Support
        </Link>
      </p>
    </div>
  );
}
