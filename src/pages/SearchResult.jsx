import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Search from "../components/search/Search";
import SearchName from "../components/search/SearchName";
import SimilarTags from "../components/search/SimilarTags";
import Footer from "../components/layout/Footer";
import ImageGrid from "../components/ui/ImageGrid";

import { usePixabayQuery } from "../hooks/usePixabayQuery";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const searchType =
    searchParams.get("type") === "videos" ? "videos" : "images";

  const imageType = searchParams.get("image_type");

  const queryParams = {
    q: search,
    type: searchType,
  };

  if (searchType !== "videos" && imageType) {
    queryParams.image_type = imageType;
  }

  const { data, isLoading, isFetching, isError } = usePixabayQuery(queryParams);

  const relatedTags = useMemo(() => {
    if (!data?.hits) {
      return [];
    }

    const uniqueTags = new Set();

    data.hits.forEach((hit) => {
      if (!hit.tags) {
        return;
      }

      hit.tags.split(",").forEach((tag) => {
        const cleanTag = tag.trim();

        if (cleanTag) {
          uniqueTags.add(cleanTag);
        }
      });
    });

    return Array.from(uniqueTags).slice(0, 15);
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="pt-2 pb-12 text-white bg-black">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Navbar />

          <div className="max-w-4xl mt-4">
            <Search />
          </div>
        </div>
      </div>

      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <SearchName search={search} />

        {relatedTags.length > 0 && <SimilarTags tags={relatedTags} />}

        <div
          className={`transition-opacity duration-300 ${
            isFetching && !isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          <ImageGrid
            hits={data?.hits || []}
            isLoading={isLoading || isFetching}
            isError={isError}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResult;
