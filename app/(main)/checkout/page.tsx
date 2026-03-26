"use client";

import { clearCart } from "@/src/store/slices/cartSlice";
import { RootState } from "@/src/store/store";
import { useAddresses, Address } from "@/hooks/useAddresses";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CheckoutPage() {
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  const [shippingCost, setShippingCost] = useState(60);
  const dispatch = useDispatch();
  const router = useRouter();

  const { addresses, defaultAddress } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showSavedAddresses, setShowSavedAddresses] = useState(true);
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Controlled form state
  const selectedAddress = selectedAddressId
    ? addresses.find((a) => a.id === selectedAddressId) ?? defaultAddress
    : defaultAddress;

  const [form, setForm] = useState({
    firstName: selectedAddress?.firstName ?? "",
    lastName: selectedAddress?.lastName ?? "",
    street: selectedAddress?.street ?? "",
    apartment: selectedAddress?.apartment ?? "",
    city: selectedAddress?.city ?? "",
    district: selectedAddress?.district ?? "Dhaka",
    postalCode: selectedAddress?.postalCode ?? "",
    phone: selectedAddress?.phone ?? "",
    email: "",
    notes: "",
  });

  const applyAddress = (address: Address) => {
    setSelectedAddressId(address.id);
    setUseNewAddress(false);
    setForm((f) => ({
      ...f,
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.street,
      apartment: address.apartment ?? "",
      city: address.city,
      district: address.district,
      postalCode: address.postalCode ?? "",
      phone: address.phone,
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Cart is Empty", {
        description: "Please add items to your cart before proceeding to checkout.",
      });
      return;
    }

    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderData = {
      orderId,
      items: cartItems,
      subtotal: totalPrice,
      shipping: shippingCost,
      total: totalPrice + shippingCost,
      paymentMethod: "Cash on delivery",
      shippingAddress: `${form.street}, ${form.city}, ${form.district}`,
      date: new Date().toISOString(),
    };

    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
    dispatch(clearCart());
    toast.success("Order Confirmed! 🎉", {
      description: "Your order has been placed successfully. We'll notify you soon.",
    });
    router.push("/thank-you");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your checkout is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          It looks like you haven&apos;t added any items to your cart yet.
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        {/* Billing Details */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold mb-6">Billing details</h2>

          {/* ── Saved Address Selector ── */}
          {addresses.length > 0 && (
            <div className="mb-8 bg-blue-50/60 border border-blue-100 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSavedAddresses((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-blue-700"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  Use a Saved Address
                </span>
                {showSavedAddresses ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showSavedAddresses && (
                <div className="px-4 pb-4 space-y-3">
                  {addresses.map((address) => {
                    const isSelected =
                      !useNewAddress &&
                      (selectedAddressId === address.id ||
                        (!selectedAddressId && address.isDefault));
                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => applyAddress(address)}
                        className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-blue-500 bg-white shadow-sm"
                            : "border-transparent bg-white hover:border-blue-200"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                        >
                          {address.label === "Home" ? (
                            <Home size={14} />
                          ) : address.label === "Office" ? (
                            <Briefcase size={14} />
                          ) : (
                            <MapPin size={14} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-black text-gray-900">
                              {address.label}
                            </span>
                            {address.isDefault && (
                              <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {address.firstName} {address.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {address.street}, {address.city}, {address.district}
                          </p>
                          <p className="text-xs text-gray-400">{address.phone}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setUseNewAddress(true);
                      setSelectedAddressId(null);
                      setForm((f) => ({
                        ...f,
                        firstName: "",
                        lastName: "",
                        street: "",
                        apartment: "",
                        city: "",
                        district: "Dhaka",
                        postalCode: "",
                        phone: "",
                      }));
                    }}
                    className={`w-full flex items-center gap-2 p-4 rounded-xl border-2 text-sm font-bold transition-all ${
                      useNewAddress
                        ? "border-blue-500 bg-white text-blue-700 shadow-sm"
                        : "border-dashed border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    <Plus size={15} />
                    Enter a new address
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Billing Form ── */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                <input required value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  placeholder="First name" type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                <input required value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  placeholder="Last name" type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country / Region *</label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black bg-white">
                <option>Bangladesh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street address *</label>
              <input required value={form.street} onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                type="text" placeholder="House number and street name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black mb-3"
              />
              <input value={form.apartment} onChange={(e) => setForm((f) => ({ ...f, apartment: e.target.value }))}
                type="text" placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Town / City *</label>
              <input required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="Town / City" type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
              <select required value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black bg-white"
              >
                <option value="">Select an option...</option>
                {["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Barishal","Mymensingh","Rangpur","Comilla","Gazipur","Narayanganj"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode / ZIP (optional)</label>
              <input value={form.postalCode} onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                placeholder="Postcode / ZIP" type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Phone" type="tel"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email address" type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-bold mb-4">Additional information</h3>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order notes (optional)</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Your order</h2>

            <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
              <span className="font-bold">Product</span>
              <span className="font-bold">Subtotal</span>
            </div>

            {cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${idx}`}
                className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-white rounded shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover rounded w-12 h-12" />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-2">
                      {item.name}{" "}
                      <span className="text-gray-500 whitespace-nowrap">× {item.quantity}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                  </div>
                </div>
                <span className="font-medium shrink-0">{item.price * item.quantity}৳</span>
              </div>
            ))}

            <div className="flex justify-between border-b border-gray-200 pb-4 mb-4 mt-6">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">{totalPrice}৳</span>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <span className="font-medium block mb-2">Shipping</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 py-1 rounded -ml-2">
                  <input type="radio" name="shipping" className="accent-black" checked={shippingCost === 60} onChange={() => setShippingCost(60)} />
                  <span>Inside Dhaka: <span className="font-medium">60৳</span></span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 py-1 rounded -ml-2">
                  <input type="radio" name="shipping" className="accent-black" checked={shippingCost === 120} onChange={() => setShippingCost(120)} />
                  <span>Outside Dhaka: <span className="font-medium">120৳</span></span>
                </label>
              </div>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-4 mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-blue-600">{totalPrice + shippingCost}৳</span>
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input type="radio" name="payment" className="mt-1 accent-black" defaultChecked />
                <div>
                  <span className="font-bold block">Cash on delivery</span>
                  <span className="text-gray-500 text-xs">Pay with cash upon delivery.</span>
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>.
            </p>

            <button
              type="submit"
              className="w-full bg-[#0B1221] text-white py-3.5 rounded-md font-bold hover:bg-gray-800 transition-colors shadow-black/10 shadow-sm active:scale-[0.98]"
            >
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
