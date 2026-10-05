import { useNavigate } from "react-router-dom";
import { Image, Palette, PenTool, Video, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Photos",
    count: "4.4M assets",
    icon: Image,
    url: "/search?type=images&image_type=photo",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Illustrations",
    count: "1.19M assets",
    icon: Palette,
    url: "/search?type=images&image_type=illustration",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Vectors",
    count: "170k assets",
    icon: PenTool,
    url: "/search?type=images&image_type=vector",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Videos",
    count: "240k assets",
    icon: Video,
    url: "/search?type=videos",
    color: "from-orange-500 to-red-500",
  },
];

const ImageType = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Free assets for any project
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => navigate(category.url)}
                className="relative flex flex-col justify-between p-5 overflow-hidden text-left transition-all duration-300 bg-white border border-gray-200 group rounded-xl hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {category.count}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}
                  >
                    <Icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                    Explore
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-600"
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={`absolute -right-3 -top-3 w-20 h-20 rounded-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageType;
