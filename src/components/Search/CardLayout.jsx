import { useState } from "react";
import ImageDetail from "../modals/ImageDetail";

const CardLayout = ({ searchResults, isHomePage }) => {
  const [modalData, setModalData] = useState({ id: null, type: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDataClick = (id, type) => {
    setModalData({ id, type });
    setIsModalOpen(true);
  };

  return (
    <>
      {/* TRUE MASONRY: CSS columns, no JS library needed */}
      <div className="gap-4 p-4 space-y-4 bg-white columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-8">
        {searchResults.map((item) => (
          <div
            key={item.id}
            className="relative mb-4 overflow-hidden transition-shadow duration-300 bg-gray-100 shadow-sm break-inside-avoid group rounded-xl hover:shadow-md"
          >
            {item.type === "animation" || item.type === "film" ? (
              <video
                src={item.videos?.tiny?.url}
                poster={item.videos?.tiny?.thumbnail}
                alt={`Video: ${item.tags}`}
                className="object-cover w-full h-auto cursor-pointer"
                onClick={() => handleDataClick(item.id, item.type)}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            ) : (
              <img
                src={item.webformatURL}
                alt={item.tags}
                loading="lazy"
                className="object-cover w-full h-auto cursor-pointer"
                onClick={() => handleDataClick(item.id, item.type)}
              />
            )}

            {/* NO TAGS HERE, as requested. Just the pure image/video. */}
          </div>
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

export default CardLayout;
