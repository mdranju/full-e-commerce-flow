import Image from "next/image";

function DescriptionTabs({
  product,
  activeTab,
  setActiveTab,
}: {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="border-t border-gray-100 py-12 lg:py-24">
      <div className="flex justify-center gap-12 mb-16 relative">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === "description" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-900"}`}
        >
          Description
          {activeTab === "description" && (
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === "additional" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-900"}`}
        >
          Information
          {activeTab === "additional" && (
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full"></div>
          )}
        </button>
      </div>

      {activeTab === "description" && (
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
                  Our Collection
                </p>
                <h2 className="text-3xl font-black text-gray-900 leading-none mb-6">
                  Premium <br /> {product.name}
                </h2>
                <p className="text-gray-500 font-medium leading-loose text-base">
                  ✨ This piece blends classic tradition with a modern, refined
                  finish, making it perfect for both festive and formal
                  occasions. Crafted with the modern believer in mind.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#0B1221] mb-2">
                    Authentic
                  </h4>
                  <p className="text-sm font-bold text-gray-400">
                    Original product
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#0B1221] mb-2">
                    Material
                  </h4>
                  <p className="text-sm font-bold text-gray-400">
                    High quality fabric
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/4] bg-gray-50 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/5 group">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover transition-transform duration-1000 group-hover:scale-105 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em]">
                  Comfortable Fit
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DescriptionTabs;
