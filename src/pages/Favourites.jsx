import { Heart, LogIn } from "lucide-react";
import { useFirebase } from "../context/Firebase";
import { useAuthModal } from "../context/ModalContext";
import { useFavorites } from "../hooks/useFirebaseData";
import Footer from "../components/layout/Footer";
import SavedMediaGrid from "../components/ui/SavedMediaGrid";

const FavouritesPage = () => {
  const { isLoggedIn, isAuthLoading } = useFirebase();
  const { openLogin } = useAuthModal();

  const { favorites, isLoading, removeFavorite, removingId } = useFavorites();

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
              <Heart size={26} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Your favourites
            </h1>

            <p className="mt-2 text-gray-500">
              Log in to view the media you&apos;ve saved.
            </p>

            <button
              type="button"
              onClick={openLogin}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 mt-6 font-semibold text-white transition bg-gray-900 rounded-xl hover:bg-gray-800"
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
          <p className="mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Your library
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Your Favourites
              </h1>

              <p className="mt-2 text-gray-400">
                Images and videos you&apos;ve saved for later.
              </p>
            </div>

            <div className="self-start px-3 py-1.5 text-sm font-medium text-gray-300 border border-white/10 rounded-full sm:self-auto">
              {favorites.length} {favorites.length === 1 ? "item" : "items"}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <SavedMediaGrid
            items={favorites}
            isLoading={isLoading}
            onRemove={removeFavorite}
            removingId={removingId}
            emptyMessage="Start saving images and videos to build your favourites."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavouritesPage;
