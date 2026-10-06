import { useEffect } from "react";
import {
  X,
  Heart,
  Download,
  User,
  Eye,
  DownloadCloud,
  Tag,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { useFirebase } from "../../context/Firebase";
import { useAuthModal } from "../../context/ModalContext";
import { useImageDetail } from "../../hooks/useImageDetail";
import { useFavorites, useDownloads } from "../../hooks/useFirebaseData";

const MediaDetail = ({ id, type, handleCloseModal }) => {
  const { data, isLoading, isError } = useImageDetail(id, type);

  const { isLoggedIn } = useFirebase();

  const { openLogin } = useAuthModal();

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isAddingFavorite,
    isRemovingFavorite,
  } = useFavorites();

  const { downloads, addDownload, isAddingDownload } = useDownloads();

  const item = data?.hits?.[0];

  const isFavorite = favorites.some(
    (favorite) => String(favorite.id) === String(item?.id),
  );

  const isDownloaded = downloads.some(
    (download) => String(download.id) === String(item?.id),
  );

  const isFavoriteProcessing = isAddingFavorite || isRemovingFavorite;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleCloseModal]);

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    if (!item || isFavoriteProcessing) {
      return;
    }

    const imageURL =
      item.largeImageURL || item.webformatURL || item.videos?.tiny?.url;

    try {
      if (isFavorite) {
        await removeFavorite(item.id);

        toast.success("Removed from favourites.");

        return;
      }

      await addFavorite({
        id: item.id,
        url: imageURL,
        type: item.type,
        time: new Date().toISOString(),
      });

      toast.success("Added to favourites.");
    } catch {
      // Mutation handles the error.
    }
  };

  const handleDownload = async () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    if (!item || isAddingDownload) {
      return;
    }

    const fileURL =
      item.largeImageURL || item.webformatURL || item.videos?.large?.url;

    if (!fileURL) {
      toast.error("This media cannot be saved right now.");

      return;
    }

    try {
      if (!isDownloaded) {
        await addDownload({
          id: item.id,
          url: fileURL,
          type: item.type,
          time: new Date().toISOString(),
        });

        toast.success("Saved to your download history.");
      } else {
        toast.info("This media is already in your download history.");
      }
    } catch {
      // Mutation handles the error.
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-backdrop">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        <div className="relative flex items-center gap-3 px-5 py-4 text-sm font-medium text-white bg-gray-900 border shadow-2xl border-white/10 rounded-2xl animate-modal-content">
          <Loader2 size={18} className="animate-spin" />
          Loading media...
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Close media details"
          onClick={handleCloseModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <div className="relative z-10 w-full max-w-md p-6 text-center bg-white shadow-2xl rounded-2xl">
          <h2 className="text-lg font-bold text-gray-900">
            Could not load this media
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Pixabay could not load this media right now. Please close this
            window and try again.
          </p>

          <button
            type="button"
            onClick={handleCloseModal}
            className="px-5 py-2.5 mt-5 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const isVideo = item.type === "film" || item.type === "animation";

  const title = item.tags?.split(",")[0]?.trim() || "Untitled media";

  const tags =
    item.tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 8) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-modal-backdrop">
      <button
        type="button"
        aria-label="Close media details"
        onClick={handleCloseModal}
        className="absolute inset-0 w-full h-full cursor-default bg-black/85 backdrop-blur-md"
      />

      <div className="relative z-10 flex w-full max-w-6xl max-h-[94vh] overflow-hidden bg-white border border-white/10 shadow-2xl rounded-2xl sm:rounded-3xl animate-modal-content">
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Close media details"
          className="absolute z-30 flex items-center justify-center w-10 h-10 text-white transition-all duration-300 border rounded-full bg-black/50 border-white/10 top-3 right-3 backdrop-blur-md hover:bg-black/75 hover:scale-105 active:scale-95"
        >
          <X size={19} />
        </button>

        <div className="flex flex-col w-full min-h-0 lg:flex-row">
          <div className="relative flex items-center justify-center min-h-[280px] max-h-[48vh] overflow-hidden bg-gray-950 lg:w-[62%] lg:min-h-[620px] lg:max-h-[94vh]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_55%)]" />

            {isVideo ? (
              <video
                src={item.videos?.large?.url || item.videos?.medium?.url}
                controls
                playsInline
                className="relative z-10 w-full h-full max-h-[48vh] object-contain lg:max-h-[94vh]"
              />
            ) : (
              <img
                src={item.largeImageURL || item.webformatURL}
                alt={item.tags || "Pixabay media"}
                className="relative z-10 w-full h-full max-h-[48vh] object-contain lg:max-h-[94vh]"
              />
            )}

            <div className="absolute z-20 top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase border rounded-full bg-black/50 border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {isVideo ? "Video" : "Image"}
              </span>
            </div>
          </div>

          <div className="flex flex-col min-h-0 overflow-y-auto lg:w-[38%]">
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="pr-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold tracking-[0.18em] text-gray-400 uppercase">
                    Media details
                  </span>

                  <span className="w-1 h-1 bg-gray-300 rounded-full" />

                  <span className="text-[11px] font-medium text-gray-400 capitalize">
                    {item.type}
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-tight text-gray-950 sm:text-3xl">
                  {title}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleFavorite}
                  disabled={isFavoriteProcessing}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 disabled:cursor-not-allowed ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {isFavoriteProcessing ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Heart
                      size={17}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  )}

                  <span className="truncate">
                    {isFavoriteProcessing
                      ? "Saving..."
                      : isFavorite
                        ? "Saved"
                        : "Favourite"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isAddingDownload}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 bg-gray-950 rounded-xl hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAddingDownload ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Download size={17} />
                  )}

                  <span className="truncate">
                    {isAddingDownload
                      ? "Saving..."
                      : isDownloaded
                        ? "Saved"
                        : "Save"}
                  </span>
                </button>
              </div>

              <div className="flex gap-3 p-4 mt-4 border border-gray-200 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center flex-shrink-0 text-gray-700 bg-white border border-gray-200 rounded-lg w-9 h-9">
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Direct downloads coming soon
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    For now, use Save to keep this media in your download
                    history.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 mt-6 border border-gray-200 divide-x divide-gray-200 rounded-xl">
                <div className="px-2 py-4 text-center">
                  <Eye size={16} className="mx-auto mb-1.5 text-gray-400" />

                  <p className="text-[11px] text-gray-400">Views</p>

                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {item.views?.toLocaleString() || "—"}
                  </p>
                </div>

                <div className="px-2 py-4 text-center">
                  <DownloadCloud
                    size={16}
                    className="mx-auto mb-1.5 text-gray-400"
                  />

                  <p className="text-[11px] text-gray-400">Downloads</p>

                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {item.downloads?.toLocaleString() || "—"}
                  </p>
                </div>

                <div className="px-2 py-4 text-center">
                  <Heart size={16} className="mx-auto mb-1.5 text-gray-400" />

                  <p className="text-[11px] text-gray-400">Likes</p>

                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {item.likes?.toLocaleString() || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 mt-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-600 bg-gray-100 rounded-full">
                  <User size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-medium tracking-wide text-gray-400 uppercase">
                    Contributor
                  </p>

                  <p className="mt-0.5 font-semibold text-gray-900 truncate">
                    {item.user || "Unknown"}
                  </p>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mt-6">
                  <p className="flex items-center gap-1.5 mb-3 text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                    <Tag size={12} />
                    Tags
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-4 mt-auto border-t border-gray-100 bg-gray-50/80 sm:px-6">
              <p className="text-xs text-center text-gray-400">
                Press{" "}
                <kbd className="px-1.5 py-0.5 mx-0.5 font-medium text-gray-500 bg-white border border-gray-200 rounded">
                  ESC
                </kbd>{" "}
                or click outside to close
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
