import { Download, LogIn, Sparkles } from "lucide-react";

import { useFirebase } from "../context/Firebase";
import { useAuthModal } from "../context/ModalContext";
import { useDownloads } from "../hooks/useFirebaseData";

import Footer from "../components/layout/Footer";
import SavedMediaGrid from "../components/ui/SavedMediaGrid";

const DownloadsPage = () => {
  const { isLoggedIn, isAuthLoading } = useFirebase();

  const { openLogin } = useAuthModal();

  const { downloads, isLoading, removeDownload, removingId } = useDownloads();

  if (isAuthLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gray-900 animate-spin" />

            <p className="text-sm text-gray-500">Checking your account...</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex items-center justify-center flex-1 px-4 py-16">
          <div className="w-full max-w-md p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mx-auto mb-5 text-gray-700 bg-gray-100 w-14 h-14 rounded-2xl">
              <Download size={26} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Your download history
            </h1>

            <p className="mt-2 leading-relaxed text-gray-500">
              Log in to save media to your personal download history.
            </p>

            <button
              type="button"
              onClick={openLogin}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 mt-6 font-semibold text-white transition-all duration-300 bg-gray-900 rounded-xl hover:bg-gray-800 active:scale-95"
            >
              <LogIn size={18} />
              Log in
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-black">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            <Sparkles size={13} />
            Your library
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Download History
              </h1>

              <p className="max-w-xl mt-2 text-gray-400">
                Media you&apos;ve saved for easy access later.
              </p>
            </div>

            <div className="self-start px-3 py-1.5 text-sm font-medium text-gray-300 border border-white/10 rounded-full sm:self-auto">
              {downloads.length} {downloads.length === 1 ? "item" : "items"}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <SavedMediaGrid
            items={downloads}
            isLoading={isLoading}
            onRemove={removeDownload}
            removingId={removingId}
            emptyMessage="Media you save using the download button will appear here."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadsPage;
