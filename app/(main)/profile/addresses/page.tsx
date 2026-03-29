"use client";

import { useState } from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { BackButton } from "@/components/common/BackButton";
import { useAddresses, Address } from "@/hooks/useAddresses";
import {
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Star,
  StarOff,
  Home,
  Briefcase,
  X,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { DISTRICTS } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";

type AddressFormData = Omit<Address, "id">;

const EMPTY_FORM: AddressFormData = {
  label: "Home",
  firstName: "",
  lastName: "",
  street: "",
  apartment: "",
  city: "",
  district: "Dhaka",
  postalCode: "",
  phone: "",
  isDefault: false,
};

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: AddressFormData;
  onSave: (data: AddressFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AddressFormData>(initial);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const set = (key: keyof AddressFormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (validationErrors[key]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    if (!form.street.trim()) errors.street = "Street address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.district.trim()) errors.district = "District is required";
    if (!form.phone.trim()) errors.phone = "Phone number is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    onSave(form);
  };

  const renderError = (field: string) => (
    <AnimatePresence>
      {validationErrors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5"
        >
          <AlertCircle size={10} />
          {validationErrors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Label Buttons */}
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
          Address Group
        </label>
        <div className="flex gap-3">
          {["Home", "Office", "Other"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => set("label", l)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                form.label === l
                  ? "bg-[#0B1221] text-white border-[#0B1221] shadow-xl"
                  : "bg-white border-black/5 text-[#0B1221]/40 hover:border-black/10 hover:text-[#0B1221]"
              }`}
            >
              {l === "Home" ? (
                <Home size={14} />
              ) : l === "Office" ? (
                <Briefcase size={14} />
              ) : (
                <MapPin size={14} />
              )}
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.firstName ? "text-red-500" : "text-gray-400"}`}>
            First Name *
          </label>
          <input
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="First name"
            className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border transition-all duration-300 ${validationErrors.firstName ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
          />
          {renderError("firstName")}
        </div>
        <div className="space-y-1.5">
          <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.lastName ? "text-red-500" : "text-gray-400"}`}>
            Last Name *
          </label>
          <input
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Last name"
            className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border transition-all duration-300 ${validationErrors.lastName ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
          />
          {renderError("lastName")}
        </div>
      </div>

      {/* Street */}
      <div className="space-y-1.5">
        <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.street ? "text-red-500" : "text-gray-400"}`}>
          Street / House No. *
        </label>
        <input
          value={form.street}
          onChange={(e) => set("street", e.target.value)}
          placeholder="House number and street name"
          className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border transition-all duration-300 ${validationErrors.street ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
        />
        {renderError("street")}
      </div>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
          Apartment / Suite <span className="lowercase font-bold opacity-30 italic">(optional)</span>
        </label>
        <input
          value={form.apartment}
          onChange={(e) => set("apartment", e.target.value)}
          placeholder="Apartment, suite, unit, etc."
          className="w-full px-6 py-4 bg-gray-50 border border-black/5 rounded-[1.25rem] text-sm font-bold text-[#0B1221] outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all duration-300"
        />
      </div>

      {/* City + District + Postal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.city ? "text-red-500" : "text-gray-400"}`}>
            City / Town *
          </label>
          <input
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="City"
            className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border transition-all duration-300 ${validationErrors.city ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
          />
          {renderError("city")}
        </div>
        <div className="space-y-1.5">
          <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.district ? "text-red-500" : "text-gray-400"}`}>
            District *
          </label>
          <div className="relative">
            <select
              value={form.district}
              onChange={(e) => set("district", e.target.value)}
              className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border appearance-none transition-all duration-300 ${validationErrors.district ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
            >
              <option value="" disabled>
                Select a district...
              </option>
              {DISTRICTS.map((d) => (
                <option key={d.value}>
                  {d.name} ({d.bn})
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {renderError("district")}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
            Postal Code <span className="lowercase font-bold opacity-30 italic">(optional)</span>
          </label>
          <input
            value={form.postalCode}
            onChange={(e) => set("postalCode", e.target.value)}
            placeholder="Postal code"
            className="w-full px-6 py-4 bg-gray-50 border border-black/5 rounded-[1.25rem] text-sm font-bold text-[#0B1221] outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all duration-300"
          />
        </div>
        <div className="space-y-1.5">
          <label className={`block text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.phone ? "text-red-500" : "text-gray-400"}`}>
            Phone Number *
          </label>
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="01XXXXXXXXX"
            type="tel"
            className={`w-full px-6 py-4 rounded-[1.25rem] text-sm font-bold outline-none border transition-all duration-300 ${validationErrors.phone ? "bg-red-50/20 border-red-500 text-red-600 focus:bg-white" : "bg-gray-50 border-black/5 text-[#0B1221] focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20"}`}
          />
          {renderError("phone")}
        </div>
      </div>

      {/* Default toggle */}
      <div className="flex items-center gap-4 group p-4 bg-gray-50/50 border border-black/5 rounded-[1.5rem] cursor-pointer" onClick={() => set("isDefault", !form.isDefault)}>
        <div
          className={`w-12 h-6 rounded-full transition-all duration-500 relative ${form.isDefault ? "bg-blue-600" : "bg-gray-200"}`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-500 ${form.isDefault ? "translate-x-6" : ""}`}
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1221]/60">
          Set as primary delivery address
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          type="submit"
          className="flex-1 bg-[#0B1221] text-white h-16 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-black/10 active:scale-[0.98]"
        >
          <Check size={16} /> Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-10 h-16 border border-black/5 text-[#0B1221]/40 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-50 transition-all duration-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } =
    useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: AddressFormData) => {
    addAddress(data);
    setShowForm(false);
  };

  const handleEdit = (id: string, data: AddressFormData) => {
    updateAddress(id, data);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this address?")) deleteAddress(id);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]/50 pb-20 lg:pb-32">
      {/* 1. Addresses Hero */}
      <div className="relative h-[35vh] lg:h-[45vh] flex items-center justify-center overflow-hidden bg-[#0B1221] mb-12 lg:mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 text-center px-6">
          <p className="text-blue-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            Address Book
          </p>
          <h1 className="hero-display text-4xl lg:text-7xl tracking-tighter text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 uppercase">
            My Addresses.
          </h1>
          <div className="flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="h-6 w-px bg-white/20" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic leading-none">
              Manage your delivery locations
            </span>
            <div className="h-6 w-px bg-white/20" />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start relative">
          <ProfileSidebar />

          <div className="flex-1 w-full relative space-y-12">
            <div className="flex items-center justify-between mb-8">
              <BackButton className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0B1221]/40 hover:text-[#0B1221] transition-all hover:bg-gray-50/50" />
              {!showForm && (
                <button
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                  }}
                  className="p-4 bg-white border border-black/5 text-[#0B1221]/20 hover:text-blue-600 hover:border-blue-500/20 rounded-2xl transition-all duration-500 flex items-center gap-3 group"
                >
                  <Plus
                    size={18}
                    className="transition-transform duration-500 group-hover:rotate-180"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Add New Address
                  </span>
                </button>
              )}
            </div>

            {/* Redesigned Address Management Form (Glass-Card) */}
            {showForm && (
              <div className="glass-card rounded-[3.5rem] border border-blue-500/10 bg-white p-10 lg:p-16 animate-in slide-in-from-bottom-12 duration-700 shadow-2xl shadow-blue-500/5">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                  <div>
                    <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                      Add Address
                    </p>
                    <h2 className="hero-display text-4xl lg:text-5xl tracking-tighter text-[#0B1221]">
                      New Address.
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
                  >
                    <X size={20} className="text-[#0B1221]/20" />
                  </button>
                </div>
                <AddressForm
                  initial={EMPTY_FORM}
                  onSave={handleAdd}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Address Cards */}
            {addresses.length === 0 ? (
              <div className="text-center py-40 glass-card rounded-[3.5rem] bg-white border border-black/5 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-8">
                  <MapPin
                    size={32}
                    className="text-[#0B1221]/10"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="hero-display text-3xl tracking-tighter text-[#0B1221] mb-2 uppercase">
                  No Addresses Found
                </h3>
                <p className="text-[10px] font-black text-[#0B1221]/20 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                  Add a delivery location to complete your orders faster.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {addresses.map((address, idx) => (
                  <div
                    key={address.id}
                    className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {editingId === address.id ? (
                      <div className="glass-card rounded-[3rem] border border-blue-500/20 bg-white p-10 shadow-2xl shadow-blue-500/5">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-sm font-black text-[#0B1221] tracking-tight uppercase">
                            Edit Address
                          </h2>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 hover:bg-gray-50 rounded-xl"
                          >
                            <X size={16} className="text-[#0B1221]/20" />
                          </button>
                        </div>
                        <AddressForm
                          initial={{ ...address }}
                          onSave={(data) => handleEdit(address.id, data)}
                          onCancel={() => setEditingId(null)}
                        />
                      </div>
                    ) : (
                      <div
                        className={`group relative glass-card p-10 rounded-[3rem] border transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 ${address.isDefault ? "border-blue-600/20 bg-white ring-1 ring-blue-600/5" : "border-black/5 bg-white"}`}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex items-start gap-6 flex-1 min-w-0">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-700 group-hover:scale-110 group-hover:shadow-2xl ${address.isDefault ? "bg-blue-600 text-white shadow-blue-500/20 shadow-xl" : "bg-gray-50 text-[#0B1221]/20 shadow-sm"}`}
                            >
                              {address.label === "Home" ? (
                                <Home size={22} strokeWidth={1.5} />
                              ) : address.label === "Office" ? (
                                <Briefcase size={22} strokeWidth={1.5} />
                              ) : (
                                <MapPin size={22} strokeWidth={1.5} />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <span
                                  className={`text-[10px] font-black uppercase tracking-[0.4em] ${address.isDefault ? "text-blue-600" : "text-[#0B1221]/40"}`}
                                >
                                  {address.label} Address
                                </span>
                                {address.isDefault && (
                                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/5 border border-blue-600/10 rounded-full animate-pulse">
                                    <div className="w-1 h-1 bg-blue-600 rounded-full" />
                                    <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">
                                      Default
                                    </span>
                                  </div>
                                )}
                              </div>
                              <p className="text-lg font-black tracking-tighter text-[#0B1221] mb-2">
                                {address.firstName} {address.lastName}
                              </p>
                              <div className="space-y-1">
                                <p className="text-xs font-bold text-[#0B1221]/60 leading-relaxed uppercase tracking-tight">
                                  {address.street}
                                  {address.apartment
                                    ? `, ${address.apartment}`
                                    : ""}
                                  , <br />
                                  {address.city}, {address.district}{" "}
                                  {address.postalCode &&
                                    `- ${address.postalCode}`}
                                </p>
                                <p className="text-[10px] font-black tracking-[0.2em] text-[#0B1221]/20 uppercase pt-2">
                                  Phone: {address.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions Overlay */}
                        <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                          <div className="flex gap-4">
                            {!address.isDefault && (
                              <button
                                onClick={() => setDefault(address.id)}
                                className="text-[10px] font-black uppercase tracking-widest text-blue-600/40 hover:text-blue-600 transition-colors flex items-center gap-2"
                              >
                                <StarOff size={14} /> Set as Default
                              </button>
                            )}
                            {address.isDefault && (
                              <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                                <Star size={14} fill="currentColor" /> Default
                                Address
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingId(address.id);
                                setShowForm(false);
                              }}
                              className="p-3 bg-gray-50 text-[#0B1221]/20 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(address.id)}
                              className="p-3 bg-red-50/50 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
