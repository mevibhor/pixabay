import { Search } from "lucide-react";

const SearchName = ({ search }) => {
  const isSearching = search && search.trim() !== "";

  return (
    <div className="mb-8">
      {isSearching ? (
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          <Search size={28} className="text-gray-400" strokeWidth={2.5} />
          Results for <span className="text-gray-900">'{search}'</span>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Explore our community
        </h1>
      )}
    </div>
  );
};

export default SearchName;
