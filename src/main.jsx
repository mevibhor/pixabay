import { lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./App.css";
import { FirebaseProvider } from "./context/Firebase.jsx";
import { queryClient } from "./lib/queryClient";
import PageLoader from "./components/ui/PageLoader";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const SearchResult = lazy(() => import("./pages/SearchResult.jsx"));
const Favourites = lazy(() => import("./pages/Favourites.jsx"));
const Downloads = lazy(() => import("./pages/Downloads.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <SearchResult /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/favourites", element: <Favourites /> },
  { path: "/downloads", element: <Downloads /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster richColors closeButton position="top-center" expand={true} />
      </FirebaseProvider>
    </QueryClientProvider>
  </StrictMode>,
);
