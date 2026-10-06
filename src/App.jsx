import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "./lib/queryClient";
import { FirebaseProvider } from "./context/Firebase";
import { ModalProvider } from "./context/ModalContext";

import PageLoader from "./components/ui/PageLoader";
import LoginModal from "./components/auth/LoginModal";
import SignupModal from "./components/auth/SignupModal";

const HomePage = lazy(() => import("./pages/HomePage"));

const SearchResult = lazy(() => import("./pages/SearchResult"));

const Favourites = lazy(() => import("./pages/Favourites"));

const Downloads = lazy(() => import("./pages/Downloads"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <ModalProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/search" element={<SearchResult />} />

                <Route path="/favourites" element={<Favourites />} />

                <Route path="/downloads" element={<Downloads />} />
              </Routes>
            </Suspense>

            <LoginModal />
            <SignupModal />
          </BrowserRouter>
        </ModalProvider>

        <Toaster richColors closeButton position="top-center" expand />
      </FirebaseProvider>
    </QueryClientProvider>
  );
};

export default App;
