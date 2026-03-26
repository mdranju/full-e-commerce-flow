"use client";

import { useState, useEffect, useCallback } from "react";

export interface Address {
  id: string;
  label: string; // e.g., "Home", "Office"
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  district: string;
  postalCode?: string;
  phone: string;
  isDefault: boolean;
}

const STORAGE_KEY = "believer_addresses";

const defaultAddresses: Address[] = [
  {
    id: "addr-default-1",
    label: "Home",
    firstName: "Md.",
    lastName: "Ranju",
    street: "House 12, Road 4, Mohakhali",
    apartment: "",
    city: "Dhaka",
    district: "Dhaka",
    postalCode: "1212",
    phone: "01799301290",
    isDefault: true,
  },
];

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAddresses(JSON.parse(stored));
      } else {
        setAddresses(defaultAddresses);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAddresses));
      }
    } catch {
      setAddresses(defaultAddresses);
    }
  }, []);

  const persist = useCallback((updated: Address[]) => {
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addAddress = useCallback(
    (address: Omit<Address, "id">) => {
      const newAddress: Address = {
        ...address,
        id: `addr-${Date.now()}`,
      };
      const updated = address.isDefault
        ? [...addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
        : [...addresses, newAddress];
      persist(updated);
    },
    [addresses, persist]
  );

  const updateAddress = useCallback(
    (id: string, data: Partial<Address>) => {
      const updated = addresses.map((a) => {
        if (a.id === id) return { ...a, ...data };
        if (data.isDefault) return { ...a, isDefault: false };
        return a;
      });
      persist(updated);
    },
    [addresses, persist]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      const remaining = addresses.filter((a) => a.id !== id);
      // If we deleted the default, make the first one default
      if (
        remaining.length > 0 &&
        !remaining.some((a) => a.isDefault) &&
        addresses.find((a) => a.id === id)?.isDefault
      ) {
        remaining[0].isDefault = true;
      }
      persist(remaining);
    },
    [addresses, persist]
  );

  const setDefault = useCallback(
    (id: string) => {
      const updated = addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }));
      persist(updated);
    },
    [addresses, persist]
  );

  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

  return { addresses, addAddress, updateAddress, deleteAddress, setDefault, defaultAddress };
}
