"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/src/store/api/userApi";

export interface Address {
  id: string;
  _id?: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  district: string;
  postalCode?: string;
  phone: string;
  email?: string;
  isDefault: boolean;
}

export function useAddresses() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const { data: rawAddresses = [], isLoading, error: queryError, refetch } = useGetAddressesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [createAddress] = useCreateAddressMutation();
  const [updateAddressMutation] = useUpdateAddressMutation();
  const [deleteAddressMutation] = useDeleteAddressMutation();
  const [setDefaultMutation] = useSetDefaultAddressMutation();

  const addresses: Address[] = useMemo(() => {
    return rawAddresses.map((raw: any) => ({
      ...raw,
      id: raw._id ?? raw.id,
    }));
  }, [rawAddresses]);

  const defaultAddress = useMemo(() => {
    return addresses.find((a) => a.isDefault) ?? addresses[0];
  }, [addresses]);

  const addAddress = async (data: Omit<Address, "id" | "_id">) => {
    return await createAddress(data).unwrap();
  };

  const updateAddress = async (id: string, data: Partial<Address>) => {
    return await updateAddressMutation({ id, data }).unwrap();
  };

  const deleteAddress = async (id: string) => {
    return await deleteAddressMutation(id).unwrap();
  };

  const setDefault = async (id: string) => {
    return await setDefaultMutation(id).unwrap();
  };

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault,
    defaultAddress,
    isLoading,
    error: (queryError as any)?.data?.message || null,
    reload: refetch,
  };
}

