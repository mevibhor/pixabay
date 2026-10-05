import { useState } from "react";
import { ImageOff } from "lucide-react";
import ImageDetail from "../modals/ImageDetail";

// Helper component for individual image loading state
const ImageCard = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative mb-4 overflow-hidden transition-shadow duration-300 bg-gray-100 shadow-sm break-inside-avoid group rounded-xl hover:shadow-md">
      {/* Background placeholder while image loads */}
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
      />

      {item.videos ? (
        <video
          src={item.videos.tiny?.url || item.videos.small?.url}
          poster={item.videos.tiny?.thumbnail || item.videos.small?.thumbnail}
          alt="Video preview"
          className="relative z-10 object-cover w-full h-auto cursor-pointer"
          onClick={() => onClick(item.id, "video")}
          muted
          loop
          playsInline
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => {
            e.target.pause();
            e.target.currentTime = 0;
          }}
          onLoadedData={() => setIsLoaded(true)} // Video loaded
        />
      ) : (
        <img
          src={item.webformatURL}
          alt={item.tags}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)} // Image loaded
          className={`w-full h-auto object-cover cursor-pointer relative z-10 transition-opacity duration-500 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onClick={() => onClick(item.id, "image")}
        />
      )}
    </div>
  );
};

const ImageGrid = ({ hits = [], isLoading, isError }) => {
  const [modalData, setModalData] = useState({ id: null, type: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (id, type) => {
    setModalData({ id, type });
    setIsModalOpen(true);
  };

  // 1. Global Loading State (Skeletons for the whole grid)
  if (isLoading) {
    return (
      <div className="gap-4 p-4 space-y-4 bg-white columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="mb-4 overflow-hidden bg-gray-200 break-inside-avoid rounded-xl animate-pulse"
            style={{ height: `${Math.random() * 150 + 200}px` }}
          />
        ))}
      </div>
    );
  }

  // 2. Error or Empty State
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

  // 3. Success State
  return (
    <>
      <div className="gap-4 p-4 space-y-4 bg-white columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-8">
        {hits.map((item) => (
          <ImageCard key={item.id} item={item} onClick={handleImageClick} />
        ))}
      </div>

      {isModalOpen && (
        <ImageDetail
          id={modalData.id}
          type={modalData.type}
          handleCloseModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ImageGrid;
