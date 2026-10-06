import { useState } from "react";
import { ImageOff } from "lucide-react";

import MediaDetail from "../media/MediaDetail";

const ImageCard = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isVideo = item.type === "film" || item.type === "animation";

  return (
    <div className="relative mb-4 overflow-hidden transition-shadow duration-300 bg-gray-100 shadow-sm break-inside-avoid group rounded-xl hover:shadow-md">
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {isVideo ? (
        <video
          src={item.videos?.tiny?.url || item.videos?.small?.url}
          poster={item.videos?.tiny?.thumbnail || item.videos?.small?.thumbnail}
          aria-label="Video preview"
          className={`relative z-10 object-cover w-full h-auto cursor-pointer transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => onClick(item.id, item.type)}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={(event) => event.currentTarget.play()}
          onMouseLeave={(event) => {
            event.currentTarget.pause();
            event.currentTarget.currentTime = 0;
          }}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      ) : (
        <img
          src={item.webformatURL}
          alt={item.tags || "Pixabay image"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`relative z-10 w-full h-auto cursor-pointer object-cover transition-opacity duration-500 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => onClick(item.id, item.type)}
        />
      )}
    </div>
  );
};

const ImageGrid = ({ hits = [], isLoading, isError }) => {
  const [modalData, setModalData] = useState({
    id: null,
    type: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMediaClick = (id, type) => {
    setModalData({
      id,
      type,
    });

    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden bg-gray-200 rounded-xl animate-pulse"
          >
            <div
              className={`w-full ${
                index % 3 === 0
                  ? "aspect-[4/5]"
                  : index % 3 === 1
                    ? "aspect-[4/3]"
                    : "aspect-square"
              }`}
            />

            <div className="p-3 space-y-2 bg-white">
              <div className="w-2/3 h-3 bg-gray-200 rounded-full" />
              <div className="w-1/2 h-3 bg-gray-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !hits || hits.length === 0) {
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

  return (
    <>
      <div className="gap-4 p-4 space-y-4 bg-white columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-8">
        {hits.map((item) => (
          <ImageCard key={item.id} item={item} onClick={handleMediaClick} />
        ))}
      </div>

      {isModalOpen && (
        <MediaDetail
          id={modalData.id}
          type={modalData.type}
          handleCloseModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ImageGrid;
