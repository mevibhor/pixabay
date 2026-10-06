import { useState, useEffect } from "react";
import {
  X,
  Heart,
  Download,
  User,
  Eye,
  DownloadCloud,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { useFirebase } from "../../context/Firebase";
import { useImageDetail } from "../../hooks/useImageDetail";

const ImageDetail = ({ id, handleCloseModal, type }) => {
  const { data, isLoading } = useImageDetail(id, type);
  const { isLoggedIn, addToFavorites, removeFromFavorites, addToDownloads } =
    useFirebase();

  // Get the first item from the hits array (API returns array even for single ID)
  const item = data?.hits?.[0];

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Reset local state when modal opens with a new ID
  useEffect(() => {
    setIsFavorite(false);
    setIsDownloaded(false);
  }, [id]);

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to save favorites.");
      return;
    }
    try {
      if (isFavorite) {
        await removeFromFavorites(item.id);
        toast.success("Removed from favorites");
      } else {
        await addToFavorites(
          item.id,
          item.webformatURL || item.videos?.tiny?.url,
          item.type,
          new Date().toString(),
        );
        toast.success("Added to favorites!");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDownload = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to download.");
      return;
    }
    try {
      await addToDownloads(
        item.id,
        item.webformatURL || item.videos?.tiny?.url,
        item.type,
        new Date().toString(),
      );
      setIsDownloaded(true);
      toast.success("Download saved to your library!");

      // Optional: Trigger actual browser download
      // window.open(item.largeImageURL || item.videos?.large?.url, '_blank');
    } catch (error) {
      toast.error("Download failed.");
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleCloseModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300 bg-black/70 backdrop-blur-sm"
        onClick={handleCloseModal}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Asset Details
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-900 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-600 animate-spin"></div>
            </div>
          ) : item ? (
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left: Image/Video Preview */}
              <div className="lg:w-2/3 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
                {item.type === "film" || item.type === "animation" ? (
                  <video
                    src={item.videos?.large?.url || item.videos?.medium?.url}
                    controls
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                ) : (
                  <img
                    src={item.largeImageURL || item.webformatURL}
                    alt={item.tags}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                )}
              </div>

              {/* Right: Details & Actions */}
              <div className="flex flex-col gap-6 lg:w-1/3">
                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isDownloaded
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <Download size={18} />
                    {isDownloaded ? "Saved to Library" : "Free Download"}
                  </button>

                  <button
                    onClick={handleFavorite}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium border transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                    {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 p-4 text-center bg-gray-50 rounded-xl">
                  <div>
                    <Eye size={18} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs text-gray-500">Views</p>
                    <p className="font-bold text-gray-900">
                      {item.views?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <DownloadCloud
                      size={18}
                      className="mx-auto mb-1 text-gray-400"
                    />
                    <p className="text-xs text-gray-500">Downloads</p>
                    <p className="font-bold text-gray-900">
                      {item.downloads?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Heart size={18} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs text-gray-500">Likes</p>
                    <p className="font-bold text-gray-900">
                      {item.likes?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contributor</p>
                      <p className="font-semibold text-gray-900">{item.user}</p>
                    </div>
                  </div>

                  <div>
                    <p className="flex items-center gap-1 mb-2 text-xs font-semibold text-gray-500 uppercase">
                      <Tag size={12} /> Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags
                        ?.split(",")
                        .slice(0, 8)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              Failed to load details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
