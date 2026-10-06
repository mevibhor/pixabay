import { useEffect } from "react";
import { Mail, Lock, X, Loader2 } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useAuthModal } from "../../context/ModalContext";

const LoginModal = () => {
  const { modal, closeModal, openSignup } = useAuthModal();

  const { login, loginWithGoogle, isLoginPending, isGooglePending } = useAuth();

  useEffect(() => {
    if (modal !== "login") {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modal, closeModal]);

  if (modal !== "login") {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({
        email,
        password,
      });

      closeModal();
    } catch {
      // useAuth handles the error toast.
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      closeModal();
    } catch {
      // useAuth handles the error toast.
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close login modal"
        onClick={closeModal}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute z-10 flex items-center justify-center text-gray-500 transition rounded-full w-9 h-9 top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
        >
          <X size={19} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold text-gray-900">Log in</h2>

            <p className="mt-2 text-sm text-gray-500">
              Continue to your Pixabay library.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </span>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
                />

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full py-3 pl-10 pr-4 text-sm border border-gray-200 outline-none rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </span>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
                />

                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="w-full py-3 pl-10 pr-4 text-sm border border-gray-200 outline-none rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoginPending || isGooglePending}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition bg-gray-900 rounded-xl hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoginPending && <Loader2 size={18} className="animate-spin" />}

              {isLoginPending ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoginPending || isGooglePending}
            className="flex items-center justify-center w-full gap-3 py-3 font-semibold text-gray-800 transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGooglePending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <img src="/src/assets/google.svg" alt="" className="w-5 h-5" />
            )}

            {isGooglePending ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={openSignup}
              className="font-semibold text-gray-900 hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
