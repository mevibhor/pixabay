import { ImageOff } from "lucide-react";
import CardLayout from "./CardLayout";

const CardSection = ({ searchResults, isLoading, isError }) => {
  // 1. Skeleton Loading Animation
  if (isLoading) {
    return (
      <div className="gap-4 p-4 space-y-4 bg-white columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="mb-4 overflow-hidden bg-gray-200 break-inside-avoid rounded-xl animate-pulse"
            style={{ height: `${Math.random() * 150 + 200}px` }} // Random heights for masonry skeleton
          />
        ))}
      </div>
    );
  }

  // 2. Error or Empty State
  if (isError || !searchResults || searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white">
        <ImageOff size={48} className="mb-4 text-gray-400" />
        <p className="text-xl font-semibold text-gray-900">No results found!</p>
        <p className="mt-2 text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  // 3. Success State
  return <CardLayout searchResults={searchResults} />;
};

export default CardSection;
