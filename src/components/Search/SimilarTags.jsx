import { Link, useSearchParams } from "react-router-dom";
import { Tag } from "lucide-react";

const SimilarTags = ({ tags }) => {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("type");
  const imageType = searchParams.get("image_type");

  const buildLink = (tag) => {
    const params = new URLSearchParams();
    if (searchType) params.set("type", searchType);
    if (imageType) params.set("image_type", imageType);
    params.set("search", tag);
    return `/search?${params.toString()}`;
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="pb-6 mb-8 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
        <Tag size={16} className="text-gray-500" />
        <span>Related searches</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={buildLink(tag)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-900"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarTags;
