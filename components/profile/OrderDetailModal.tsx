"use client";

import { X, Package, Truck, CheckCircle2, Circle, MapPin, CreditCard, Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export function OrderDetailModal({ isOpen, onClose, order }: OrderDetailModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStep = statuses.indexOf(order.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transform transition-all animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{order.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {/* Status Tracker */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Truck size={18} className="text-blue-600" />
              Order Tracking
            </h3>
            
            <div className="relative flex justify-between">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10" />
              <div 
                className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-1000 -z-10" 
                style={{ width: `${(currentStep / (statuses.length - 1)) * 100}%` }}
              />

              {statuses.map((status, index) => {
                const isActive = index <= currentStep;
                const isPast = index < currentStep;
                
                return (
                  <div key={status} className="flex flex-col items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-colors duration-500 ${
                      isActive ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-300"
                    }`}>
                      {isPast ? <CheckCircle2 size={16} fill="white" className="text-blue-600" /> : <Circle size={12} fill={isActive ? "currentColor" : "none"} />}
                    </div>
                    <span className={`text-[10px] font-bold text-center ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product List */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={18} className="text-gray-400" />
              Ordered Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-600 mt-1">{item.price}৳</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grids */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping Address</h4>
                  <p className="text-sm text-gray-700 font-medium mt-1 leading-relaxed">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</h4>
                  <p className="text-sm text-gray-700 font-medium mt-1">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Date</h4>
                  <p className="text-sm text-gray-700 font-medium mt-1">{new Date(order.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 sm:p-6 space-y-4">
          <div className="flex justify-between items-center text-gray-900">
            <span className="font-bold">Total Amount paid</span>
            <span className="text-2xl font-black text-blue-600">{order.total}৳</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
