import { TbCircleCheckFilled } from "react-icons/tb";

export const Toast = () => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 z-50">
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
      <TbCircleCheckFilled className="text-blue-600 text-2xl" />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-sm tracking-tight text-slate-900">Snippet Shared!</span>
      <span className="text-[11px] text-slate-500 font-medium tracking-tight">Copied to clipboard.</span>
    </div>
  </div>
);