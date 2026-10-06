import { useState } from "react";
import { Trash2, ImageOff, Loader2, Play } from "lucide-react";
import MediaDetail from "../media/MediaDetail";

const SavedMediaGrid = ({
  items,
  isLoading,
  onRemove,
  removingId,
  emptyMessage,
}) => {
  const [modalData, setModalData] = useState(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,320px))] justify-center gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl"
          >
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />

            <div className="p-4 space-y-2">
              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="w-32 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center bg-white border border-gray-200 rounded-2xl">
        <div className="flex items-center justify-center mb-5 text-gray-400 bg-gray-100 w-14 h-14 rounded-2xl">
          <ImageOff size={26} />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Nothing here yet
        </h2>

        <p className="max-w-md mt-2 text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,320px))] justify-center gap-6">
        {items.map((item) => {
          const isVideo = item.type === "film" || item.type === "animation";

          const isRemoving = String(removingId) === String(item.id);

          return (
            <article
              key={`${item.id}-${item.time}`}
              className="relative w-full max-w-[320px] overflow-hidden bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-md transition-shadow"
            >
              <div
                className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-gray-950"
                onClick={() => setModalData(item)}
              >
                {isVideo ? (
                  <>
                    <video
                      src={item.url}
                      className="object-cover w-full h-full"
                      muted
                      preload="metadata"
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-black/60 backdrop-blur-sm">
                        <Play size={20} fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt="Saved media"
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <button
                  type="button"
                  disabled={isRemoving}
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemove(item.id);
                  }}
                  aria-label="Remove item"
                  className="absolute flex items-center justify-center w-10 h-10 text-white transition rounded-full shadow-lg opacity-100 bg-black/70 md:opacity-0 top-3 right-3 md:group-hover:opacity-100 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isRemoving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Trash2 size={17} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 capitalize bg-gray-100 rounded-lg">
                  {item.type}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(item.time).toLocaleDateString()}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {modalData && (
        <MediaDetail
          id={modalData.id}
          type={modalData.type}
          handleCloseModal={() => setModalData(null)}
        />
      )}
    </>
  );
};

export default SavedMediaGrid;
