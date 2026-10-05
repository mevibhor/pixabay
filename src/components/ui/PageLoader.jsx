import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-gray-900 animate-spin" />
        <p className="text-sm font-medium text-gray-600 animate-pulse">
          Loading assets...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
