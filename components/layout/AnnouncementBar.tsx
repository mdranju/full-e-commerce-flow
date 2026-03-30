export function AnnouncementBar() {
  return (
    <div className="bg-[#111827] text-white text-xs py-2 px-4 lg:flex hidden justify-center items-center ">
      {/* 1. Announcement Bar */}
      <div className="bg-[#0B1221] text-white py-2.5 px-4 text-center overflow-hidden relative group hidden sm:block">
        <div className="flex items-center justify-center gap-8 animate-infinite-scroll">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
            New Collection - Live Now.
          </p>
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
            Free Delivery on Orders Over $150.
          </p>
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
            Secure Shopping Active.
          </p>
        </div>
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
      </div>
    </div>
  );
}
