import { Link } from "react-router-dom";

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
];

const CategorySearch = () => {
  return (
    <nav
      aria-label="Browse categories"
      className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
    >
      {/* One list for all chips; it scrolls sideways on small screens. */}
      <ul className="flex gap-2 py-2 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <li key={category} className="shrink-0">
            <Link
              to={`/search?search=${category}`}
              className="block whitespace-nowrap rounded-full border border-gray-300 px-4 py-1.5 text-sm capitalize transition-colors duration-300 hover:border-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySearch;
