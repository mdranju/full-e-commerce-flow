import React from "react";
import { Skeleton } from "./skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4 flex flex-col flex-grow gap-3">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-full rounded-2xl mt-auto" />
      </div>
    </div>
  );
};

export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => {
  return (
    <tr className="animate-pulse">
      <td className="px-10 py-6">
        <div className="flex items-center gap-5">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      {Array(columns - 1)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="px-6 py-6">
            <Skeleton className="h-6 w-24 rounded-lg" />
          </td>
        ))}
      <td className="px-10 py-6"></td>
    </tr>
  );
};

export const TableSkeleton = ({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) => {
  return (
    <div className="bg-white rounded-[3rem] border border-black/5 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-black/5">
            {Array(columns).fill(0).map((_, i) => (
              <th key={i} className="px-10 py-8"><Skeleton className="h-4 w-20" /></th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {Array(rows).fill(0).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-full aspect-square rounded-[2rem] mb-5" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <Skeleton className="w-full aspect-[21/9] md:aspect-[21/6] rounded-[1.5rem] lg:rounded-[2.5rem]" />
  );
};

export const FormSkeleton = () => {
  return (
    <div className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="flex justify-end pt-4">
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
  );
};
export const UserCardSkeleton = () => {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-6 mb-8 relative z-10">
        <Skeleton className="w-16 h-16 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="space-y-4 pt-6 border-t border-black/5 relative z-10">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="mt-8 flex gap-3 relative z-10">
        <Skeleton className="h-12 flex-1 rounded-2xl" />
        <Skeleton className="h-12 w-12 rounded-2xl" />
      </div>
    </div>
  );
};

export const AnalyticsSkeleton = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-12 w-64 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-[3rem]" />
        ))}
      </div>
      <Skeleton className="h-[500px] w-full rounded-[4rem]" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-96 rounded-[3.5rem]" />
        <Skeleton className="h-96 rounded-[3.5rem]" />
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <Skeleton className="h-10 w-48" />
           <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-56 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-[3rem]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="lg:col-span-2 h-96 rounded-[3.5rem]" />
        <Skeleton className="lg:col-span-1 h-96 rounded-[3.5rem]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="lg:col-span-1 h-[500px] rounded-[3.5rem]" />
        <Skeleton className="lg:col-span-2 h-[500px] rounded-[3.5rem]" />
      </div>
    </div>
  );
};
export const PageCardSkeleton = () => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="w-16 h-16 bg-blue-50 rounded-2xl mb-8 flex items-center justify-center border border-blue-100">
        <Skeleton className="w-6 h-6 rounded-md" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-6" />
      <div className="pt-4 border-t border-black/5">
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};

export const CollectionCardSkeleton = () => {
  return (
    <div className="group relative h-[450px] flex flex-col bg-white border border-black/5 rounded-[3rem] overflow-hidden">
      <div className="h-2/3 relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 p-10 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-0.5" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-3/4" />
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-black/5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const SettingsSkeleton = () => {
  return (
    <div className="max-w-full mx-auto space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-72 flex flex-col gap-2">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
        <div className="flex-1">
          <FormSkeleton />
        </div>
      </div>
    </div>
  );
};
