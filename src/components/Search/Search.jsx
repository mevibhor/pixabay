import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronDown, Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";

const searchTypes = [
  { value: "Images", label: "Images" },
  { value: "videos", label: "Videos" },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const initialSearch = searchParams.get("search") ?? "";
  const initialType =
    searchParams.get("type") === "videos" ? "videos" : "Images";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("search").trim().toLowerCase();
    const type = formData.get("type");

    if (!query) {
      toast.info("Please enter a search term.", {
        description: "Try 'nature' or 'technology'",
      });
      inputRef.current?.focus();
      return;
    }

    navigate(`/search?${new URLSearchParams({ type, search: query })}`);
  };

  return (
    <form
      key={`${initialType}-${initialSearch}`} // Excellent pattern to reset form on URL change
      role="search"
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-3xl gap-2 px-4 py-2 transition-all duration-300 ease-in-out border rounded-full group border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 focus-within:border-white/60 focus-within:bg-white/25 focus-within:ring-2 focus-within:ring-white/30"
    >
      <SearchIcon
        size={20}
        className="transition-colors duration-300 shrink-0 text-white/80 group-focus-within:text-white"
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        name="search"
        type="search"
        defaultValue={initialSearch}
        placeholder="Search for free images, videos & more"
        aria-label="Search"
        autoComplete="off"
        className="flex-1 min-w-0 py-2 text-sm text-white bg-transparent placeholder:text-white/70 focus:outline-none sm:text-base"
      />

      <div className="relative pl-3 border-l shrink-0 border-white/30">
        <select
          name="type"
          defaultValue={initialType}
          aria-label="Search type"
          className="py-2 pl-1 pr-6 text-sm text-white bg-transparent appearance-none cursor-pointer focus:outline-none sm:text-base"
        >
          {searchTypes.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              className="text-white bg-gray-900"
            >
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute -translate-y-1/2 pointer-events-none right-1 top-1/2 text-white/80"
          aria-hidden="true"
        />
      </div>

      <button
        type="submit"
        aria-label="Submit search"
        className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 ease-in-out bg-green-600 rounded-full shrink-0 hover:bg-green-500 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
};

export default Search;
